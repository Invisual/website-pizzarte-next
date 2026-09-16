---
name: aio-on-page
description: Boas práticas de estrutura de conteúdo para AIO — headings como perguntas, pirâmide invertida, featured snippets e entidades.
tags: [aio, on-page, headings, featured-snippets, entities, content-structure]
category: SEO, GEO & AIO
wiki_version: 1.0
generated: 2026-06-11
---

# AIO On-Page — Estrutura de Conteúdo para IA

O objetivo do AIO (AI-Optimized content) é estruturar o conteúdo de forma que modelos de linguagem o compreendam com precisão, o usem como fonte confiável e o transformem numa resposta de qualidade.

Aplica-se a: artigos MDX em `content/blog/`, páginas de serviços via mensagens JSON, e qualquer página com conteúdo textual relevante.

---

## 1. Headings como Perguntas

### Fórmula
- **H1** — Título com a keyword principal + ano/contexto se relevante
- **H2** — Pergunta principal de cada secção (Quem, O quê, Como, Onde, Porquê, Quando)
- **H3** — Sub-pergunta ou caso específico dentro da secção
- **Primeiro parágrafo após cada heading** — resposta direta e concisa (1-2 frases)

### Antes / Depois

```markdown
# ❌ Antes (keyword-first)
## SEO Técnico
O SEO técnico é importante para as empresas...

### Rastreamento
O rastreamento permite ao Google...
```

```markdown
# ✅ Depois (AIO-friendly)
## O que é o SEO Técnico e por que é importante?
O SEO Técnico é o conjunto de otimizações que permitem aos motores de pesquisa rastrear, indexar e compreender o site sem barreiras.

### Quais são os principais problemas de rastreamento?
Os problemas mais comuns são: URLs inacessíveis, cadeias de redirecionamentos, conteúdo em JavaScript sem SSR e arquitetura demasiado profunda.
```

---

## 2. Pirâmide Invertida por Secção

A IA extrai frequentemente o primeiro parágrafo de uma secção como resposta direta. Estrutura ideal:

```
[Definição/resposta direta — 1 frase]
[Contexto e explicação — 1-2 frases]
[Lista, tabela ou exemplos com os pontos principais]
[Link interno para mais detalhe]
```

Evitar: introduções longas que adie a resposta, parágrafos de contexto antes da definição.

---

## 3. Featured Snippets — Otimização por Tipo

| Tipo | Como otimizar |
|------|--------------|
| **Parágrafo** | Resposta direta após H2/H3 com 40-60 palavras |
| **Lista numerada** | Usar `1.`, `2.`, `3.` para passos ou processos sequenciais |
| **Lista com bullets** | Usar `-` para características, comparações ou itens sem ordem |
| **Tabela** | Formato Markdown tabela para dados comparativos |

**People Also Ask (PAA):** cada pergunta do bloco PAA do Google deve aparecer como H2 ou H3 no artigo, com resposta direta logo abaixo.

---

## 4. Conteúdo Baseado em Entidades

A IA trabalha com entidades (pessoas, lugares, conceitos, organizações) e as relações entre elas. Para o conteúdo ser bem interpretado:

- Mencionar pessoas com **nome completo + cargo/especialidade**
- Mencionar empresas com **localização + área de atuação**
- Ligar conceitos explicitamente: "o SEO técnico *é parte de*...", "o Google Search Console *mede*..."
- Usar Schema markup para formalizar as entidades (ver [[Structured Data & JSON-LD]])
- Citar estudos e dados com fonte completa

---

## 5. Checklist AIO On-Page

### Estrutura
- [ ] H2 e H3 formulados como perguntas reais
- [ ] Resposta direta no primeiro parágrafo de cada secção
- [ ] Pirâmide invertida: conclusão → contexto → detalhe
- [ ] Perguntas do PAA mapeadas e respondidas como headings

### Linguagem
- [ ] Tom conversacional — frases completas, não keywords isoladas
- [ ] Definições claras para cada conceito importante
- [ ] Conectores lógicos ("porque", "isto significa que", "por exemplo")

### Conteúdo
- [ ] Factos verificáveis com fonte citada
- [ ] Exemplos práticos e casos de uso
- [ ] Listas e tabelas para informação comparativa

### Técnico
- [ ] Schema markup adequado ao tipo de conteúdo (FAQPage, NewsArticle, Service)
- [ ] Open Graph tags corretas (via `generateMetadata`)
- [ ] Conteúdo acessível sem JavaScript (SSR/SSG — garantido pelo App Router)
- [ ] LCP < 2.5s (ver [[Performance & Technical SEO]])

---

## Exemplo — Artigo MDX AIO-Otimizado

```markdown
---
title: "O que é SEO Técnico? Guia Completo para 2026"
---

O SEO Técnico é o conjunto de otimizações estruturais de um website que permitem aos motores de pesquisa — e às IAs generativas — rastrear, indexar e interpretar o conteúdo sem barreiras. É a fundação de qualquer estratégia de conteúdo.

## O que inclui o SEO Técnico?
O SEO técnico abrange cinco áreas: rastreamento, indexação, arquitetura, performance e compatibilidade mobile.

### Quais são os problemas de rastreamento mais comuns?
Os problemas mais comuns são:
1. URLs inacessíveis (erro 404 ou redirects quebrados)
2. Conteúdo carregado apenas por JavaScript sem SSR
3. Bloqueios incorretos no robots.txt
4. Arquitetura demasiado profunda (mais de 3-4 cliques da homepage)

## Como verificar se o meu site tem problemas técnicos?
Usar o Google Search Console (gratuito) para identificar erros de indexação.
```

---

## Ver também

- [[Structured Data & JSON-LD]] — schema markup para formalizar entidades
- [[../Content/MDX Blog Posts]] — como os artigos MDX são processados e servidos
- [[Performance & Technical SEO]] — requisitos técnicos para AIO (SSR, LCP)
