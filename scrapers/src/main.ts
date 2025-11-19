import dns from "dns";
dns.setDefaultResultOrder("ipv4first"); // Node ≥17

import { chromium } from "playwright";
import ExtractNeflixContent from "./scrapers/netflix";
import scrapeQueue from "./queue";

const main = async () => {
  console.log("[MAIN] Scraping process initiated.");
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-blink-features=AutomationControlled"],
  });
  console.log("[MAIN] Browser launched successfully.");

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119 Safari/537.36",
  });
  console.log("[MAIN] Browser context created.");

  try {
    await ExtractNeflixContent(context);

    console.log(
      "[MAIN] Scraping finished. Waiting for all background jobs to complete..."
    );

    // Poll the queue until it is idle (no active or waiting jobs)
    while (
      (await scrapeQueue.queue.getActiveCount()) +
        (await scrapeQueue.queue.getWaitingCount()) >
      0
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
    }

    console.log("[MAIN] All jobs completed.");
  } catch (err) {
    console.error("[MAIN] An unhandled error occurred during scraping:", err);
  } finally {
    console.log("[MAIN] Closing browser.");
    await browser.close();
    console.log("[MAIN] Closing queue connections.");
    await scrapeQueue.close();
    console.log("[MAIN] Process finished.");
  }
};

main();
