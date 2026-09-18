#!/usr/bin/env node
// Gera lib/imageManifest.json: { "Homepage/banner/x.webp": { w, h, blurDataURL? } }
// Substitui o useStaticQuery(allFile) do Gatsby (src/components/layout/image.js) —
// aqui o lookup é feito em build time, uma vez, não a cada render.
// Corre em "prebuild" (package.json) e pode ser corrido manualmente com
// `node scripts/build-image-manifest.mjs`.
import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");
const OUT_FILE = path.join(process.cwd(), "lib", "imageManifest.json");

const RASTER_EXT = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif"]);

// Abaixo disto (maior lado, px) a imagem é pequena o suficiente para não
// precisar de blur placeholder (ícones, logos, decorativos) — poupa peso
// no JSON, que é importado inteiro em componentes client (BarDrinks, etc).
const BLUR_MIN_DIMENSION = 600;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = await walk(IMAGES_DIR);
  const manifest = {};
  let processed = 0;

  for (const file of files) {
    const relativePath = path.relative(IMAGES_DIR, file).split(path.sep).join("/");
    const ext = path.extname(file).toLowerCase();

    if (ext === ".svg") {
      // SVGs não passam por sharp — o componente Image usa <img> direto.
      continue;
    }

    if (!RASTER_EXT.has(ext)) continue;

    try {
      const img = sharp(file);
      const metadata = await img.metadata();
      if (!metadata.width || !metadata.height) continue;

      manifest[relativePath] = { w: metadata.width, h: metadata.height };

      // Placeholder de blur: só para imagens grandes o suficiente para
      // justificar o custo (ícones/logos pequenos não precisam).
      if (Math.max(metadata.width, metadata.height) >= BLUR_MIN_DIMENSION) {
        const blurBuffer = await img.resize(8).webp({ quality: 35 }).toBuffer();
        manifest[relativePath].blurDataURL = `data:image/webp;base64,${blurBuffer.toString("base64")}`;
      }

      processed++;
    } catch (err) {
      console.warn(`[build-image-manifest] falhou em ${relativePath}: ${err.message}`);
    }
  }

  await writeFile(OUT_FILE, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`[build-image-manifest] ${processed} imagens indexadas -> ${path.relative(process.cwd(), OUT_FILE)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
