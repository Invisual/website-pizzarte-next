---
tags: [caching, use-cache, performance, server-components, next-js-16]
category: Caching
wiki_version: 1.0
generated: 2026-06-05
---

# `use cache` Directive

O `use cache` é uma diretiva do Next.js 16 (estável) que marca funções assíncronas ou componentes de servidor para serem cacheados entre renders. Substitui as abordagens anteriores (`fetch` com `cache: 'force-cache'`, `unstable_cache`, `dynamic = 'force-static'`).

## Ativação

Em `next.config.js`, a flag `cacheComponents: true` já está ativa neste projeto:

```js
// next.config.js
const nextConfig = {
  cacheComponents: true,
  // ...
}
```

Isto ativa automaticamente `experimental.useCache` e PPR (Partial Prerendering).

## Como usar

Coloca `'use cache'` no topo de uma função assíncrona ou de um componente Server:

```jsx
// Função de data-fetching
async function getPostData(slug) {
  'use cache'
  const res = await fetch(`https://api.example.com/posts/${slug}`)
  return res.json()
}

// Componente Server completo
async function HeroSection() {
  'use cache'
  const data = await fetchHeroContent()
  return <section>{data.title}</section>
}
```

> O resultado da função é serializado e guardado no cache do servidor. Na próxima chamada com os mesmos argumentos, o valor é devolvido sem re-executar a função.

## APIs disponíveis dentro de `use cache`

### `cacheLife(profile)`

Controla o tempo de vida do cache. Chama-se dentro da função cacheada:

```jsx
import { cacheLife } from 'next/cache'

async function getStaticContent() {
  'use cache'
  cacheLife('weeks') // cache durante semanas
  return fetchContent()
}
```

**Perfis disponíveis:**

| Perfil | stale | revalidate | expire |
|--------|-------|------------|--------|
| `seconds` | 30s | 1s | 60s |
| `minutes` | 5min | 1min | 1h |
| `hours` | 5min | 1h | 1 dia |
| `days` | 5min | 1 dia | 1 semana |
| `weeks` | 5min | 1 semana | 30 dias |
| `max` | 5min | 30 dias | nunca |
| `default` | 5min | 15min | nunca |

**Perfil personalizado:**

```jsx
cacheLife({ stale: 60, revalidate: 300, expire: 3600 })
```

**Perfis globais** (definidos em `next.config.js`):

```js
const nextConfig = {
  cacheComponents: true,
  cacheLife: {
    'api-dados': { stale: 30, revalidate: 120, expire: 600 },
  },
}
```

```jsx
cacheLife('api-dados')
```

### `cacheTag(...tags)`

Associa tags ao entry de cache para permitir invalidação seletiva:

```jsx
import { cacheLife, cacheTag } from 'next/cache'

async function getBlogPosts() {
  'use cache'
  cacheLife('days')
  cacheTag('blog', 'posts')
  return fetchAllPosts()
}
```

### `revalidateTag(tag)`

Invalida todas as entradas cacheadas com uma determinada tag. Usa-se tipicamente numa Server Action:

```jsx
'use server'
import { revalidateTag } from 'next/cache'

export async function invalidateBlogCache() {
  revalidateTag('blog')
}
```

### `updateTag(tag)`

Semelhante a `revalidateTag` mas garante *read-your-own-writes* — disponível apenas em Server Actions:

```jsx
'use server'
import { updateTag } from 'next/cache'

export async function publishPost(data) {
  await savePost(data)
  updateTag('posts')
}
```

## Exemplos práticos neste projeto

### Cache de mensagens i18n pesadas

```jsx
// app/[locale]/layout.jsx
import { cacheLife } from 'next/cache'

async function getCachedMessages(locale) {
  'use cache'
  cacheLife('hours')
  cacheTag(`messages-${locale}`)
  return getMessages({ locale })
}
```

### Cache de posts MDX

```jsx
// lib/posts.js
import { cacheLife, cacheTag } from 'next/cache'

export async function getAllPosts(locale) {
  'use cache'
  cacheLife('days')
  cacheTag('mdx-posts', `posts-${locale}`)
  // lógica de leitura de ficheiros MDX
}
```

### Cache de componente de secção estática

```jsx
async function ServicesSection({ locale }) {
  'use cache'
  cacheLife('weeks')
  cacheTag(`services-${locale}`)
  const services = await getServices(locale)
  return <section>...</section>
}
```

## Regras e restrições

- **Não podes passar objetos não-serializáveis** como argumentos (ex: instâncias de classe, funções, Promises). Os argumentos são usados como chave de cache.
- **Request-specific data** (headers, cookies) dentro de `use cache` causa `UseCacheTimeoutError` durante o prerender.
- **Client Components** não podem ser marcados com `use cache` diretamente — envolve-os num Server Component cacheado.
- `cacheTag` e `cacheLife` só funcionam dentro de um contexto `use cache`.
- `updateTag` só pode ser chamado dentro de uma Server Action.

## Diferença para `unstable_cache`

| | `use cache` | `unstable_cache` |
|---|---|---|
| Sintaxe | diretiva no topo da função | wrapper de função |
| Chave de cache | automática (args + closure) | manual |
| Suporte a componentes | sim | não |
| Estável no Next 16 | sim | não (deprecated) |

## Ver também

- [[Architecture/Data Flow & Routing]] — como o App Router integra Server Components
- [[Architecture/App Router Structure]] — estrutura de ficheiros onde aplicar cache
- [[Content/MDX Blog Posts]] — candidato ideal a cacheLife('days')
- [[API/Contact & Newsletter API]] — as API routes **não** devem usar `use cache`
