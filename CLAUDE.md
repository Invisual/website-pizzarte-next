# 🏗️ Projeto Belone (Next.js 16 Starter)

Este repositório é um template avançado para sites de marketing e conteúdo, focado em performance, animações e internacionalização (i18n).

## 📁 Estrutura do Projeto

*   `app/[locale]/`: Raiz da aplicação localizada. Contém layouts, páginas e rotas dinâmicas.
*   `.repowiki/`: **Fonte de Verdade.** Contém toda a documentação técnica (API, Arquitetura, SEO, etc.).
*   `components/`: Componentes React organizados por domínio (ex: `news/`).
*   `content/blog/`: Artigos de notícias em formato MDX, separados por idioma.
*   `i18n/`: Configurações centrais do `next-intl` (routing, navigation, requests).
*   `messages/`: Ficheiros JSON de tradução.
*   `lib/`: Lógica de servidor para MDX, cache e configuração de menu.
*   `utils/`: Providers de contexto e hooks utilitários.
*   `public/`: Assets estáticos e ficheiro `llms.txt` para AIO.

## 🛠️ Regras de Desenvolvimento

1.  **Wiki First:** Qualquer implementação deve ser precedida pela leitura da documentação em `.repowiki/`.
2.  **claude.md Local:** Sempre que trabalhar num slug dinâmico (ex: `app/[locale]/servicos/[slug]`), atualize ou crie o ficheiro `claude.md` no diretório correspondente.
3.  **i18n Strict:** Use sempre os utilitários de `@/i18n/navigation` (Link, useRouter) para garantir a consistência do locale.

## 🕒 Histórico de Modificações Relevantes

*   **Setup Inicial:** Configuração do Next.js 16 com App Router e PPR (Partial Prerendering).
*   **Internacionalização:** Implementação completa de `next-intl` com pathnames traduzidos e prefixo opcional para o idioma padrão (PT).
*   **Gestão de Conteúdo:** Sistema híbrido de MDX para blog e mensagens JSON para páginas de serviços.
*   **APIs:** Handlers para subscrição de Newsletter (Mailchimp) e formulário de Contacto (SMTP/Nodemailer).
*   **Wiki:** Documentação exaustiva de todos os subsistemas em `.repowiki/`.

---
Consulte `@AGENTS.md` para diretrizes específicas de comportamento de IA.
