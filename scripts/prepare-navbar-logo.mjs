/**
 * Prepare Flow export: crop floor/reflection, export navbar + footer assets.
 * Run: node scripts/prepare-navbar-logo.mjs
 */
import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public", "logo-flow.png");
const navbarOut = join(root, "public", "logo-navbar.png");
const footerOut = join(root, "public", "logo-footer.png");

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

let minX = info.width;
let minY = info.height;
let maxX = 0;
let maxY = 0;

for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    const a = data[i + 3];
    if (a < 40) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    if (a < 40) continue;
    const lum = (r + g + b) / 3;
    if (sat > 0.18 && max > 55 && lum > 70) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
}

const pad = Math.round((maxY - minY) * 0.03);
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const width = Math.min(info.width - left, maxX - minX + 1 + pad * 2);
const height = Math.min(info.height - top, maxY - minY + 1 + pad * 2);

console.log(`logo bounds ${width}x${height}`);

const cropped = await sharp(src)
  .extract({ left, top, width, height })
  .png()
  .toBuffer();

const navbarHeight = 96;
const cropMeta = await sharp(cropped).metadata();
const navbarScale = navbarHeight / cropMeta.height;

await sharp(cropped)
  .resize({
    width: Math.round(cropMeta.width * navbarScale),
    height: navbarHeight,
    kernel: "lanczos3",
  })
  .png({ compressionLevel: 9 })
  .toFile(navbarOut);

const footerHeight = 104;
const footerScale = footerHeight / cropMeta.height;

await sharp(cropped)
  .resize({
    width: Math.round(cropMeta.width * footerScale),
    height: footerHeight,
    kernel: "lanczos3",
  })
  .png({ compressionLevel: 9 })
  .toFile(footerOut);

const nav = await sharp(navbarOut).metadata();
const foot = await sharp(footerOut).metadata();
console.log(`logo-navbar.png ${nav.width}x${nav.height}`);
console.log(`logo-footer.png ${foot.width}x${foot.height}`);
