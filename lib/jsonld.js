// Builders de JSON-LD (schema.org). Puros, sem efeitos secundários — cada
// função devolve um objeto pronto a serializar num <script type="application/ld+json">.
// Ver .repowiki/SEO, GEO & AIO/Structured Data & JSON-LD.md — nunca duplicar
// BASE_URL/SITE_NAME nas páginas, só usar os builders daqui.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Site";

// Horário fixo (igual nos 4 locales) — as strings do footer (home.footer.info)
// são texto de display já traduzido ("Dom a Qui 12h00 às 01h00"), frágil de
// re-parsear; o schema usa o mesmo horário em formato schema.org direto.
const OPENING_HOURS = [
  { dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "12:00", closes: "01:00" },
  { dayOfWeek: ["Friday", "Saturday"], opens: "12:00", closes: "01:30" },
];

// Restaurante — substitui o antigo buildLocalBusinessSchema (herdado do
// template imobiliário) por um schema.org/Restaurant, mais específico e o
// que o Google/Bing/LLMs esperam para um negócio de restauração.
export function buildRestaurantSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SITE_NAME,
    url: BASE_URL,
    image: `${BASE_URL}/images/seo/pizzarte.png`,
    servesCuisine: ["Italian", "Pizza"],
    priceRange: "€€",
    foundingDate: "1989",
    maximumAttendeeCapacity: 200,
    openingHoursSpecification: OPENING_HOURS.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      ...spec,
    })),
    ...(process.env.NEXT_PUBLIC_PHONE && { telephone: process.env.NEXT_PUBLIC_PHONE }),
    ...(process.env.NEXT_PUBLIC_EMAIL && { email: process.env.NEXT_PUBLIC_EMAIL }),
    ...(process.env.NEXT_PUBLIC_ADDRESS && {
      address: {
        "@type": "PostalAddress",
        streetAddress: process.env.NEXT_PUBLIC_ADDRESS,
        addressLocality: process.env.NEXT_PUBLIC_CITY || "",
        postalCode: process.env.NEXT_PUBLIC_POSTAL_CODE || "",
        addressCountry: "PT",
      },
    }),
    ...(process.env.NEXT_PUBLIC_GEO_LAT && process.env.NEXT_PUBLIC_GEO_LNG && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: process.env.NEXT_PUBLIC_GEO_LAT,
        longitude: process.env.NEXT_PUBLIC_GEO_LNG,
      },
    }),
    hasMenu: `${BASE_URL}/menu`,
    acceptsReservations: "True",
    ...([
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
    ].some(Boolean) && {
      sameAs: [
        process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
        process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
      ].filter(Boolean),
    }),
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logos/logo.svg`,
    ...(process.env.NEXT_PUBLIC_PHONE && {
      contactPoint: {
        "@type": "ContactPoint",
        telephone: process.env.NEXT_PUBLIC_PHONE,
        contactType: "customer service",
        availableLanguage: ["Portuguese", "English", "French", "Spanish"],
      },
    }),
    ...([
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
    ].some(Boolean) && {
      sameAs: [
        process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
        process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
      ].filter(Boolean),
    }),
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
  };
}

// items: [{ name: string, item: string (absolute URL) }]
export function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

// Converte "€ 2,50" -> 2.50. Devolve null se não conseguir.
function parsePriceEUR(price) {
  if (typeof price !== "string") return null;
  const match = price.replace(/\s/g, "").match(/([\d,.]+)/);
  if (!match) return null;
  const normalized = match[1].replace(".", "").replace(",", ".");
  const value = parseFloat(normalized);
  return Number.isFinite(value) ? value.toFixed(2) : null;
}

// menuData: array de categorias (locales/{lang}/menu.json -> menu.menus),
// cada uma com { title, meals: [{ dishes: [{ name, ingredients?, price }] }] }.
// Gera schema.org/Menu — o maior ganho de GEO do projeto: torna a ementa
// inteira legível por motores generativos (ChatGPT, Perplexity, Gemini).
export function buildMenuSchema(menuData, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: SITE_NAME + " — " + (locale === "pt" ? "Menu" : "Menu"),
    url: `${BASE_URL}${locale === "pt" ? "" : "/" + locale}/menu`,
    hasMenuSection: menuData.map((category) => ({
      "@type": "MenuSection",
      name: category.title,
      hasMenuItem: (category.meals || []).flatMap((meal) =>
        (meal.dishes || []).map((dish) => {
          const price = parsePriceEUR(dish.price);
          return {
            "@type": "MenuItem",
            name: dish.name,
            ...(dish.ingredients && { description: dish.ingredients }),
            ...(price && {
              offers: {
                "@type": "Offer",
                price,
                priceCurrency: "EUR",
              },
            }),
          };
        })
      ),
    })),
  };
}

// items: [{ question: string, answer: string }]
export function buildFaqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
