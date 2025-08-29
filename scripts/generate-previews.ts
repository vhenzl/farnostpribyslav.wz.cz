#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const PREVIEWS_DIR = path.join(IMAGES_DIR, 'previews');
const PREVIEW_WIDTH = 180;
const PREVIEW_MAX_HEIGHT = 135;

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

function isImageFile(file: string) {
  return /\.(jpe?g|png|webp|gif|tiff|bmp)$/i.test(file);
}

async function processImage(file: string) {
  const srcPath = path.join(IMAGES_DIR, file);
  const destPath = path.join(PREVIEWS_DIR, file);
  try {
    // Resize to required width, height is auto
    const resizedBuffer = await sharp(srcPath)
      .resize({ width: PREVIEW_WIDTH })
      .toBuffer();

    // Check height, crop if needed
    const resizedImage = sharp(resizedBuffer);
    const meta = await resizedImage.metadata();
    let output = resizedImage;
    if (meta.height > PREVIEW_MAX_HEIGHT) {
      output = resizedImage.extract({ left: 0, top: 0, width: PREVIEW_WIDTH, height: PREVIEW_MAX_HEIGHT });
    }
    await output.toFile(destPath);
    console.log(`Preview created: ${destPath}`);
  } catch (err) {
    console.warn(`Failed to process ${file}:`, err instanceof Error ? err.message : String(err));
  }
}

async function main() {
  await ensureDir(PREVIEWS_DIR);
  const files = await fs.readdir(IMAGES_DIR);
  for (const file of files) {
    const fullPath = path.join(IMAGES_DIR, file);
    const stat = await fs.stat(fullPath);
    if (stat.isFile() && isImageFile(file)) {
      await processImage(file);
    }
  }
}

try {
  await main();
} catch (err) {
  console.warn('Image resizing failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
}
