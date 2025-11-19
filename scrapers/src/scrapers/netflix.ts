import type { BrowserContext } from "playwright";
import scrapeQueue from "../queue";

const baseUrl = "https://help.netflix.com/en";
const visited = new Set([baseUrl]);

const CONCURRENCY_LIMIT = 5; // Process 5 pages at a time

const extractContent = async (url: string, context: BrowserContext) => {
  let page;
  try {
    console.log(`[SCRAPER] Processing page: ${url}`);
    page = await context.newPage();
    // Add timeout and wait until DOM is loaded, which is often enough
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    const html_content = await page.content();
    const links = await page
      .locator("a")
      .evaluateAll((els) => els.map((el) => (el as HTMLAnchorElement).href));

    console.log(`[SCRAPER] Enqueuing page for summarization: ${url}`);
    scrapeQueue.enqueue({
      url: url,
      content: html_content,
    });

    const filtered_links = links.filter((link) => link.startsWith(baseUrl));
    const newLinks = filtered_links.filter((link) => !visited.has(link));
    console.log(`[SCRAPER] Found ${newLinks.length} new links to scrape from ${url}.`);

    // Process links in smaller batches to avoid overwhelming the server
    for (let i = 0; i < filtered_links.length; i += CONCURRENCY_LIMIT) {
      const batch = filtered_links.slice(i, i + CONCURRENCY_LIMIT);
      const scrapingPromises = batch.map(async (link) => {
        if (visited.has(link)) return;
        visited.add(link);
        await extractContent(link, context);
      });
      if (batch.filter(link => !visited.has(link)).length > 0)
        console.log(`[SCRAPER] Starting batch of ${scrapingPromises.length} links...`);
      await Promise.all(scrapingPromises);
    }
  } catch (error) {
    console.error(`Failed to process page ${url}: ${error}`);
  } finally {
    // Ensure the page is closed even if an error occurs
    if (page) {
      
      console.log(`[SCRAPER] Finished with page: ${url}`);
      await page.close();
    }
  }
};

const ExtractNeflixContent = async (context: BrowserContext) => {
  console.log("[SCRAPER] Starting Netflix content extraction...");
  await extractContent(baseUrl, context);
  console.log("[SCRAPER] Netflix content extraction finished.");
};

export default ExtractNeflixContent;
