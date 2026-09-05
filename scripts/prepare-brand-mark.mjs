/**
 * Prepare compact brand mark (transparent) from logo-mark-source.png.
 * Run: node scripts/prepare-brand-mark.mjs
 */
import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public", "logo-mark-source.png");
const publicDir = join(root, "public");

function clamp(v) {
  return Math.max(0, Math.min(255, Math.round(v)));
}

const trimmed = await sharp(src).trim({ threshold: 36 }).png().toBuffer();
const trimmedMeta = await sharp(trimmed).metadata();

const { data, info } = await sharp(trimmed)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const plate = { r: 245, g: 245, b: 245 };

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  const lum = (r + g + b) / 3;
  const dist = Math.max(
    Math.abs(r - plate.r),
    Math.abs(g - plate.g),
    Math.abs(b - plate.b),
  );

  const isArt = sat > 0.14 && max > 45 || lum > 100 && sat > 0.08;

  if (isArt) {
    data[i + 3] = 255;
    continue;
  }

  if (lum > 175 && sat < 0.15 && dist < 35) {
    const ramp =
      dist < 8
        ? 0
        : Math.max(0, Math.min(1, (dist - 8) / 22));
    const alpha = Math.round(255 * ramp);
    data[i + 3] = alpha;
    if (ramp > 0.05) {
      data[i] = clamp((r - (1 - ramp) * plate.r) / ramp);
      data[i + 1] = clamp((g - (1 - ramp) * plate.g) / ramp);
      data[i + 2] = clamp((b - (1 - ramp) * plate.b) / ramp);
    }
    continue;
  }

  data[i + 3] = 0;
}

const knocked = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim()
  .png()
  .toBuffer();

const mark = await sharp(knocked)
  .resize({
    width: 192,
    height: 192,
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toBuffer();

await sharp(mark).toFile(join(publicDir, "logo-mark.png"));
await sharp(mark).resize(32, 32).png().toFile(join(publicDir, "favicon-32.png"));
await sharp(mark).resize(180, 180).png().toFile(join(publicDir, "apple-icon.png"));
await sharp(mark).resize(512, 512).png().toFile(join(publicDir, "icon-512.png"));

console.log(`trimmed ${trimmedMeta.width}x${trimmedMeta.height}`);
console.log("logo-mark.png + favicons (transparent)");
