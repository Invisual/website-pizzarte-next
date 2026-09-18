import { notFound } from "next/navigation";
import { getMessages, setRequestLocale } from "next-intl/server";
import { SeoFromData } from "../../../../components/Seo";
import { buildBreadcrumbSchema } from "../../../../lib/jsonld";
import PageShell from "../../../../components/layout/PageShell";
import MenuNavigation from "../../../../components/menu/MenuNavigation";
import Dishes from "../../../../components/menu/Dishes";
import { routing, MENU_CATEGORY_SLUGS, resolveCanonicalMenuSlug } from "../../../../i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";

// Sufixo de marca do <title> — category.title vem de messages/*/menu.json e
// é usado também como heading visível da página (MenuNavigation, Dishes),
// por isso o sufixo é montado aqui em vez de ir para o JSON.
const SITE_TITLE_SUFFIX = {
  pt: "Restaurante Pizzarte",
  en: "Pizzarte Restaurant",
  fr: "Restaurant Pizzarte",
  es: "Restaurante Pizzarte",
};

const BREADCRUMB_LABELS = {
  pt: { home: "Início", menu: "Menu" },
  en: { home: "Home", menu: "Menu" },
  fr: { home: "Accueil", menu: "Menu" },
  es: { home: "Inicio", menu: "Menu" },
};

// Produto cartesiano locale x slug traduzido — substitui a geração de
// páginas de gatsby-node.js. Corrige de passagem o Bug #6 do plano de
// migração: o Gatsby gerava sempre /{lang}/menu/{slugPT} (nunca traduzia o
// slug de categoria fora do PT); aqui cada locale gera o seu próprio slug
// (locales/en/url.json etc, portado para MENU_CATEGORY_SLUGS).
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => Object.values(MENU_CATEGORY_SLUGS[locale]).map((slug) => ({ locale, slug })));
}

async function getCategory(locale, slug) {
  const canonicalSlug = resolveCanonicalMenuSlug(locale, slug);
  if (!canonicalSlug) return null;

  const messages = await getMessages({ locale });
  const category = messages.menu.menus.find((m) => m.slug.replace("/", "") === canonicalSlug);
  return category ? { category, messages } : null;
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const found = await getCategory(locale, slug);
  if (!found) return {};

  const { category } = found;
  const alternatePaths = Object.fromEntries(
    routing.locales.map((loc) => {
      const canonicalSlug = category.slug.replace("/", "");
      const translatedSlug = MENU_CATEGORY_SLUGS[loc]?.[canonicalSlug] || canonicalSlug;
      const prefix = loc === routing.defaultLocale ? "" : `/${loc}`;
      return [loc, `${prefix}/menu/${translatedSlug}`];
    })
  );

  return SeoFromData({
    locale,
    title: `${category.title} | ${SITE_TITLE_SUFFIX[locale] || SITE_TITLE_SUFFIX.pt}`,
    description: category.description,
    image: category.image,
    alternatePaths,
    type: "article",
  });
}

export default async function MenuCategoryPage({ params }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const found = await getCategory(locale, slug);
  if (!found) notFound();

  const { category, messages } = found;

  const labels = BREADCRUMB_LABELS[locale] || BREADCRUMB_LABELS.pt;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const menuPath = MENU_CATEGORY_SLUGS[locale][category.slug.replace("/", "")];
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: labels.home, item: `${BASE_URL}${prefix}` },
    { name: labels.menu, item: `${BASE_URL}${prefix}/menu` },
    { name: category.title, item: `${BASE_URL}${prefix}/menu/${menuPath}` },
  ]);

  return (
    <PageShell homeData={messages.home} menuBg>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MenuNavigation data={messages.menu.menus} dataTitle={messages.menu.pageTitle} />
      <Dishes data={{ menu: category }} />
    </PageShell>
  );
}
