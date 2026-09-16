#!/usr/bin/env node
// Extração ÚNICA da galeria do WordPress (media.pizzarte.com) para dentro do
// repositório — ver Fase 5 do plano de migração. Depois de correr uma vez,
// o WordPress deixa de ser necessário: a página /galeria lê
// content/gallery.json e as imagens ficam em public/images/galeria/.
//
// Uso: node scripts/fetch-gallery.mjs
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WP_GRAPHQL = "https://media.pizzarte.com/graphql";
const OUT_DIR = path.join(process.cwd(), "public", "images", "galeria");
const MANIFEST_FILE = path.join(process.cwd(), "content", "gallery.json");

const QUERY = `{
  galleries(first: 5) {
    nodes {
      galleries {
        categories {
          slug
          displayname
          images { nodes { sourceUrl altText } }
        }
      }
    }
  }
}`;

// altText vinha sempre vazio no WordPress — texto alternativo descritivo
// por categoria, numerado.
const ALT_BY_SLUG = {
  bar: (n) => `Bar da Pizzarte, foto ${n}`,
  space: (n) => `Espaço do restaurante Pizzarte, foto ${n}`,
  events: (n) => `Evento no Pizzarte, foto ${n}`,
};

async function main() {
  const res = await fetch(WP_GRAPHQL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: QUERY }),
  });
  if (!res.ok) throw new Error(`WPGraphQL respondeu ${res.status}`);
  const { data, errors } = await res.json();
  if (errors) throw new Error(JSON.stringify(errors));

  const categories = data.galleries.nodes[0].galleries.categories;
  const manifest = {};

  for (const category of categories) {
    const dir = path.join(OUT_DIR, category.slug);
    await mkdir(dir, { recursive: true });

    manifest[category.slug] = [];

    let i = 0;
    for (const node of category.images.nodes) {
      i++;
      const filename = `${category.slug}-${String(i).padStart(2, "0")}.webp`;
      const filePath = path.join(dir, filename);

      const imgRes = await fetch(node.sourceUrl);
      if (!imgRes.ok) {
        console.warn(`[fetch-gallery] falhou ${node.sourceUrl}: ${imgRes.status}`);
        continue;
      }
      const buffer = Buffer.from(await imgRes.arrayBuffer());

      const pipeline = sharp(buffer).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 75 });
      const info = await pipeline.toFile(filePath);

      // width/height/blurDataURL não vão para aqui — ficam sob public/images/,
      // por isso scripts/build-image-manifest.mjs já os indexa (o <Image>
      // partilhado faz o lookup sozinho). Este manifesto só guarda o essencial
      // específico da galeria: caminho + alt text + categoria.
      manifest[category.slug].push({
        src: `galeria/${category.slug}/${filename}`,
        alt: node.altText || (ALT_BY_SLUG[category.slug]?.(i) ?? `${category.displayname} ${i}`),
      });

      console.log(`[fetch-gallery] ${category.slug}/${filename} (${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB)`);
    }
  }

  await mkdir(path.dirname(MANIFEST_FILE), { recursive: true });
  await writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`[fetch-gallery] manifesto escrito em ${path.relative(process.cwd(), MANIFEST_FILE)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
