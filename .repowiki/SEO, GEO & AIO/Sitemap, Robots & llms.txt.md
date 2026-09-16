---
name: seo-sitemap-robots-llms
description: Configuração do sitemap.xml dinâmico, robots.txt e llms.txt — como estão gerados, como se adiciona uma nova rota e o que é o padrão llms.txt para AIO.
tags: [sitemap, robots, llms.txt, aio, crawl, indexação]
category: SEO, GEO & AIO
wiki_version: 1.0
generated: 2026-06-05
---

# Sitemap, Robots & llms.txt

## sitemap.xml — `app/sitemap.js`

Gerado automaticamente pelo Next.js a partir do ficheiro `app/sitemap.js`. Acessível em `/sitemap.xml`.

### Estrutura atual

```
/ (homepage PT)            ↔  /en/ (homepage EN)
/noticias                  ↔  /en/news
/noticias/[slug]           ↔  /en/news/[enSlug]
/servicos                  ↔  /en/services
/servicos/[slug]           ↔  /en/services/[enSlug]
/servicos/[slug]/[subpage] ↔  /en/services/[enSlug]/[enSubSlug]
```

Cada entrada inclui `alternates.languages` com as URLs PT e EN, permitindo ao Google entender as traduções sem depender apenas do hreflang em `<head>`.

### Como adicionar uma nova rota estática

Abrir `app/sitemap.js` e adicionar ao array `STATIC_ROUTES`:

```js
{
  pt: { path: "/sobre-nos", priority: 0.7, changeFrequency: "yearly" },
  en: { path: "/about" },
},
```

### Como adicionar uma nova rota dinâmica

```js
// Dentro da função sitemap(), depois dos postEntries:
const myRoutes = myData.map((item) =>
  makeEntry({
    ptPath: `/minha-secao/${item.slugPt}`,
    enPath: `/my-section/${item.slugEn}`,
    priority: 0.6,
    changeFrequency: "monthly",
    date: item.updatedAt,
  })
);

return [...staticEntries, ...postEntries, ...serviceEntries, ...myRoutes];
```

### Prioridades usadas

| Tipo de página | Priority |
|---|---|
| Homepage | 1.0 |
| Listagens (notícias, serviços) | 0.8 |
| Páginas de serviço | 0.7 |
| Artigos / subpáginas | 0.6 |

---

## robots.txt — `app/robots.js`

Gerado automaticamente a partir de `app/robots.js`. Acessível em `/robots.txt`.

### Configuração atual

```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://example.pt/sitemap.xml
```

A rota `/api/` está bloqueada para que os endpoints de contacto e newsletter não sejam indexados.

### Como bloquear mais rotas

```js
disallow: ["/api/", "/admin/", "/draft/"],
```

### Como bloquear um crawler específico (ex: GPTBot)

```js
rules: [
  {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/"],
  },
  {
    userAgent: "GPTBot",
    disallow: ["/"],   // bloquear OpenAI de scraping
  },
],
```

---

## llms.txt — `public/llms.txt`

Padrão emergente de [llmstxt.org](https://llmstxt.org/). Acessível em `/llms.txt`.

### Para que serve

Quando um utilizador pergunta a um chatbot (ChatGPT, Claude, Gemini, Perplexity) sobre a empresa ou os seus projetos, o modelo pode consultar este ficheiro para:
- Entender o que o site representa
- Citar corretamente o nome e a URL
- Navegar para as secções corretas

### Estrutura do ficheiro

```markdown
# [Nome do Site]

> Descrição breve

Texto de contexto livre (1-2 parágrafos)

## Main sections

- [Secção](url): Descrição
- [Secção](url): Descrição

## Languages

- PT: url
- EN: url/en/

## Optional

- [Sitemap](url/sitemap.xml)
- [Privacy](url/politica-de-privacidade)
```

### Manutenção

Atualizar `public/llms.txt` sempre que:
- O nome do site mudar
- Forem adicionadas novas secções principais
- A URL de produção mudar (substituir `https://example.pt` pelo URL real)

---

## Checklist de produção

- [ ] Definir `NEXT_PUBLIC_SITE_URL` com o URL real
- [ ] Definir `NEXT_PUBLIC_SITE_NAME` com o nome real do site
- [ ] Atualizar `public/llms.txt` com o URL e nome corretos
- [ ] Verificar `/sitemap.xml` no browser após deploy
- [ ] Verificar `/robots.txt` no browser após deploy
- [ ] Submeter sitemap no Google Search Console
- [ ] Submeter sitemap no Bing Webmaster Tools
