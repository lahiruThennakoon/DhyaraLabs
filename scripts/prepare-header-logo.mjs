/**
 * Prepare brand assets from the horizontal "DhyaraLabs" lockup:
 *   public/logo-header.png — transparent lockup, upscaled for retina
 *   public/logo-mark.png   — square icon crop (favicon / compact contexts)
 *
 * Usage: node scripts/prepare-header-logo.mjs <source-image>
 */
import { createRequire } from "node:module";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

const source = process.argv[2];
if (!source) {
  console.error("Provide a source image path.");
  process.exit(1);
}

// Plate colour sampled from the supplied lockup.
const PLATE = { r: 251, g: 251, b: 253 };
const FULLY_CLEAR = 10; // distance from plate that is definitely background
const FEATHER_END = 26; // distance where the pixel becomes fully opaque
const SCALE = 3;

const { data, info } = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;

  const dist = Math.max(
    Math.abs(r - PLATE.r),
    Math.abs(g - PLATE.g),
    Math.abs(b - PLATE.b),
  );

  if (sat < 0.1 && dist <= FULLY_CLEAR) {
    data[i + 3] = 0;
  } else if (sat < 0.16 && dist < FEATHER_END) {
    const ramp = Math.max(
      0,
      Math.min(1, (dist - FULLY_CLEAR) / (FEATHER_END - FULLY_CLEAR)),
    );
    data[i + 3] = Math.round(255 * ramp);

    // Edge decontamination: the observed colour is the true colour composited
    // over the light plate. Undo that so partial pixels don't halo on dark.
    if (ramp > 0.02) {
      data[i] = clamp((r - (1 - ramp) * PLATE.r) / ramp);
      data[i + 1] = clamp((g - (1 - ramp) * PLATE.g) / ramp);
      data[i + 2] = clamp((b - (1 - ramp) * PLATE.b) / ramp);
    }
  }
}

function clamp(v) {
  return Math.max(0, Math.min(255, Math.round(v)));
}

const trimmed = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim()
  .png()
  .toBuffer();

const trimmedMeta = await sharp(trimmed).metadata();

const upscale = (buffer, width) =>
  sharp(buffer)
    .resize({ width, kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .png({ compressionLevel: 9 });

await upscale(trimmed, trimmedMeta.width * SCALE).toFile(
  join(publicDir, "logo-header.png"),
);

/**
 * The icon sits left of the wordmark. Find the widest fully transparent
 * column run in the left half and treat it as the separator.
 */
async function findIconWidth(buffer, meta) {
  const { data: px } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const columnHasInk = [];
  for (let x = 0; x < meta.width; x++) {
    let ink = false;
    for (let y = 0; y < meta.height; y++) {
      if (px[(y * meta.width + x) * 4 + 3] > 24) {
        ink = true;
        break;
      }
    }
    columnHasInk.push(ink);
  }

  let best = null;
  let runStart = null;
  const limit = Math.floor(meta.width * 0.55);

  for (let x = 0; x < limit; x++) {
    if (!columnHasInk[x]) {
      if (runStart === null) runStart = x;
    } else if (runStart !== null) {
      const run = { start: runStart, end: x };
      if (!best || run.end - run.start > best.end - best.start) best = run;
      runStart = null;
    }
  }

  return best ? best.start : Math.round(meta.width * 0.26);
}

const iconWidth = await findIconWidth(trimmed, trimmedMeta);
const iconBuffer = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: iconWidth, height: trimmedMeta.height })
  .trim()
  .png()
  .toBuffer();

const iconMeta = await sharp(iconBuffer).metadata();
const side = Math.max(iconMeta.width, iconMeta.height);
const pad = Math.round(side * 0.12);
const canvas = side + pad * 2;

await sharp(iconBuffer)
  .extend({
    top: Math.floor((canvas - iconMeta.height) / 2),
    bottom: Math.ceil((canvas - iconMeta.height) / 2),
    left: Math.floor((canvas - iconMeta.width) / 2),
    right: Math.ceil((canvas - iconMeta.width) / 2),
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .resize({ width: 512, height: 512, kernel: "lanczos3" })
  .png({ compressionLevel: 9 })
  .toFile(join(publicDir, "logo-mark.png"));

const headerMeta = await sharp(join(publicDir, "logo-header.png")).metadata();
console.log(`source           ${info.width}x${info.height}`);
console.log(`trimmed          ${trimmedMeta.width}x${trimmedMeta.height}`);
console.log(`logo-header.png  ${headerMeta.width}x${headerMeta.height}`);
console.log(`logo-mark.png    512x512 (icon crop width ${iconWidth})`);
