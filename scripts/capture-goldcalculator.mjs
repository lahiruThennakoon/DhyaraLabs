/**
 * Capture Gold Value LK mobile screenshot for the marketing site.
 * Run: node scripts/capture-goldcalculator.mjs
 */
import { chromium } from "playwright";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "products", "goldcalculator.png");
const url = process.argv[2] ?? "https://app-h1p4nn5y4-dd-c68e.vercel.app/";

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});

await page.goto(url, { waitUntil: "networkidle", timeout: 90_000 });
await page.waitForTimeout(2_000);

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
console.log(`saved ${out}`);
console.log(`${meta.width}x${meta.height} (${statSync(out).size} bytes)`);
