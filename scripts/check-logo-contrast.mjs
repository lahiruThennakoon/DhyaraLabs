import { createRequire } from "node:module";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const file = process.argv[2] ?? join(root, "public", "logo-header.png");

const srgb = (v) => {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
};
const lum = (r, g, b) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

const { data, info } = await sharp(file)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const paper = lum(251, 251, 253);
const samples = [];

for (let y = 0; y < info.height; y++) {
  for (let x = Math.floor(info.width * 0.42); x < info.width; x++) {
    const i = (y * info.width + x) * 4;
    if (data[i + 3] > 230) samples.push([data[i], data[i + 1], data[i + 2]]);
  }
}

samples.sort((a, b) => lum(...a) - lum(...b));

console.log(`${file}`);
console.log(`size ${info.width}x${info.height}`);
console.log(`wordmark opaque pixels: ${samples.length}`);

for (const p of [0.05, 0.25, 0.5, 0.75, 0.95]) {
  const c = samples[Math.floor(samples.length * p)] ?? [0, 0, 0];
  const cr = ratio(lum(...c), paper);
  console.log(
    `  p${String(p * 100).padStart(2)} rgb(${c.join(",")}) → ${cr.toFixed(2)}:1 vs paper`,
  );
}
