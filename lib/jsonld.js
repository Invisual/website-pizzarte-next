const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Site";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    ...(process.env.NEXT_PUBLIC_PHONE && {
      contactPoint: {
        "@type": "ContactPoint",
        telephone: process.env.NEXT_PUBLIC_PHONE,
        contactType: "customer service",
        availableLanguage: "Portuguese",
      },
    }),
    ...(process.env.NEXT_PUBLIC_ADDRESS && {
      address: {
        "@type": "PostalAddress",
        streetAddress: process.env.NEXT_PUBLIC_ADDRESS,
        addressLocality: process.env.NEXT_PUBLIC_CITY || "",
        postalCode: process.env.NEXT_PUBLIC_POSTAL_CODE || "",
        addressCountry: "PT",
      },
    }),
    ...([
      process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
      process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
      process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
    ].some(Boolean) && {
      sameAs: [
        process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN,
        process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
        process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
      ].filter(Boolean),
    }),
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
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

export function buildNewsArticleSchema(post, slug, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.frontmatter.title,
    description: post.frontmatter.excerpt || post.frontmatter.title,
    ...(post.frontmatter.image && {
      image: `${BASE_URL}${post.frontmatter.image}`,
    }),
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
    datePublished: post.frontmatter.date,
    url: `${BASE_URL}${locale === "pt" ? "/noticias" : "/en/news"}/${slug}`,
  };
}

// Mantido para compatibilidade com projetos imobiliários
// service: { seo: { title, description, image } }
export function buildRealEstateSchema(service, slug, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: service.seo.title,
    description: service.seo.description,
    url: `${BASE_URL}${locale === "pt" ? "/servicos" : "/en/services"}/${slug}`,
    ...(service.seo.image && {
      image: `${BASE_URL}${service.seo.image}`,
    }),
  };
}

// service: { seo: { title, description, image? } }
export function buildServiceSchema(service, slug, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.seo.title,
    description: service.seo.description,
    url: `${BASE_URL}${locale === "pt" ? "/servicos" : "/en/services"}/${slug}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Portugal",
    },
    ...(service.seo.image && {
      image: `${BASE_URL}${service.seo.image}`,
    }),
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

// person: { name, role, url, photo?: string, social?: string[], expertise?: string[] }
export function buildPersonSchema(person) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    url: `${BASE_URL}${person.url}`,
    ...(person.photo && { image: `${BASE_URL}${person.photo}` }),
    ...(person.social?.length && { sameAs: person.social }),
    ...(person.expertise?.length && { knowsAbout: person.expertise }),
  };
}
