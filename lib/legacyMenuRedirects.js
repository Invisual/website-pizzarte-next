// Redirects 301 das URLs antigas geradas pelo Gatsby. gatsby-node.js criava
// sempre `/{lang}/menu/{slugPT}` (nunca traduzia o slug de categoria fora
// do PT, mesmo url.json já tendo a tradução certa — ver Bug #6 do plano de
// migração). Essas URLs ficaram indexadas; isto evita 404s e perda de SEO.
//
// next.config.js corre em CommonJS puro (sem transpilar), por isso esta
// tabela é uma cópia autónoma de MENU_CATEGORY_SLUGS (i18n/routing.jsx,
// módulo ES) — só os pares que DIFEREM do slug PT, é o que interessa aqui.
const TRANSLATED_SLUGS = {
  en: { entradas: "starters", saladas: "salads", massas: "pasta", sobremesas: "desserts", bebidas: "drinks" },
  fr: { entradas: "entrees", saladas: "salades", massas: "pate", bebidas: "boissons" },
  es: { saladas: "ensaladas", massas: "pastas", sobremesas: "postres" },
};

const redirects = [];

for (const [locale, dict] of Object.entries(TRANSLATED_SLUGS)) {
  for (const [ptSlug, translatedSlug] of Object.entries(dict)) {
    redirects.push({
      source: `/${locale}/menu/${ptSlug}`,
      destination: `/${locale}/menu/${translatedSlug}`,
      permanent: true,
    });
  }
}

module.exports = redirects;
