import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

await page.screenshot({
  path: "public/../.tmp-header-top.png",
  clip: { x: 0, y: 0, width: 1280, height: 120 },
});

// scrolled state
await page.evaluate(() => window.scrollTo(0, 600));
await page.waitForTimeout(800);
await page.screenshot({
  path: "public/../.tmp-header-scrolled.png",
  clip: { x: 0, y: 0, width: 1280, height: 120 },
});

// footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1000);
await page.screenshot({ path: "public/../.tmp-footer.png", fullPage: false });

await browser.close();
console.log("captured");
