---
tags: [nuqs, url-state, search-params, app-router, client-components]
category: State Management
wiki_version: 1.0
generated: 2026-06-05
sources: app/[locale]/layout.jsx, package.json
---

# nuqs — Estado de URL

## Tabela de Conteúdos
- [[Architecture/App Router Structure]]
- [[Architecture/Data Flow & Routing]]
- [[index]]

## O que é o nuqs

O **nuqs** (v2.8.9) é uma biblioteca para gerir estado na query string da URL em aplicações Next.js. Permite sincronizar estado de componentes cliente com os search params da URL (`?filtro=activo&pagina=2`) de forma type-safe, sem boilerplate, e com suporte a SSR/RSC.

**Porquê nuqs em vez de `useSearchParams` manual?**

| | `useSearchParams` nativo | nuqs |
|---|---|---|
| Type-safety | ❌ strings raw | ✅ parsers tipados |
| Serialização | manual | automática |
| Batching de updates | ❌ | ✅ (por tick) |
| Shallow routing | manual | automática |
| Default values | manual | declarativos |
| SSR / RSC | leitura manual | ✅ integrado |

## Setup (já configurado)

O `NuqsAdapter` está adicionado em `app/[locale]/layout.jsx` como o provider mais externo da árvore de providers:

```jsx
// app/[locale]/layout.jsx
import { NuqsAdapter } from "nuqs/adapters/next";

return (
  <html lang={locale}>
    <body>
      <NuqsAdapter>
        <NextIntlClientProvider ...>
          <MenuProvider>
            ...
          </MenuProvider>
        </NextIntlClientProvider>
      </NuqsAdapter>
    </body>
  </html>
);
```

> **Fonte:** `app/[locale]/layout.jsx:L8,L24-L39`

O adapter é obrigatório no App Router — sem ele os hooks lançam erro em runtime.

## Hooks Principais

### `useQueryState` — um parâmetro

```tsx
'use client';
import { useQueryState } from 'nuqs';

// String simples
const [search, setSearch] = useQueryState('q');
// URL: ?q=texto → search = "texto"
// URL sem ?q → search = null

// Com parser e default
import { parseAsString } from 'nuqs';
const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));
// Nunca retorna null; default não aparece na URL
```

### `useQueryStates` — múltiplos parâmetros

```tsx
'use client';
import { useQueryStates } from 'nuqs';
import { parseAsInteger, parseAsString } from 'nuqs';

const [filters, setFilters] = useQueryStates({
  pagina:   parseAsInteger.withDefault(1),
  categoria: parseAsString.withDefault(''),
  ordem:    parseAsString.withDefault('data'),
});
// filters.pagina, filters.categoria, filters.ordem
// setFilters({ pagina: 2 }) — só actualiza pagina, mantém o resto
```

## Parsers Disponíveis

| Parser | Tipo TS | Exemplo de URL |
|--------|---------|----------------|
| `parseAsString` | `string` | `?q=texto` |
| `parseAsInteger` | `number` | `?pagina=2` |
| `parseAsFloat` | `number` | `?zoom=1.5` |
| `parseAsBoolean` | `boolean` | `?activo=true` |
| `parseAsIsoDate` | `Date` | `?data=2026-01-15` |
| `parseAsArrayOf(p)` | `T[]` | `?tags=a,b,c` |
| `parseAsJson(schema)` | `T` (Zod/Valibot) | `?obj=%7B...%7D` |

## Opções de Comportamento

```tsx
// shallow: false → server re-render (default: true = só cliente)
const [page, setPage] = useQueryState('pagina', parseAsInteger.withDefault(1));
await setPage(2, { shallow: false }); // força fetch no servidor

// history: 'push' (default) | 'replace'
await setPage(2, { history: 'replace' }); // não cria entrada no histórico

// scroll: true → faz scroll to top após update (default: false)
await setPage(2, { scroll: true });

// throttleMs: debounce de updates (útil em inputs)
const [q, setQ] = useQueryState('q', { throttleMs: 300 });
```

## Padrão: Filtros com Paginação

Exemplo típico de uma página de listagem com filtros e paginação:

```tsx
// components/FiltrosNoticias.tsx
'use client';
import { useQueryStates } from 'nuqs';
import { parseAsInteger, parseAsString } from 'nuqs';

export function FiltrosNoticias() {
  const [params, setParams] = useQueryStates({
    q:        parseAsString.withDefault(''),
    categoria: parseAsString.withDefault(''),
    pagina:   parseAsInteger.withDefault(1),
  });

  return (
    <div>
      <input
        value={params.q}
        onChange={e => setParams({ q: e.target.value, pagina: 1 })}
        placeholder="Pesquisar..."
      />
      <select
        value={params.categoria}
        onChange={e => setParams({ categoria: e.target.value, pagina: 1 })}
      >
        <option value="">Todas</option>
        <option value="empresa">Empresa</option>
      </select>
      <button onClick={() => setParams({ pagina: params.pagina + 1 })}>
        Próxima página
      </button>
    </div>
  );
}
```

## Leitura em Server Components / RSC

Em Server Components, os search params chegam via `searchParams` prop — não há hook. O nuqs fornece `createSearchParamsCache` para parsear os mesmos parâmetros de forma consistente entre RSC e Client Components:

```tsx
// lib/searchParams.ts
import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  q:        parseAsString.withDefault(''),
  pagina:   parseAsInteger.withDefault(1),
});

// app/[locale]/noticias/page.jsx (Server Component)
import { searchParamsCache } from '../../../lib/searchParams';

export default async function NoticiasPage({ searchParams }) {
  const { q, pagina } = searchParamsCache.parse(await searchParams);
  const posts = await getPosts({ query: q, page: pagina });
  return <PostsList posts={posts} />;
}
```

> Este padrão garante que RSC e Client Components usam exatamente os mesmos parsers e defaults — sem divergência de tipos.

## Integração com next-intl

O `NuqsAdapter` é posicionado **fora** do `NextIntlClientProvider` no layout. Esta ordem é correta — o nuqs não depende do contexto de i18n e o adapter precisa apenas estar na árvore de providers antes dos componentes que usam `useQueryState`.

Os search params são independentes do `[locale]` na URL:
- `/pt/noticias?q=empresa&pagina=2` ✅
- `/en/news?q=company&pagina=2` ✅

O nuqs não interfere com os pathnames localizados do `next-intl`.

## Notas de Compatibilidade

- **nuqs v2** requer Next.js 14.2+ — compatível com este projecto (Next.js 16).
- O adapter `nuqs/adapters/next` cobre tanto App Router como Pages Router.
- `useQueryState`/`useQueryStates` são hooks de cliente — usar apenas em componentes com `'use client'`.
- Updates são **batched por tick** de forma automática — múltiplos `setParam()` no mesmo handler resultam numa só navegação.

---
*[[index|← Back to Index]] · Generated by repowiki*
