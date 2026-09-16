---
name: seo-json-ld
description: Implementação de dados estruturados Schema.org (JSON-LD) para GEO — utility central lib/jsonld.js, schemas implementados, como atualizar e como adicionar novos.
tags: [json-ld, schema.org, structured-data, geo, organization, article, breadcrumb, localbusiness, realestate]
category: SEO, GEO & AIO
wiki_version: 2.0
generated: 2026-06-05
---

# Dados Estruturados & JSON-LD

Os dados estruturados (JSON-LD com schema.org) são essenciais para:
- **Rich results** no Google (estrelas, breadcrumbs, imagens nos resultados)
- **Google AI Overviews** — o motor generativo cita fontes estruturadas com mais confiança
- **Bing Copilot** e outros motores IA

## Utility central: `lib/jsonld.js`

Toda a lógica de schemas está centralizada em `lib/jsonld.js`. O ficheiro exporta funções builder puras (sem side effects) que constroem e retornam objetos JSON-LD prontos a serializar.

```js
import {
  buildOrganizationSchema,
  buildLocalBusinessSchema,
  buildWebSiteSchema,
  buildBreadcrumbSchema,
  buildNewsArticleSchema,
  buildRealEstateSchema,
} from "@/lib/jsonld";
```

As variáveis `BASE_URL` e `SITE_NAME` são lidas a partir das env vars `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_SITE_NAME` diretamente dentro do módulo. **Nunca** duplicar estas constantes nas páginas quando usares as funções de `lib/jsonld.js`.

## Schemas implementados

| Schema | Onde é injetado | Função builder |
|---|---|---|
| `Organization` | Todas as páginas (layout global) | `buildOrganizationSchema()` |
| `LocalBusiness` | Todas as páginas (layout global) | `buildLocalBusinessSchema()` |
| `WebSite` | Todas as páginas (layout global) | `buildWebSiteSchema()` |
| `NewsArticle` | `/noticias/[slug]` | `buildNewsArticleSchema(post, slug, locale)` |
| `BreadcrumbList` | Notícias, Serviços, Subpáginas | `buildBreadcrumbSchema(items)` |
| `RealEstateListing` | `/servicos/[slug]` | `buildRealEstateSchema(service, slug, locale)` |

### Schemas globais — `app/[locale]/layout.jsx`

Três schemas são injetados em **todas as páginas** no `<body>` do layout:

```jsx
import { buildOrganizationSchema, buildLocalBusinessSchema, buildWebSiteSchema } from "@/lib/jsonld";

<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema()) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteSchema()) }} />
```

### NewsArticle + BreadcrumbList — `app/[locale]/noticias/[slug]/page.jsx`

```jsx
import { buildNewsArticleSchema, buildBreadcrumbSchema } from "@/lib/jsonld";

const newsUrl = `${BASE_URL}${locale === "pt" ? "/noticias" : "/en/news"}`;
const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: locale === "pt" ? "Início" : "Home", item: BASE_URL },
  { name: locale === "pt" ? "Notícias" : "News", item: newsUrl },
  { name: post.frontmatter.title, item: `${newsUrl}/${slug}` },
]);

<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildNewsArticleSchema(post, slug, locale)) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
```

### RealEstateListing + BreadcrumbList — `app/[locale]/servicos/[slug]/page.jsx`

```jsx
import { buildRealEstateSchema, buildBreadcrumbSchema } from "@/lib/jsonld";

const servicesUrl = `${BASE_URL}${locale === "pt" ? "/servicos" : "/en/services"}`;
const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: locale === "pt" ? "Início" : "Home", item: BASE_URL },
  { name: locale === "pt" ? "Serviços" : "Services", item: servicesUrl },
  { name: service.seo.title, item: `${servicesUrl}/${slug}` },
]);

<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildRealEstateSchema(service, slug, locale)) }} />
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
```

### BreadcrumbList (4 níveis) — `app/[locale]/servicos/[slug]/[subpage]/page.jsx`

```jsx
import { buildBreadcrumbSchema } from "@/lib/jsonld";

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: locale === "pt" ? "Início" : "Home", item: BASE_URL },
  { name: locale === "pt" ? "Serviços" : "Services", item: servicesUrl },
  { name: service.seo.title, item: `${servicesUrl}/${slug}` },
  { name: subPageData.seo.title, item: `${servicesUrl}/${slug}/${subpage}` },
]);
```

## Como atualizar um schema existente

Basta editar a função correspondente em `lib/jsonld.js`. Por exemplo, para enriquecer o `Organization` com redes sociais:

```js
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      "https://www.linkedin.com/company/exemplo",
      "https://www.instagram.com/exemplo",
    ],
  };
}
```

A alteração propaga-se automaticamente a todas as páginas onde o schema é injetado — não é necessário tocar em nenhum ficheiro de página.

## Como adicionar um schema novo

1. **Adicionar a função builder em `lib/jsonld.js`:**

```js
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
```

2. **Importar e injetar na página relevante:**

```jsx
import { buildFaqSchema } from "@/lib/jsonld";

// No componente de página (Server Component):
const faqJsonLd = buildFaqSchema(faqItems);

return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
    />
    {/* resto da página */}
  </>
);
```

3. **Atualizar esta documentação** com o novo schema na tabela de schemas implementados.

## Enriquecimento do `LocalBusiness`

O `LocalBusiness` atual usa apenas env vars. Quando houver dados de contacto disponíveis, adicionar ao `buildLocalBusinessSchema()`:

```js
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    // Adicionar quando disponíveis:
    telephone: process.env.NEXT_PUBLIC_PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: process.env.NEXT_PUBLIC_ADDRESS,
      addressLocality: process.env.NEXT_PUBLIC_CITY,
      addressCountry: "PT",
    },
  };
}
```

## Schemas por tipo de página

| Tipo de Página | Schemas a injetar |
|---|---|
| Homepage `/` | `Organization`, `WebSite` (já no layout global) |
| Sobre Nós `/sobre` | `Organization`, `Person` (membros da equipa) |
| Serviço `/servicos/[slug]` | `Service`, `BreadcrumbList` |
| Subpágina `/servicos/[slug]/[subpage]` | `Service`, `BreadcrumbList`, `FAQPage` (se tiver FAQ) |
| Artigo `/noticias/[slug]` | `NewsArticle`, `BreadcrumbList` |
| Contacto `/contacto` | `LocalBusiness` (já no layout global) |

---

## Builders adicionais (prontos a adicionar a `lib/jsonld.js`)

### `buildFaqSchema(items)` — FAQPage

Indicado para subpáginas de serviços e qualquer página com secção de perguntas e respostas.

```js
// lib/jsonld.js
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
```

Uso numa subpágina:

```jsx
import { buildFaqSchema, buildBreadcrumbSchema } from "@/lib/jsonld";

// subPageData.faq = [{ question: "...", answer: "..." }, ...]
const faqJsonLd = buildFaqSchema(subPageData.faq);

<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
```

---

### `buildServiceSchema(service, locale)` — Service

Alternativa mais semântica ao `RealEstateListing` quando o serviço não é imobiliário.

```js
// lib/jsonld.js
export function buildServiceSchema(service, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.seo.title,
    description: service.seo.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: locale === "pt" ? "Portugal" : "Portugal",
    },
    serviceType: service.category ?? "Service",
  };
}
```

---

### `buildPersonSchema(person)` — Person

Para páginas de equipa ou bios de autores. Reforça E-E-A-T e ajuda a IA a reconhecer especialistas.

```js
// lib/jsonld.js
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
    image: person.photo ? `${BASE_URL}${person.photo}` : undefined,
    sameAs: person.social ?? [],
    knowsAbout: person.expertise ?? [],
  };
}
```

---

## Validação

Validar os schemas em:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
