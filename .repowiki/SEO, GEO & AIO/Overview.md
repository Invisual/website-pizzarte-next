---
name: seo-geo-aio-overview
description: Visão geral da estratégia de SEO, GEO (Generative Engine Optimization) e AIO (AI Optimization) do projeto — como está estruturado, quais os ficheiros envolvidos e que env vars são obrigatórias.
tags: [seo, geo, aio, metadata, openGraph, twitter, hreflang, canonical]
category: SEO, GEO & AIO
wiki_version: 1.0
generated: 2026-06-05
---

# SEO, GEO & AIO — Visão Geral

Este projeto implementa uma estratégia completa de visibilidade em motores de pesquisa tradicionais (SEO), motores de pesquisa generativos como o Google AI Overviews (GEO) e modelos de linguagem/chatbots (AIO).

## Ficheiros envolvidos

| Ficheiro | Responsabilidade |
|---|---|
| `components/Seo.js` | Funções utilitárias que geram objetos de metadata Next.js |
| `app/layout.jsx` | `metadataBase` global — resolve URLs relativas em metadata |
| `app/[locale]/layout.jsx` | JSON-LD `Organization` injetado em todas as páginas |
| `app/sitemap.js` | Gera `sitemap.xml` dinâmico com todas as rotas e hreflang |
| `app/robots.js` | Gera `robots.txt` com regras de crawl e link para o sitemap |
| `public/llms.txt` | Ficheiro de contexto para LLMs (AIO) |

## Variáveis de ambiente

> **Atenção:** `NEXT_PUBLIC_SITE_URL` e `NEXT_PUBLIC_SITE_NAME` são as únicas obrigatórias. Sem elas, todos os URLs canónicos, OG tags, sitemap e schemas JSON-LD apontam para `https://example.pt` (placeholder). **Definir antes de fazer `next build` para produção.**

> As variáveis com prefixo `NEXT_PUBLIC_` são **inlined no bundle client-side** pelo Next.js — nunca colocar segredos nelas. As variáveis sem prefixo (`SMTP_*`, `MAILCHIMP_*`) são server-only e nunca expostas ao browser.

Copiar `.env-example` para `.env.local` e preencher:

### Core (obrigatório)

| Variável | Onde é usada | Descrição |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `lib/jsonld.js`, `components/Seo.js`, `app/sitemap.js`, `app/robots.js` | URL base sem barra final. Resolve todos os URLs canónicos, OG tags e o sitemap. |
| `NEXT_PUBLIC_SITE_NAME` | `lib/jsonld.js`, `components/Seo.js` | Nome do site. Aparece nos títulos, OG tags e schemas `Organization`/`WebSite`. |

### Contacto (opcional — enriquece JSON-LD)

Cada variável é opcional; quando ausente, o campo correspondente é omitido do schema.

| Variável | Schema afetado | Descrição |
|---|---|---|
| `NEXT_PUBLIC_PHONE` | `Organization` → `contactPoint`, `LocalBusiness` → `telephone` | Telefone no formato internacional (`+351 ...`). |
| `NEXT_PUBLIC_EMAIL` | `LocalBusiness` → `email` | Email de contacto público. |
| `NEXT_PUBLIC_ADDRESS` | `Organization` + `LocalBusiness` → `address.streetAddress` | Morada (rua e número). |
| `NEXT_PUBLIC_CITY` | `Organization` + `LocalBusiness` → `address.addressLocality` | Cidade. |
| `NEXT_PUBLIC_POSTAL_CODE` | `Organization` + `LocalBusiness` → `address.postalCode` | Código postal. |

### GEO — coordenadas (opcional)

Ativa o campo `geo` (`GeoCoordinates`) no schema `LocalBusiness`. Melhora a integração com Google Maps e o SEO local. Ambas as variáveis devem estar presentes; se uma faltar, o campo é omitido.

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_GEO_LAT` | Latitude decimal (ex: `38.7169`). Obter em Google Maps → clique direito → copiar coordenadas. |
| `NEXT_PUBLIC_GEO_LNG` | Longitude decimal (ex: `-9.1399`). |

### Redes sociais (opcional)

Preenchidos no array `sameAs` do schema `Organization`. Valores vazios ou ausentes são filtrados automaticamente.

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_SOCIAL_LINKEDIN` | URL completo do perfil LinkedIn (ex: `https://www.linkedin.com/company/exemplo`). |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM` | URL completo do perfil Instagram. |
| `NEXT_PUBLIC_SOCIAL_FACEBOOK` | URL completo da página Facebook. |

### Email — formulário de contacto

| Variável | Descrição |
|---|---|
| `SMTP_HOST` | Hostname do servidor SMTP (ex: `smtp.mailprovider.com`). |
| `SMTP_USER` | Utilizador de autenticação SMTP. |
| `SMTP_PASS` | Password de autenticação SMTP. Nunca comitar este valor. |

### Newsletter — Mailchimp

| Variável | Descrição |
|---|---|
| `MAILCHIMP_API_KEY` | API key no formato `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1` (datacenter no final). |
| `MAILCHIMP_LIST_ID` | ID da audience/lista. Encontra-se em Mailchimp → Audience → Settings → *Audience name and defaults*. |

## O que é gerado por página

Cada página exporta `generateMetadata` que produz:

- `title` e `description`
- `alternates.canonical` — URL canónico na língua correta
- `alternates.languages` — hreflang PT e EN (evita duplicate content)
- `openGraph` — title, description, image, siteName, locale, type
- `twitter` — card summary_large_image

### Exemplo de output (homepage PT)

```json
{
  "title": "Promotores imobiliários - Ponto Urbano",
  "description": "...",
  "alternates": {
    "canonical": "https://example.pt/",
    "languages": {
      "pt": "https://example.pt/",
      "en": "https://example.pt/en/"
    }
  },
  "openGraph": {
    "title": "Promotores imobiliários - Ponto Urbano",
    "locale": "pt_PT",
    "type": "website",
    "images": [{ "url": "https://example.pt/images/homepage_pu.png", "width": 1200, "height": 630 }]
  },
  "twitter": { "card": "summary_large_image" }
}
```

## Como funciona o hreflang

O locale `pt` é o default (`localePrefix: "as-needed"`), por isso não tem prefixo na URL:

| Locale | URL |
|---|---|
| PT (default) | `https://example.pt/noticias` |
| EN | `https://example.pt/en/news` |

O Google usa os hreflang para perceber que são traduções do mesmo conteúdo e não conteúdo duplicado.

## GEO — Dados Estruturados (JSON-LD)

Os motores de pesquisa generativos (Google AI Overviews, Bing Copilot) usam dados estruturados para extrair e citar informação. Ver [[SEO, GEO & AIO/Structured Data & JSON-LD]] para detalhes.

## AIO — llms.txt

O ficheiro `public/llms.txt` é um padrão emergente (llmstxt.org) que ajuda chatbots e AI assistants a entender e citar corretamente o site. Ver [[SEO, GEO & AIO/Sitemap, Robots & llms.txt]].
