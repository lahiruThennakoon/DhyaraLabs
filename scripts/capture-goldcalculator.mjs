/**
 * Capture Gold Value LK mobile screenshot for the marketing site.
 * Run: node scripts/capture-goldcalculator.mjs
 */
import { chromium } from "playwright";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "products", "goldcalculator.png");
const liveUrl =
  process.argv[2] ?? "https://app-delta-liart-71.vercel.app/";
/** Public deployment used when the primary URL is behind Vercel auth. */
const fallbackUrl = "https://app-delta-liart-71.vercel.app/";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

async function captureFrom(url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(2_000);
  const title = await page.title();
  return !/log in to vercel/i.test(title);
}

let captureUrl = liveUrl;
if (!(await captureFrom(liveUrl))) {
  console.warn(`Primary URL is not publicly accessible; using ${fallbackUrl}`);
  captureUrl = fallbackUrl;
  await captureFrom(captureUrl);
}

// Dismiss PWA install prompt if shown.
const notNow = page.getByRole("button", { name: /not now/i });
if (await notNow.count()) {
  await notNow.first().click();
  await page.waitForTimeout(600);
} else {
  const close = page.locator("button").filter({ hasText: /^×$|✕/ });
  if (await close.count()) {
    await close.first().click();
    await page.waitForTimeout(600);
  }
}

await page.screenshot({ path: out, fullPage: false, type: "png" });
await browser.close();

const { statSync } = await import("node:fs");
const sharp = (await import("sharp")).default;
const meta = await sharp(out).metadata();
console.log(`saved ${out} (from ${captureUrl})`);
console.log(`${meta.width}x${meta.height} (${statSync(out).size} bytes)`);
