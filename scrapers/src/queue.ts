import { Queue, Worker, Job } from "bullmq";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import { redisConnection } from "./config/redis";
import summarizeHtmlContent from "./models/ollama";

type ContentType = {
  url: string;
  content: string;
};

const baseScrapePath = "scrapes/netflix";

class ScrapeQueue {
  queue: Queue;
  worker: Worker;

  constructor() {
    console.log(`[QUEUE] Ensuring directory exists: ${baseScrapePath}`);
    // Ensure the directory exists before starting the worker
    mkdirSync(baseScrapePath, { recursive: true });

    console.log(`[QUEUE] Initializing queue "scrapers".`);
    this.queue = new Queue("scrapers", {
      connection: redisConnection,
    });

    console.log(`[WORKER] Initializing worker for "scrapers" queue.`);
    this.worker = new Worker("scrapers", this.dequeue, {
      connection: redisConnection,
    });

    this.worker.on("completed", (job: Job) => {
      console.log(`[WORKER] Job ${job.id} for ${job.data.url} has completed.`);
    });

    this.worker.on("failed", (job: Job | undefined, err: Error) => {
      if (job) {
        console.error(
          `[WORKER] Job ${job.id} for ${job.data.url} has failed with error: ${err.message}`
        );
      } else {
        console.error(
          `[WORKER] An unknown job has failed with error: ${err.message}`
        );
      }
    });
  }

  async enqueue(data: ContentType) {
    console.log(`[QUEUE] Enqueuing job for URL: ${data.url}`);
    await this.queue.add("scrapers", data);
  }
  async dequeue(job: Job) {
    const data: ContentType = job.data;
    console.log(`[WORKER] Dequeued job ${job.id}. Processing URL: ${data.url}`);

    // Sanitize the URL to create a valid filename
    const filename = data.url.replace(/https?:\/\//, "").replace(/\//g, "_");
    const filePath = join(baseScrapePath, `${filename}.txt`);

    console.log(`[WORKER] Removing HTML tags for job ${job.id}.`);
    const tags_removed_content = data.content.replace(/<[^>]*>?/gm, "");
    console.log(`[WORKER] Summarizing content with Ollama for job ${job.id}.`);
    const summarized_content = await summarizeHtmlContent(tags_removed_content);
    console.log(`[WORKER] Writing summarized content to file: ${filePath}`);
    writeFileSync(filePath, summarized_content, {
      encoding: "utf8",
      flag: "w",
    });
  }

  async close() {
    console.log("[QUEUE] Closing worker and queue connections.");
    await this.worker.close();
    await this.queue.close();
  }
}

const scrapeQueue = new ScrapeQueue();

export default scrapeQueue;
