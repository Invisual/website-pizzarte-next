---
tags: [services, routing, i18n, dynamic-pages, next-intl]
category: Content
wiki_version: 1.0
generated: 2026-06-05
sources: app/[locale]/servicos/[slug]/page.jsx, app/[locale]/servicos/[slug]/[subpage]/page.jsx
---

# Services & Dynamic Pages

## Table of Contents
- [[Content/MDX Blog Posts]]
- [[Architecture/App Router Structure|Architecture Overview]]
- [[index]]

## Visao Geral

As paginas de servicos diferem fundamentalmente do sistema de blog: em vez de ficheiros MDX no disco, o conteudo e carregado a partir das mensagens de i18n geridas pelo `next-intl`. Cada locale tem o seu proprio catalogo de mensagens, e os servicos (incluindo os seus slugs, titulos, descricoes e subpaginas) vivem dentro da chave `projects.projetos.all` desse catalogo.

Esta abordagem elimina a necessidade de ficheiros de conteudo separados para servicos — a traducao e o conteudo sao co-localizados nos ficheiros de mensagens. O routing e dinamico em dois niveis: `[slug]` para o servico pai e `[subpage]` para paginas filhas dentro de um servico.

> **Sources:** `app/[locale]/servicos/[slug]/page.jsx:L1-L57` · `app/[locale]/servicos/[slug]/[subpage]/page.jsx:L1-L52`

## Estrutura de Dados dos Servicos

Os servicos sao representados como objectos dentro do array `messages.projects.projetos.all`. Cada objecto de servico contem pelo menos os seguintes campos inferidos do codigo:

| Campo       | Tipo   | Descricao                                                      |
|-------------|--------|----------------------------------------------------------------|
| `id`        | string | Identificador estavel e partilhado entre locales (usado para cruzar idiomas) |
| `slug`      | string | Segmento URL unico dentro do locale                            |
| `seo.title` | string | Titulo do servico usado no `<h1>` e em metadados              |
| `seo.description` | string | Descricao usada no `<p>` de apresentacao                 |
| `subpages`  | array  | Lista opcional de subpaginas, cada uma com `id`, `slug` e `seo` |

As subpaginas seguem a mesma estrutura de `seo.title` e `seo.description`, alem de um campo `id` proprio que permite o cruzamento de idiomas ao nivel da subpagina.

```mermaid
erDiagram
    SERVICE {
        string id
        string slug
        object seo
        array subpages
    }
    SEO {
        string title
        string description
    }
    SUBPAGE {
        string id
        string slug
        object seo
    }
    SERVICE ||--|| SEO : "seo"
    SERVICE ||--o{ SUBPAGE : "subpages"
    SUBPAGE ||--|| SEO : "seo"
```

> **Sources:** `app/[locale]/servicos/[slug]/page.jsx:L10-L13` · `app/[locale]/servicos/[slug]/[subpage]/page.jsx:L9-L25`

## Pagina de Servico (`[slug]/page.jsx`)

O Server Component `ProjectPage` recebe `locale` e `slug` de `params`. O fluxo de execucao e:

1. Carrega as mensagens do locale activo com `getMessages()`.
2. Extrai o array de servicos de `messages.projects.projetos.all`.
3. Encontra o servico cujo `slug` coincide com o parametro de URL; se nao existir, chama `notFound()`.
4. Carrega as mensagens do outro locale com `getMessages({ locale: otherLocale })` para resolver o slug equivalente, usando o campo `id` como chave de cruzamento.
5. Passa ao `MenuConfigClient` os paths PT e EN correctos para o switcher de idioma:
   - `/servicos/<slug>` para PT
   - `/services/<slug>` para EN (o prefixo de path e diferente por idioma)
6. Renderiza o titulo e descricao do servico, e lista as subpaginas como links `href=/servicos/<service.slug>/<sub.slug>`.

```mermaid
sequenceDiagram
    participant Router as "Next.js Router"
    participant Page as "ProjectPage"
    participant I18n as "next-intl getMessages()"
    participant Menu as "MenuConfigClient"

    Router->>Page: params { locale, slug }
    Page->>I18n: getMessages() — locale activo
    I18n-->>Page: messages.projects.projetos.all
    Page->>Page: find service by slug
    alt service nao encontrado
        Page->>Router: notFound()
    else service encontrado
        Page->>I18n: getMessages({ locale: otherLocale })
        I18n-->>Page: otherServices
        Page->>Page: find otherService by service.id
        Page->>Menu: uris { pt: "/servicos/...", en: "/services/..." }
        Page->>Router: Render h1 + p + subpages list
    end
```

> **Sources:** `app/[locale]/servicos/[slug]/page.jsx:L6-L57`

## Pagina de Subservico (`[slug]/[subpage]/page.jsx`)

O Server Component `ServiceSubPage` adiciona um terceiro nivel ao routing dinamico, recebendo `locale`, `slug` e `subpage` de `params`. O cruzamento de idiomas opera a dois niveis independentes:

1. **Nivel do servico pai** — o `id` do servico e usado para encontrar o servico equivalente no outro locale e obter o seu `otherSlug`.
2. **Nivel da subpagina** — dentro do servico equivalente, o `id` da subpagina e usado para encontrar a subpagina correspondente e obter o seu `otherSubSlug`.

O `MenuConfigClient` so recebe URIs validos se ambos os niveis forem resolvidos com sucesso (`otherSlug && otherSubSlug`); caso contrario, o valor e `null`.

O conteudo renderizado e minimo: o slug do servico pai num `<h1>`, o titulo da subpagina num `<h2>`, e a descricao num `<p>`.

```mermaid
flowchart TD
    A["Request: /[locale]/servicos/[slug]/[subpage]"] --> B["getMessages(locale)"]
    B --> C["find service by slug"]
    C --> D["find subpage by subpage param"]
    D --> E["getMessages(otherLocale)"]
    E --> F["find otherService by service.id"]
    F --> G["find otherSubPage by subPageData.id"]
    G --> H{Ambos resolvidos?}
    H -- Sim --> I["uris com paths PT e EN completos"]
    H -- Nao --> J["uris com null para locale sem resolucao"]
    I --> K["Render h1 + h2 + p"]
    J --> K
```

> **Sources:** `app/[locale]/servicos/[slug]/[subpage]/page.jsx:L5-L52`

## Diferenca entre Blog e Servicos

Embora ambos os sistemas sirvam conteudo dinamico com suporte a dois idiomas, diferem significativamente na fonte de dados e no mecanismo de cruzamento:

| Aspecto               | Blog (noticias)                        | Servicos                               |
|-----------------------|----------------------------------------|----------------------------------------|
| Fonte de dados        | Ficheiros MDX em `content/blog/<locale>/` | Mensagens i18n via `next-intl`        |
| Cruzamento de idioma  | `getSlugById(otherLocale, id)` em `lib/mdx.jsx` | `getMessages({ locale: otherLocale })` + `find by id` |
| Renderizacao do corpo | Markdown -> HTML via `remark`          | Campos estruturados (titulo, descricao) |
| Subpaginas            | Nao aplicavel                          | Array `subpages` com routing `[subpage]` |
| Profundidade de URL   | Dois niveis: `/noticias/[slug]`        | Tres niveis: `/servicos/[slug]/[subpage]` |

> **Sources:** `app/[locale]/servicos/[slug]/page.jsx:L1-L57` · `app/[locale]/noticias/[slug]/page.jsx:L1-L109`

## Routing e Convencoes de URL

Os paths de URL para servicos variam por locale a nivel do segmento pai:
- Portugues: `/pt/servicos/<slug-pt>` e `/pt/servicos/<slug-pt>/<subpage-pt>`
- Ingles: `/en/services/<slug-en>` e `/en/services/<slug-en>/<subpage-en>`

Esta diferenca (servicos vs services) e gerida pela configuracao de i18n do `next-intl`, nao pelos ficheiros de pagina. Os ficheiros de pagina apenas constroem os paths correctos por idioma ao preparar os `uris` para o `MenuConfigClient`.

```mermaid
graph TB
    subgraph "Estrutura de Routing"
        L["[locale]"]
        S["servicos / services"]
        SL["[slug]"]
        SP["[subpage]"]
        L --> S
        S --> SL
        SL --> SP
    end
    subgraph "Fonte de Dados"
        MSG["messages.projects.projetos.all"]
        SVC["service { id, slug, seo, subpages }"]
        SUB["subpage { id, slug, seo }"]
        MSG --> SVC
        SVC --> SUB
    end
    SL -- "find by slug" --> SVC
    SP -- "find by slug" --> SUB
```

> **Sources:** `app/[locale]/servicos/[slug]/page.jsx:L28-L42` · `app/[locale]/servicos/[slug]/[subpage]/page.jsx:L31-L46`

---
*[[index|← Back to Index]] · Generated by repowiki*
