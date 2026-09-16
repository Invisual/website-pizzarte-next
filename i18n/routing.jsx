import { defineRouting } from "next-intl/routing";

// Slugs traduzidos por idioma, portados de locales/{lang}/url.json do
// Gatsby. "les-crepes-salees", "les-crepes-wrap", "pizzas" e
// "panne-di-pizza" ficam iguais nos 4 idiomas de propósito — são nomes de
// categoria em francês/italiano usados como identidade de menu, não uma
// tradução em falta (confirmado: o próprio menu.json em EN/FR/ES já usa
// esses termos como título visível, nunca traduzidos).
export const routing = defineRouting({
  locales: ["pt", "en", "fr", "es"],
  defaultLocale: "pt",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/menu": "/menu",
    "/pizzarte": "/pizzarte",
    "/galeria": {
      pt: "/galeria",
      en: "/gallery",
      fr: "/galerie",
      es: "/galeria",
    },
    "/contactos": {
      pt: "/contactos",
      en: "/contacts",
      fr: "/contact",
      es: "/contacto",
    },
  },
});

// Slugs de categoria de menu por locale — usados em generateStaticParams e
// no redirect legado (lib/legacyMenuRedirects.js), não no `pathnames` acima
// porque são segmentos dinâmicos ([slug]), que next-intl não traduz sozinho.
export const MENU_CATEGORY_SLUGS = {
  pt: {
    entradas: "entradas",
    saladas: "saladas",
    massas: "massas",
    "les-crepes-salees": "les-crepes-salees",
    "les-crepes-wrap": "les-crepes-wrap",
    pizzas: "pizzas",
    "panne-di-pizza": "panne-di-pizza",
    sobremesas: "sobremesas",
    bebidas: "bebidas",
  },
  en: {
    entradas: "starters",
    saladas: "salads",
    massas: "pasta",
    "les-crepes-salees": "les-crepes-salees",
    "les-crepes-wrap": "les-crepes-wrap",
    pizzas: "pizzas",
    "panne-di-pizza": "panne-di-pizza",
    sobremesas: "desserts",
    bebidas: "drinks",
  },
  fr: {
    entradas: "entrees",
    saladas: "salades",
    massas: "pate",
    "les-crepes-salees": "les-crepes-salees",
    "les-crepes-wrap": "les-crepes-wrap",
    pizzas: "pizzas",
    "panne-di-pizza": "panne-di-pizza",
    sobremesas: "desserts",
    bebidas: "boissons",
  },
  es: {
    entradas: "entradas",
    saladas: "ensaladas",
    massas: "pastas",
    "les-crepes-salees": "les-crepes-salees",
    "les-crepes-wrap": "les-crepes-wrap",
    pizzas: "pizzas",
    "panne-di-pizza": "panne-di-pizza",
    sobremesas: "postres",
    bebidas: "bebidas",
  },
};
