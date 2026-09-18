# 🍕 Pizzarte — Website (Next.js 16)

Site do restaurante Pizzarte (Aveiro, desde 1989). Migrado de Gatsby 5 para Next.js 16 App Router em 2026-09 — ver `git log` a partir do commit `chore: sanear base do starter` para o histórico completo da migração, fase a fase.

4 idiomas: pt (default, sem prefixo), en, fr, es.

## 📁 Estrutura do Projeto

- `app/[locale]/`: rotas — `/`, `/menu`, `/menu/[slug]`, `/pizzarte`, `/galeria`, `/contactos`
- `app/global-not-found.jsx`: 404 para URLs não correspondidas (raiz de `app/`, sem locale — ver comentário no ficheiro antes de mexer)
- `app/[locale]/not-found.jsx`: 404 para `notFound()` chamado dentro de uma rota já resolvida (sabe o locale)
- `components/`: organizados por domínio Gatsby original (`about/`, `header/`, `footer/`, `menu/`, `chess/`, `contact/`, `animation/`, `popup/`, `layout/`) — cada componente fundiu a versão desktop+mobile antiga num só, responsivo via CSS (`components/style/style.js` — breakpoint `l` = 1024px)
- `i18n/`: `routing.jsx` (locales, pathnames, `MENU_CATEGORY_SLUGS`), `navLinks.js` (traduz links canónicos), `request.jsx`, `navigation.jsx`
- `messages/{pt,en,fr,es}/{home,menu,pizzarte,contact}.json`: todo o conteúdo do site (não há CMS)
- `public/images/`: imagens locais, indexadas por `scripts/build-image-manifest.mjs` → `lib/imageManifest.json` (gerado, não commitado — corre em `predev`/`prebuild`)
- `public/video/`, `public/pdf/`: vídeo/poster da homepage, documentos legais
- `content/gallery.json` + `public/images/galeria/`: fotos da galeria, extraídas uma vez do WordPress (`scripts/fetch-gallery.mjs`) — **já não há dependência de WordPress em runtime**
- `lib/jsonld.js`: builders de JSON-LD (Restaurant, Menu, Organization, WebSite, BreadcrumbList, FAQPage)
- `hooks/useGsapEffect.jsx`, `hooks/useAnimeEffect.jsx`: importam gsap/anime.js dentro do efeito (nunca no import de topo) — essas libs lêem `Date.now()` ao carregar, o que rebenta o prerender estático do Next 16/PPR se o módulo for avaliado no servidor
- `components/layout/ClientOnly.jsx`: usado só à volta de `<Swiper>` (BarDrinks, FoodSlider, PizzarteInfo) pelo mesmo motivo — Swiper lê `Date.now()` no próprio render, não só em efeitos

## 🛠️ Regras de Desenvolvimento

1. **`.repowiki/`** — regenerado em 2026-09-18 (7 secções, 17 páginas, `.repowiki/index.md` como entrada). Pode ser usado como fonte de contexto adicional, mas este ficheiro e o código real continuam a ser a fonte de verdade em caso de divergência. Regenerar com `/repowiki --update` depois de mudanças estruturais relevantes.
2. **i18n Strict:** usar sempre `@/i18n/navigation` (Link, useRouter, getPathname) ou `i18n/navLinks.js` (`translateNavLink`) para qualquer link interno — nunca `next/link` com caminho fixo.
3. **Imagens:** todo o conteúdo visual novo vai para `public/images/`, referenciado via `components/layout/Image.jsx` (`src` relativo, `alt` obrigatório). Correr `node scripts/build-image-manifest.mjs` depois de adicionar imagens (ou `npm run dev`/`build`, que já o fazem).
4. **Categorias de menu:** slugs traduzidos vivem em `i18n/routing.jsx` (`MENU_CATEGORY_SLUGS`) — mudar uma categoria implica atualizar lá, em `messages/*/menu.json` e, se o slug canónico mudar, em `lib/legacyMenuRedirects.js`.
5. **Sem formulário de reservas/contacto** — foi removido intencionalmente na migração (não existe no site atual). Não recriar sem pedido explícito.

## 🕒 Migração Gatsby → Next (2026-09)

Ver `git log --oneline` no branch da migração para as 7 fases (saneamento, i18n, imagens, componentes, rotas). Decisões chave: 4 locales mantidos, styled-components mantido, galeria movida do WordPress para local, Vercel como alvo de deploy, formulário de reservas não migrado (não existia em produção).
