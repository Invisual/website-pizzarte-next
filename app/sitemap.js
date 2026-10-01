import { getPathname } from "../i18n/navigation";
import { routing, MENU_CATEGORY_SLUGS } from "../i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";

function urlFor(pathnameKey, locale) {
  return `${BASE_URL}${getPathname({ href: pathnameKey, locale })}`;
}

function languagesFor(pathnameKey) {
  return Object.fromEntries(routing.locales.map((locale) => [locale, urlFor(pathnameKey, locale)]));
}

// Uma <url> por idioma (não só a PT), cada uma com o cluster completo de
// alternates + x-default — o mesmo que components/Seo.js declara no HTML.
function entriesFor(languages, { priority, changeFrequency }) {
  const alternates = { languages: { ...languages, "x-default": languages[routing.defaultLocale] } };
  return routing.locales.map((locale) => ({
    url: languages[locale],
    changeFrequency,
    priority,
    alternates,
  }));
}

function makeEntry(pathnameKey, options) {
  return entriesFor(languagesFor(pathnameKey), options);
}

const STATIC_ROUTES = [
  { pathname: "/", priority: 1.0, changeFrequency: "monthly" },
  { pathname: "/menu", priority: 0.8, changeFrequency: "monthly" },
  { pathname: "/pizzarte", priority: 0.7, changeFrequency: "yearly" },
  { pathname: "/galeria", priority: 0.6, changeFrequency: "monthly" },
  { pathname: "/contactos", priority: 0.6, changeFrequency: "yearly" },
];

export default function sitemap() {
  const staticEntries = STATIC_ROUTES.flatMap(({ pathname, priority, changeFrequency }) => makeEntry(pathname, { priority, changeFrequency }));

  // Categorias de menu — cada slug traduzido por locale (ver
  // i18n/routing.jsx MENU_CATEGORY_SLUGS), sem depender do mapa `pathnames`
  // do next-intl (não cobre segmentos dinâmicos data-driven).
  const canonicalSlugs = Object.keys(MENU_CATEGORY_SLUGS.pt);
  const menuEntries = canonicalSlugs.flatMap((canonicalSlug) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => {
        const translatedSlug = MENU_CATEGORY_SLUGS[locale][canonicalSlug];
        const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
        return [locale, `${BASE_URL}${prefix}/menu/${translatedSlug}`];
      })
    );

    return entriesFor(languages, { priority: 0.7, changeFrequency: "monthly" });
  });

  return [...staticEntries, ...menuEntries];
}
