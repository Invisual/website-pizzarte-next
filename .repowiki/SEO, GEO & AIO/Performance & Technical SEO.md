---
name: seo-performance-technical
description: Guia técnico de performance e SEO para devs — renderização, Core Web Vitals, meta tags, redirects e checklist de implementação.
tags: [seo, performance, core-web-vitals, rendering, meta-tags, redirects, canonical]
category: SEO, GEO & AIO
wiki_version: 1.0
generated: 2026-06-11
---

# Performance & Technical SEO

Todo o conteúdo indexável deve ser visível no HTML inicial. Performance e rastreabilidade são responsabilidade do dev — não do SEO.

## 1. Renderização — a decisão mais crítica

| Estratégia | Como o Google lê | SEO | Performance | Quando usar |
|------------|-----------------|-----|-------------|-------------|
| **CSR** | Dois passes, pode falhar | ❌ Mau | Variável | Nunca para conteúdo crítico |
| **SSR** | HTML completo no primeiro pedido | ✅ Excelente | Bom | Conteúdo dinâmico e personalizado |
| **SSG** | HTML pré-gerado | ✅ Excelente | Excelente | Conteúdo estático ou pouco dinâmico |
| **ISR** | HTML pré-gerado com revalidação | ✅ Excelente | Excelente | Conteúdo que muda com frequência |

Este projeto usa **Next.js 16 App Router com PPR** — por defeito as páginas são SSR com `use cache` para ISR seletivo. Ver [[../Caching/use cache Directive]] para cache profiles.

```js
// ❌ CSR puro — Googlebot não vê o conteúdo
useEffect(() => {
  fetch('/api/content').then(data => setContent(data));
}, []);

// ✅ Server Component (App Router) — HTML disponível no primeiro pedido
export default async function Page() {
  const content = await fetchContent(); // executa no servidor
  return <div>{content}</div>;
}
```

---

## 2. Core Web Vitals

| Métrica | Target | O que mede |
|---------|--------|-----------|
| **TTFB** | < 200ms | Tempo até ao primeiro byte do servidor |
| **LCP** | < 2.5s | Carregamento do maior elemento visível |
| **CLS** | < 0.1 | Deslocação cumulativa do layout |
| **INP** | < 200ms | Resposta a interações do utilizador |

### LCP — Hero image sem atraso

```html
<!-- ❌ lazy loading num hero atrasa o LCP -->
<img src="hero.webp" loading="lazy" alt="Hero">

<!-- ✅ hero image com prioridade máxima -->
<img
  src="hero.webp"
  loading="eager"
  fetchpriority="high"
  width="1200"
  height="600"
  alt="Descrição clara do hero"
>

<!-- ✅ Preload no <head> para garantir LCP rápido -->
<link rel="preload" as="image" href="hero.webp" fetchpriority="high">
```

Em Next.js, usar `<Image priority />` no componente `next/image` para o hero:

```jsx
import Image from "next/image";

<Image src="/hero.webp" width={1200} height={600} priority alt="Hero" />
```

### CLS — Dimensões sempre definidas

```html
<!-- ❌ sem dimensões — causa layout shift -->
<img src="foto.webp" alt="Foto">

<!-- ✅ com width e height explícitos -->
<img src="foto.webp" width="800" height="600" alt="Foto">

<!-- ✅ alternativa CSS com aspect-ratio -->
<style>
.img-container { aspect-ratio: 4 / 3; width: 100%; }
</style>
```

### JavaScript — não bloquear rendering

```html
<!-- ❌ bloqueia o parsing do HTML -->
<script src="analytics.js"></script>

<!-- ✅ defer — não bloqueia, executa em ordem após parse -->
<script src="main.js" defer></script>

<!-- ✅ async — não bloqueia, executa logo que carrega (sem ordem garantida) -->
<script src="analytics.js" async></script>
```

---

## 3. Meta Tags — implementação em App Router

### Canonical + Open Graph via `generateMetadata`

```js
// app/[locale]/servicos/[slug]/page.jsx
export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const service = getServiceData(slug, locale);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${locale === "pt" ? "servicos" : "en/services"}/${slug}`;

  return {
    title: service.seo.title,
    description: service.seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
      url: canonicalUrl,
      images: [{ url: service.seo.image, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.seo.title,
      description: service.seo.description,
      images: [service.seo.image],
    },
  };
}
```

### Meta robots — controlo de indexação

```js
// Não indexar uma página (ex: páginas de preview, admin)
export const metadata = {
  robots: { index: false, follow: false },
};

// Comportamento padrão (não é necessário declarar explicitamente)
export const metadata = {
  robots: { index: true, follow: true },
};
```

### hreflang — já implementado no `Seo.js`

O projeto já gera `alternates.languages` no `Seo.js` global. Ver [[Overview]] para os env vars necessários.

---

## 4. Redirects em `next.config.js`

```js
// next.config.js
module.exports = {
  async redirects() {
    return [
      // 301 — URL mudou permanentemente (preserva PageRank)
      {
        source: "/antigo-caminho",
        destination: "/novo-caminho",
        permanent: true,
      },
      // 302 — redirect temporário (campanhas, A/B tests)
      {
        source: "/promo",
        destination: "/promocoes",
        permanent: false,
      },
    ];
  },
};
```

**Regras:**
- Usar **301** para URLs que mudaram permanentemente (slug alterado, reestruturação)
- Usar **302** apenas para redirects temporários
- Nunca ter cadeias: A→B→C→D — encurtar sempre para A→D
- Redirect para a mesma URL = loop crítico

---

## 5. Checklist do Dev

### Renderização
- [ ] Conteúdo crítico visível no HTML sem JavaScript
- [ ] Server Components para páginas e layouts
- [ ] `use cache` nas funções de data fetching pesadas

### Performance
- [ ] TTFB < 200ms
- [ ] LCP < 2.5s — hero image com `priority` (next/image) ou `fetchpriority="high"`
- [ ] CLS < 0.1 — width + height em todas as imagens
- [ ] Scripts não-críticos com `defer` ou `async`

### Meta Tags & Infraestrutura
- [ ] `generateMetadata` com `canonical` em todas as rotas dinâmicas
- [ ] Open Graph e Twitter Card preenchidos
- [ ] HTTPS ativo
- [ ] www → não-www (ou vice-versa) com redirect 301
- [ ] `robots.txt` não bloqueia CSS/JS
- [ ] `sitemap.xml` submetido no Google Search Console

### Schema
- [ ] `Organization` + `WebSite` + `LocalBusiness` em todas as páginas (via layout global — já implementado)
- [ ] `BreadcrumbList` em subpáginas (ver [[Structured Data & JSON-LD]])
- [ ] `NewsArticle` em artigos de blog
- [ ] `FAQPage` em páginas com FAQ
- [ ] Validado no [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Ver também

- [[Structured Data & JSON-LD]] — builders de schema e tabela por tipo de página
- [[Sitemap, Robots & llms.txt]] — implementação do sitemap dinâmico e robots.txt
- [[../Caching/use cache Directive]] — cache profiles para TTFB
