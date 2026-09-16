---
tags: [seo, conteúdo, taxonomia, keywords, evergreen, estratégia]
description: Estratégia de conteúdo SEO — taxonomia, palavras-chave, conteúdo evergreen e on-page optimization
created: 2026-06-09
---

# Conteúdo e Taxonomia

> [!abstract] **Princípio fundamental**
> Conteúdo de qualidade para SEO é aquele que satisfaz a **intenção de pesquisa** do utilizador, responde completamente à sua questão e é estruturado de forma que tanto humanos como máquinas o compreendam facilmente.

---

## Taxonomia de Conteúdo

A taxonomia define **como o conteúdo é organizado** em categorias, subcategorias, tags e relações entre páginas.

### Estrutura Hierárquica

```mermaid
graph TD
    SITE["🌐 agencia.pt"] --> BLOG["📝 /blog"]
    SITE --> SERVICOS["🛠️ /servicos"]
    SITE --> CASOS["📊 /casos-de-estudo"]

    BLOG --> CAT_SEO["📁 /blog/seo"]
    BLOG --> CAT_GEO["📁 /blog/geo"]
    BLOG --> CAT_SOCIAL["📁 /blog/redes-sociais"]

    CAT_SEO --> A1["📄 /blog/seo/guia-seo-tecnico"]
    CAT_SEO --> A2["📄 /blog/seo/link-building"]
    CAT_SEO --> A3["📄 /blog/seo/keyword-research"]

    SERVICOS --> SV1["📄 /servicos/seo"]
    SERVICOS --> SV2["📄 /servicos/geo"]
    SERVICOS --> SV3["📄 /servicos/ppc"]

    style SITE fill:#1976D2,color:white
    style BLOG fill:#42A5F5,color:white
    style SERVICOS fill:#42A5F5,color:white
    style CASOS fill:#42A5F5,color:white
```

### Por que a taxonomia importa

| Benefício | Impacto em SEO | Impacto em AIO/GEO |
|-----------|---------------|-------------------|
| Organização clara | Caminhos óbvios para o crawler | IA entende o grafo de conhecimento do site |
| URLs lógicas | Keyword no URL = sinal de relevância | Entidade bem definida por pasta/categoria |
| Breadcrumbs | Rich result no SERP | Contexto hierárquico para a IA |
| Links internos | Distribui PageRank | Fortifica autoridade temática |
| Conteúdo agrupado | Autoridade de tema | Especialização semântica reconhecida |

---

## Tipos de Conteúdo

### 1. Conteúdo Evergreen

> Conteúdo que **não expira** — não depende da data e continua relevante ao longo do tempo.

```mermaid
graph LR
    E["🌲 Evergreen 'O que é SEO?'"] -->|Tráfego consistente| VALOR[Alto valor a longo prazo]
    A["📰 Atualizado 'Melhores ferramentas 2026'"] -->|Precisa revisão anual| VALOR2[Bom com manutenção]
    S["📅 Sazonal 'Black Friday 2026'"] -->|Pico e queda| VALOR3[Alto no momento certo]

    style E fill:#e8f5e9,stroke:#388E3C
    style A fill:#e3f2fd,stroke:#1976D2
    style S fill:#fff3e0,stroke:#F57C00
```

**Exemplos de evergreen:**
- "O que é [conceito]?"
- "Como fazer [tarefa]?"
- "Guia completo de [tema]"
- "Diferença entre X e Y"

**Exemplos não-evergreen:**
- "Melhores ferramentas de 2024"
- "Novidades Google de julho"
- "Promoção de verão"

### 2. Mix de Conteúdo Recomendado

| Tipo | % do plano de conteúdo | Objetivo |
|------|----------------------|----------|
| **Evergreen** | 60-70% | Tráfego orgânico a longo prazo |
| **Atualizado periodicamente** | 20-30% | Manter freshness e relevância |
| **Sazonal** | 10% | Capitalizar picos de procura |

---

## Pesquisa de Palavras-Chave

### Tipos de Keywords

| Tipo | Exemplo | Volume | Concorrência | Conversão |
|------|---------|--------|-------------|-----------|
| **Head (cauda curta)** | "SEO" | Muito alto | Muito alta | Baixa |
| **Meio** | "SEO para empresas" | Médio | Média | Média |
| **Cauda longa** | "como melhorar SEO site pequena empresa" | Baixo | Baixa | Alta |
| **Conversacional/IA** | "Qual a melhor agência SEO para PMEs em Portugal?" | Crescente | Baixa | Alta |

> [!tip] **Em 2026, priorizar cauda longa e conversacional**
> Com a ascensão das IAs, as pesquisas conversacionais cresceram exponencialmente. Conteúdo que responde perguntas completas captura tanto o SEO como o AIO.

### Intenção de Pesquisa

```mermaid
graph TD
    PESQUISA([Pesquisa do utilizador]) --> INTENCAO{Qual é a intenção?}
    
    INTENCAO -->|"O que é...?"| INFO[Informacional Responder com guia/artigo]
    INTENCAO -->|"Melhor X para Y"| INVEST[Investigação comercial Comparativos, reviews]
    INTENCAO -->|"Comprar X"| TRANS[Transacional Página de produto/serviço]
    INTENCAO -->|"Site da empresa X"| NAV[Navegacional Homepage ou página específica]

    style INFO fill:#e3f2fd,stroke:#1976D2
    style INVEST fill:#fff3e0,stroke:#F57C00
    style TRANS fill:#e8f5e9,stroke:#388E3C
    style NAV fill:#f3e5f5,stroke:#7B1FA2
```

### Erros comuns de intenção

| Erro | Exemplo | Consequência |
|------|---------|-------------|
| Conteúdo informacional em página transacional | Artigo num produto | Alta bounce rate |
| Página de produto para pesquisa informacional | "O que é SEO" → página de serviço | Não rankeia |
| Ignorar intenção local | "agência SEO" sem geolocalização | Perde tráfego local |

---

## Otimização On-Page

### Checklist de On-Page SEO

```mermaid
graph TD
    P([Página a otimizar]) --> T[Title Tag]
    P --> M[Meta Description]
    P --> H[Headings H1-H6]
    P --> C[Corpo do Conteúdo]
    P --> I[Imagens]
    P --> U[URL]
    P --> L[Links Internos]
    P --> S[Schema Markup]

    T --> T1["✅ 50-60 caracteres ✅ Keyword no início ✅ Único por página"]
    M --> M1["✅ 150-160 caracteres ✅ CTA incluído ✅ Keyword mencionada"]
    H --> H1["✅ 1 H1 por página ✅ H2-H3 como perguntas ✅ Keywords secundárias"]
    C --> C1["✅ Resposta direta no 1.º parágrafo ✅ Conteúdo aprofundado ✅ Linguagem natural"]
    I --> I1["✅ Alt text descritivo ✅ Formato WebP ✅ Nome do ficheiro com keyword"]
    U --> U1["✅ Curta e descritiva ✅ Keyword no slug ✅ Sem parâmetros"]
```

### Title Tag — Boas Práticas

| ✅ Boa Title Tag | ❌ Má Title Tag |
|-----------------|----------------|
| `SEO Técnico: Guia Completo para 2026 \| Agência` | `Página 1 - Blog` |
| `Como Melhorar o Ranking no Google em 5 Passos` | `SEO SEO SEO marketing digital agência Lisboa` |
| `Agência de Marketing Digital Lisboa \| Nome` | `Untitled Document` |
| `O que é GEO? Guia para Iniciantes` | `O que é Generative Engine Optimization ou GEO em 2025 e 2026 e como funciona na prática com IA e Google` |

> [!tip] **Fórmula de Title Tag**
> `Keyword Principal: Proposta de Valor | Nome da Marca`

---

## Conteúdo para AIO — Estrutura Ideal de Artigo

```markdown
# [Keyword Principal] — [Proposta de Valor] (H1)

[Parágrafo de abertura: resposta direta à questão principal em 2-3 frases]

## O que é [Tema]? (H2 — pergunta direta)
[Definição clara e concisa em 1 parágrafo]

## Como funciona [Tema]? (H2 — pergunta)
[Explicação com lista ou passos]

### Passo 1: [Ação concreta] (H3 — sub-pergunta)
[Detalhe acionável]

## Quais são os benefícios de [Tema]? (H2 — pergunta)
[Lista com bullet points]

## [Tema] vs [Alternativa]: qual escolher? (H2 — comparação)
[Tabela comparativa]

## Conclusão (H2)
[Resumo + CTA]
```

---

## Checklist Completo de Conteúdo

### Pesquisa
- [ ] Keyword principal definida
- [ ] Intenção de pesquisa identificada
- [ ] Top 10 concorrentes analisados
- [ ] Perguntas do PAA mapeadas
- [ ] Palavras-chave LSI (relacionadas) identificadas

### On-Page
- [ ] Title tag 50-60 caracteres com keyword
- [ ] Meta description 150-160 caracteres com CTA
- [ ] H1 único com keyword principal
- [ ] H2/H3 como perguntas (AIO)
- [ ] Conteúdo responde completamente à intenção
- [ ] Imagens com alt text descritivo
- [ ] Links internos para hub e clusters relacionados
- [ ] Schema markup adequado ao tipo de conteúdo

---

## Ver também

- [[Arquitetura e Estrutura da Página]] — estrutura e hierarquia
- [[../03 - AIO/Otimização On-Page para IA|Otimização On-Page para IA]] — AIO em detalhe
- [[../06 - Tipos de Busca/Intenção de Busca|Intenção de Busca]] — tipos de intenção aprofundados
- [[../05 - Dados Estruturados/Dados Estruturados - Overview|Dados Estruturados]] — schema para artigos
