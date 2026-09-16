---
tags: [seo, overview, fundamentos, algoritmo]
description: Como o SEO funciona — rastreamento, indexação e ranking
created: 2026-06-09
---

# SEO — Overview

> [!abstract] **Definição**
> SEO (Search Engine Optimization) é o conjunto de práticas técnicas, de conteúdo e de autoridade que permitem a um site aparecer nos primeiros resultados de motores de pesquisa para termos relevantes ao seu negócio.

---

## Como o Motor de Pesquisa Funciona

O processo tem sempre três fases sequenciais:

```mermaid
graph TD
    subgraph FASE1["🕷️ Fase 1 — Rastreamento"]
        R1[Googlebot visita URLs conhecidas]
        R2[Segue links internos e externos]
        R3[Descobre novas páginas]
        R1 --> R2 --> R3
    end

    subgraph FASE2["📦 Fase 2 — Indexação"]
        I1[Analisa texto, imagens e estrutura]
        I2[Decide se a página merece ser indexada]
        I3[Armazena na base de dados do Google]
        I1 --> I2 --> I3
    end

    subgraph FASE3["🏆 Fase 3 — Ranking"]
        RA1[Utilizador faz pesquisa]
        RA2[Algoritmo avalia 200+ sinais]
        RA3[Ordena resultados por relevância]
        RA4[Apresenta na SERP]
        RA1 --> RA2 --> RA3 --> RA4
    end

    FASE1 --> FASE2 --> FASE3

    style FASE1 fill:#e3f2fd,stroke:#1976D2
    style FASE2 fill:#f3e5f5,stroke:#7B1FA2
    style FASE3 fill:#e8f5e9,stroke:#388E3C
```

---

## Os 3 Pilares do SEO

```mermaid
graph LR
    subgraph TECNICO["🔧 SEO Técnico"]
        T1[Rastreamento sem barreiras]
        T2[Indexação correta]
        T3[Performance e velocidade]
        T4[Mobile-first]
        T5[Robots.txt e Sitemap]
    end

    subgraph ONPAGE["📝 SEO On-Page"]
        O1[Palavras-chave relevantes]
        O2[Títulos e H1-H6]
        O3[Meta description]
        O4[Conteúdo de qualidade]
        O5[Dados estruturados]
        O6[Links internos]
    end

    subgraph OFFPAGE["🌐 SEO Off-Page"]
        P1[Backlinks de qualidade]
        P2[Autoridade de domínio]
        P3[Menções e citações]
        P4[Sinais sociais]
        P5[PR digital]
    end

    TECNICO & ONPAGE & OFFPAGE --> RANKING([🏆 Ranking no Google])

    style TECNICO fill:#e3f2fd,stroke:#1976D2
    style ONPAGE fill:#fff3e0,stroke:#F57C00
    style OFFPAGE fill:#e8f5e9,stroke:#388E3C
    style RANKING fill:#1a237e,color:white,stroke:#0d47a1
```

---

## Taxonomia do SEO

A forma como o conteúdo é organizado em categorias, subcategorias, tags e relacionamentos entre páginas. É a lógica interna do site.

### Por que a taxonomia importa

| Beneficiário | Como ajuda |
|-------------|-----------|
| **Google / Bing** | Entende o contexto e hierarquia das páginas |
| **LLMs (ChatGPT, etc.)** | Mapeia entidades e relações temáticas |
| **Utilizadores** | Navegação clara, menos cliques para chegar ao destino |
| **AEO** | Facilita Answer Engine Optimization — snippets diretos |
| **Crawlers** | Caminhos claros para rastreamento eficiente |

### Modelo Hub-Cluster

```mermaid
graph TD
    HUB([🎯 Hub Page Marketing Digital]) --> C1[Cluster: SEO]
    HUB --> C2[Cluster: Redes Sociais]
    HUB --> C3[Cluster: Email Marketing]
    HUB --> C4[Cluster: PPC]

    C1 --> SC1A[SEO Técnico]
    C1 --> SC1B[Link Building]
    C1 --> SC1C[SEO Local]

    C2 --> SC2A[Instagram]
    C2 --> SC2B[LinkedIn]

    SC1A & SC1B & SC1C -.->|Link interno| HUB
    SC2A & SC2B -.->|Link interno| HUB

    style HUB fill:#1976D2,color:white
    style C1 fill:#42A5F5,color:white
    style C2 fill:#42A5F5,color:white
    style C3 fill:#42A5F5,color:white
    style C4 fill:#42A5F5,color:white
```

> [!tip] **Hub-Cluster em prática**
> A Hub Page é o artigo principal que responde à questão mais ampla. Os Clusters são artigos mais específicos que linkam de volta para o hub. Isso **aumenta a autoridade temática** da hub page.

---

## Estratégia de Conteúdo SEO

### Os 3 tipos de conteúdo

```mermaid
graph LR
    subgraph EVERGREEN["🌲 Evergreen"]
        E1["O que é SEO?"]
        E2["Como criar um site WordPress"]
        E3["Guia de Email Marketing"]
        E4[Não depende da data Sempre relevante]
    end

    subgraph ATUALIZADO["🔄 Atualizado"]
        A1["Melhores ferramentas SEO 2025"]
        A2["Tendências marketing digital"]
        A3[Precisa de revisão periódica Mantém freshness]
    end

    subgraph SAZONAL["📅 Sazonal"]
        S1["Black Friday — guia de compras"]
        S2["Natal — ideias de presentes"]
        S3[Picos sazonais de tráfego Planejado com antecedência]
    end

    style EVERGREEN fill:#e8f5e9,stroke:#388E3C
    style ATUALIZADO fill:#e3f2fd,stroke:#1976D2
    style SAZONAL fill:#fff3e0,stroke:#F57C00
```

---

## Sinais de Ranking (Principais)

| Categoria | Sinal | Peso aproximado |
|-----------|-------|-----------------|
| **Relevância** | Keyword no título, H1, URL | Alto |
| **Autoridade** | Domain Rating, backlinks de qualidade | Alto |
| **Qualidade** | E-E-A-T, originalidade, profundidade | Alto |
| **Experiência** | Core Web Vitals, bounce rate, dwell time | Médio-Alto |
| **Técnico** | Mobile-friendly, HTTPS, velocidade | Médio |
| **Freshness** | Data de atualização, frequência de publicação | Médio (por tema) |
| **Intenção** | Match com a intenção de pesquisa | Alto |
| **Dados estruturados** | Schema markup correto | Médio |

---

## O que NÃO fazer em SEO

> [!danger] **Práticas de Black Hat — penalizam o site**
> - Keyword stuffing (repetir keywords de forma não natural)
> - Link farms e PBNs (Private Blog Networks)
> - Conteúdo copiado ou duplicado
> - Cloaking (mostrar conteúdo diferente ao Google e ao utilizador)
> - Textos ocultos (cor igual ao fundo, font-size 0)
> - Comprar links em massa sem contexto

---

## Ferramentas Essenciais SEO

| Ferramenta | Função | Tipo |
|------------|--------|------|
| **Google Search Console** | Monitorizar performance, erros, indexação | Gratuito |
| **Google Analytics 4** | Tráfego, comportamento, conversões | Gratuito |
| **Ahrefs / SEMrush** | Análise de backlinks, keywords, concorrentes | Pago |
| **Screaming Frog** | Auditoria técnica do site | Freemium |
| **PageSpeed Insights** | Core Web Vitals e performance | Gratuito |
| **Google Rich Results Test** | Validar Schema markup | Gratuito |

---

## Ver também

- [[SEO Técnico]] — aprofundamento técnico
- [[Arquitetura e Estrutura da Página]] — estrutura e URLs
- [[Indexação]] — controlar o que é indexado
- [[Performance Técnica]] — Core Web Vitals
- [[Robots e Sitemap]] — ficheiros de controlo
- [[Conteúdo e Taxonomia]] — estratégia de conteúdo
