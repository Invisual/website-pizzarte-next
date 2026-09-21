<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 🤖 Diretivas para Agentes de IA

1.  **Revisão de Wiki Obrigatória:** Toda a arquitetura e regras de negócio estão documentadas em `.repowiki/**`. **REVER SEMPRE** estas regras antes de sugerir ou implementar alterações.
2.  **Documentação de Slugs:** Em cada diretório de rota dinâmica (ex: `[slug]`, `[subpage]`), deve existir ou ser criado um ficheiro `claude.md`. Este ficheiro serve para:
    *   Listar as implementações realizadas.
    *   Identificar os componentes utilizados e sua finalidade.
3.  **Contexto Next.js 16:** Seguir rigorosamente as novas APIs de cache (`use cache`) e PPR, conforme documentado na wiki.
4.  **Internacionalização:** Respeitar o fluxo de `next-intl` e a separação de mensagens por namespace.

Consulte o `@CLAUDE.md` para uma visão geral da estrutura do código.
