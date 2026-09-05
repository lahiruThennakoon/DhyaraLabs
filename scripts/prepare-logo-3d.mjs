/**
 * Prepare the 3D lockup: knock out the white studio background + floor shadow,
 * trim to the artwork and export navbar + footer assets.
 * Run: node scripts/prepare-logo-3d.mjs
 */
import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public", "logo-source-3d.png");
const navbarOut = join(root, "public", "logo-navbar.png");
const footerOut = join(root, "public", "logo-footer.png");

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

const lum = (i) => (data[i] + data[i + 1] + data[i + 2]) / 3;
const sat = (i) => {
  const max = Math.max(data[i], data[i + 1], data[i + 2]);
  const min = Math.min(data[i], data[i + 1], data[i + 2]);
  return max === 0 ? 0 : (max - min) / max;
};

/** Background = light and unsaturated (covers the white sweep and the gray shadow). */
const isBackdrop = (i) => lum(i) > 185 && sat(i) < 0.12;

// Flood fill from the borders so specular highlights inside the letters survive.
const backdrop = new Uint8Array(width * height);
const stack = [];
for (let x = 0; x < width; x++) {
  stack.push(x, (height - 1) * width + x);
}
for (let y = 0; y < height; y++) {
  stack.push(y * width, y * width + width - 1);
}

while (stack.length) {
  const p = stack.pop();
  if (backdrop[p]) continue;
  if (!isBackdrop(p * 4)) continue;
  backdrop[p] = 1;
  const x = p % width;
  const y = (p - x) / width;
  if (x > 0) stack.push(p - 1);
  if (x < width - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - width);
  if (y < height - 1) stack.push(p + width);
}

let minX = width;
let minY = height;
let maxX = 0;
let maxY = 0;

for (let p = 0; p < backdrop.length; p++) {
  const i = p * 4;
  if (backdrop[p]) {
    data[i + 3] = 0;
    continue;
  }
  const x = p % width;
  const y = (p - x) / width;
  // Soften the cut where a kept pixel touches the backdrop and is itself near-white.
  const touchesBackdrop =
    (x > 0 && backdrop[p - 1]) ||
    (x < width - 1 && backdrop[p + 1]) ||
    (y > 0 && backdrop[p - width]) ||
    (y < height - 1 && backdrop[p + width]);
  if (touchesBackdrop && lum(i) > 215 && sat(i) < 0.15) data[i + 3] = 110;

  if (x < minX) minX = x;
  if (y < minY) minY = y;
  if (x > maxX) maxX = x;
  if (y > maxY) maxY = y;
}

const pad = 2;
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const cropW = Math.min(width - left, maxX - minX + 1 + pad * 2);
const cropH = Math.min(height - top, maxY - minY + 1 + pad * 2);

console.log(`artwork bounds ${cropW}x${cropH}`);

const cropped = await sharp(data, { raw: { width, height, channels: 4 } })
  .extract({ left, top, width: cropW, height: cropH })
  .png()
  .toBuffer();

for (const [out, targetHeight] of [
  [navbarOut, 96],
  [footerOut, 104],
]) {
  await sharp(cropped)
    .resize({
      width: Math.round((cropW * targetHeight) / cropH),
      height: targetHeight,
      kernel: "lanczos3",
    })
    .png({ compressionLevel: 9 })
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`${out.split(/[\\/]/).pop()} ${meta.width}x${meta.height}`);
}
