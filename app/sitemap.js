import { getPathname } from "../i18n/navigation";
import { routing, MENU_CATEGORY_SLUGS } from "../i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";

function urlFor(pathnameKey, locale) {
  return `${BASE_URL}${getPathname({ href: pathnameKey, locale })}`;
}

function languagesFor(pathnameKey) {
  return Object.fromEntries(routing.locales.map((locale) => [locale, urlFor(pathnameKey, locale)]));
}

function makeEntry(pathnameKey, { priority, changeFrequency }) {
  return {
    url: urlFor(pathnameKey, routing.defaultLocale),
    changeFrequency,
    priority,
    alternates: { languages: languagesFor(pathnameKey) },
  };
}

const STATIC_ROUTES = [
  { pathname: "/", priority: 1.0, changeFrequency: "monthly" },
  { pathname: "/menu", priority: 0.8, changeFrequency: "monthly" },
  { pathname: "/pizzarte", priority: 0.7, changeFrequency: "yearly" },
  { pathname: "/galeria", priority: 0.6, changeFrequency: "monthly" },
  { pathname: "/contactos", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap() {
  const staticEntries = STATIC_ROUTES.map(({ pathname, priority, changeFrequency }) => makeEntry(pathname, { priority, changeFrequency }));

  // Categorias de menu — cada slug traduzido por locale (ver
  // i18n/routing.jsx MENU_CATEGORY_SLUGS), sem depender do mapa `pathnames`
  // do next-intl (não cobre segmentos dinâmicos data-driven).
  const canonicalSlugs = Object.keys(MENU_CATEGORY_SLUGS.pt);
  const menuEntries = canonicalSlugs.map((canonicalSlug) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => {
        const translatedSlug = MENU_CATEGORY_SLUGS[locale][canonicalSlug];
        const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
        return [locale, `${BASE_URL}${prefix}/menu/${translatedSlug}`];
      })
    );

    return {
      url: languages[routing.defaultLocale],
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages },
    };
  });

  return [...staticEntries, ...menuEntries];
}
