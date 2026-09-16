---
tags: [seo, rastreamento, crawling, googlebot, urls, javascript]
description: Problemas de rastreamento e como o Googlebot percorre o site
created: 2026-06-09
---

# Rastreamento (Crawling)

> [!abstract] **O que é o rastreamento**
> O rastreamento é o processo em que o Googlebot (e outros crawlers) percorrem o site, seguindo links de página em página, para descobrir todo o conteúdo existente. Sem rastreamento, não há indexação. Sem indexação, não há ranking.

---

## Como o Googlebot Rastreia

```mermaid
graph TD
    START([Googlebot começa]) --> QUEUE["Fila de URLs conhecidas (sitemap, links externos, histórico)"]
    QUEUE --> FETCH["Busca a URL (verifica robots.txt primeiro)"]
    FETCH --> BLOCKED{robots.txt bloquia?}
    BLOCKED -->|Sim| SKIP([Ignora a URL])
    BLOCKED -->|Não| RENDER["Renderiza a página (pode demorar horas/dias para JS)"]
    RENDER --> EXTRACT["Extrai: - Texto e conteúdo - Links internos e externos - Meta tags - Dados estruturados"]
    EXTRACT --> NEWURLS["Adiciona novos links à fila de rastreamento"]
    EXTRACT --> INDEX["Envia para indexação"]
    NEWURLS --> QUEUE

    style START fill:#4CAF50,color:white
    style SKIP fill:#f44336,color:white
    style INDEX fill:#2196F3,color:white
```

---

## Problemas de Rastreamento — Diagnóstico

### Os 6 Problemas Mais Comuns

| Problema | Sintoma | Diagnóstico | Solução |
|----------|---------|-------------|---------|
| **URLs inacessíveis** | Erros 404 no GSC | GSC → Cobertura → Erros | Corrigir URLs ou redirecionar 301 |
| **Cadeia de redirecionamentos** | Lentidão, perda de PageRank | Screaming Frog → Redirects | Redirect direto A→D |
| **Conteúdo só em JavaScript** | Páginas no GSC sem conteúdo | GSC → Inspecionar URL → Renderização | Implementar SSR/SSG |
| **Arquitetura profunda** | Páginas nunca rastreadas | Análise de depth com Screaming Frog | Reestruturar e adicionar links internos |
| **Robots.txt mal configurado** | Páginas bloqueadas | GSC → robots.txt tester | Corrigir o ficheiro robots.txt |
| **Budget de rastreamento esgotado** | Apenas parte do site rastreada | GSC → Estatísticas de rastreamento | Otimizar robots.txt, sitemap, eliminar duplicados |

---

## Crawl Budget

> [!info] **O que é Crawl Budget**
> O Googlebot tem um limite de páginas que visita por dia num site — o "orçamento de rastreamento". Sites grandes (mais de 10.000 páginas) precisam de gerir este budget ativamente.

### O que desperdiça crawl budget

```mermaid
graph LR
    WASTE["❌ Desperdício de Crawl Budget"] --> W1["URLs com parâmetros /produto?cor=azul&tamanho=L&page=1"]
    WASTE --> W2["Conteúdo duplicado Mesma página em múltiplos URLs"]
    WASTE --> W3["Páginas de baixa qualidade Thin content ou páginas vazias"]
    WASTE --> W4["Redirects em cadeia A→B→C→D"]
    WASTE --> W5["Links para erros 404 Links que não funcionam"]
    WASTE --> W6["Faceted navigation Filtros de e-commerce sem controlo"]

    style WASTE fill:#f44336,color:white
```

### Como otimizar o crawl budget

- Bloquear URLs de parâmetros no robots.txt
- Consolidar conteúdo duplicado com canonical
- Eliminar páginas de thin content ou noindex nelas
- Corrigir redirects para serem diretos
- Submeter sitemap apenas com páginas relevantes

---

## JavaScript e Rastreamento

```mermaid
sequenceDiagram
    participant G as Googlebot
    participant S as Servidor
    participant J as JavaScript Engine

    G->>S: Pedido da URL
    S-->>G: HTML inicial (sem JS executado)
    G->>G: Indexa o que está no HTML inicial

    Note over G,J: Segundo passe (pode demorar dias!)
    G->>J: Executa JavaScript
    J-->>G: HTML completo com JS
    G->>G: Atualiza índice com conteúdo JS
    
    Note over G: Se o conteúdo só existe após JS executar, o primeiro passe vê página vazia!
```

### Conteúdo JavaScript — o que fazer

| Tipo de conteúdo | Abordagem |
|-----------------|-----------|
| **Conteúdo crítico** (texto, headings, links principais) | SSR — servir no HTML inicial |
| **Conteúdo de suporte** (comentários, reviews) | Pode ser carregado com JS, com fallback |
| **Funcionalidades interativas** (filtros, tabs) | JS aceitável, garantir que conteúdo base está no HTML |
| **Carrosséis** | Imagem inicial no HTML, resto carregado com JS |

---

## Arquitetura Ideal para Rastreamento

### Regra dos 3 cliques

```mermaid
graph TD
    HP["🏠 Homepage (Nível 0)"] --> C1["📁 Categoria A (Nível 1 — 1 clique)"]
    HP --> C2["📁 Categoria B (Nível 1 — 1 clique)"]
    
    C1 --> SC1["📄 Artigo 1 (Nível 2 — 2 cliques)"]
    C1 --> SC2["📄 Artigo 2 (Nível 2 — 2 cliques)"]
    
    C2 --> SC3["📄 Artigo 3 (Nível 2 — 2 cliques)"]
    
    SC1 --> DEEP["📄 Subpage (Nível 3 — 3 cliques máximo)"]

    PROBLEMA["❌ Nível 4+ Dificilmente rastreado"] 

    style HP fill:#1976D2,color:white
    style PROBLEMA fill:#f44336,color:white
```

### Links internos — aceleradores de rastreamento

> [!tip] **Links internos são "estradas" para o Googlebot**
> Cada link interno é um caminho que o Googlebot pode seguir. Páginas importantes devem ter **muitos links internos** a apontar para elas — tanto da homepage como de outras páginas relevantes.

---

## Verificar o Rastreamento no GSC

### Google Search Console — onde encontrar

1. **Erros de rastreamento:** GSC → Cobertura → separador "Erros"
2. **URLs bloqueadas:** GSC → Cobertura → separador "Excluídas"
3. **Estatísticas de rastreamento:** GSC → Configurações → Estatísticas de rastreamento
4. **Teste de robots.txt:** GSC → Ferramentas de inspeção de URLs → Testar robots.txt
5. **Inspecionar URL específica:** GSC → Inspecionar URL → Ver renderização

---

## Checklist de Rastreamento

- [ ] Google Search Console sem erros de rastreamento críticos
- [ ] robots.txt não bloqueia CSS, JS ou conteúdo importante
- [ ] Conteúdo crítico visível no HTML sem JavaScript
- [ ] Máximo 3-4 cliques da homepage para qualquer página
- [ ] Sem cadeias de redirects (A→B→C)
- [ ] Sem páginas orfãs (todas têm links internos)
- [ ] Sitemap.xml submetido no GSC
- [ ] URLs com parâmetros bloqueadas ou com canonical

---

## Ver também

- [[SEO Técnico]] — visão geral do SEO técnico
- [[Indexação]] — o que acontece depois do rastreamento
- [[Robots e Sitemap]] — controlo do rastreamento
- [[Arquitetura e Estrutura da Página]] — estrutura que facilita o rastreamento
