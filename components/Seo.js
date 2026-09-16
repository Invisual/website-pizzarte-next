import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Site";

const OG_LOCALE = { pt: "pt_PT", en: "en_US", fr: "fr_FR", es: "es_ES" };

// Constrói canonical + alternates.languages (+ x-default) para os 4 locales.
//
// - `pathname`: chave estática já registada em i18n/routing.jsx (`/`, `/menu`,
//   `/pizzarte`, `/galeria`, `/contactos`) — resolvida com getPathname().
// - `alternatePaths`: para rotas dinâmicas (`/menu/[slug]`) cujo slug
//   traduzido não é um padrão estático mas depende dos dados (ver
//   i18n/routing.jsx MENU_CATEGORY_SLUGS). Formato: { pt: "/menu/entradas",
//   en: "/menu/starters", ... } — caminho já traduzido, sem prefixo de locale.
function buildUrls({ locale, pathname, alternatePaths }) {
  const urls = {};
  for (const loc of routing.locales) {
    const path = alternatePaths
      ? alternatePaths[loc]
      : getPathname({ href: pathname, locale: loc });
    urls[loc] = loc === routing.defaultLocale ? `${BASE_URL}${path}` : `${BASE_URL}/${loc}${path}`;
  }
  return {
    ...urls,
    canonical: urls[locale],
    xDefault: urls[routing.defaultLocale],
  };
}

function buildOgImage(image) {
  if (!image) return null;
  return image.startsWith("http") ? image : `${BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

function buildMetadata({ locale, title, description, image, type, urls }) {
  const ogImage = buildOgImage(image);
  const { canonical, xDefault, ...languages } = urls;

  return {
    title,
    description,

    alternates: {
      canonical,
      languages: { ...languages, "x-default": xDefault },
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale] || "pt_PT",
      type,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

// Metadata a partir de um namespace de tradução (next-intl). Usar para
// páginas cujo título/descrição vive em messages/{locale}/*.json (seo.title,
// seo.description, seo.image).
export async function Seo({ locale, namespace, pathname, alternatePaths, type = "website" }) {
  const { getTranslations } = await import("next-intl/server");
  const t = await getTranslations({ locale, namespace });

  const urls = buildUrls({ locale, pathname, alternatePaths });

  let image = null;
  try {
    const val = t("image");
    if (val) image = val;
  } catch {}

  return buildMetadata({ locale, title: t("title"), description: t("description"), image, type, urls });
}

// Metadata a partir de dados já resolvidos (ex: categoria de menu escolhida
// em runtime, cujo título não é uma chave de tradução fixa).
export function SeoFromData({ locale, title, description, pathname, alternatePaths, image = null, type = "website" }) {
  const urls = buildUrls({ locale, pathname, alternatePaths });
  return buildMetadata({ locale, title, description, image, type, urls });
}
