---
tags: [geo, off-page, backlinks, link-building, menções, reputação]
description: Off-page SEO e backlinks na era do GEO — como as IAs interpretam links e menções
created: 2026-06-09
---

# Off-Page e Backlinks

> [!abstract] **Definição**
> Off-page SEO é tudo o que acontece **fora do teu site** mas que influencia a tua autoridade, reputação e ranking — tanto em motores de pesquisa tradicionais como em IAs generativas.

---

## O que é o Off-Page

```mermaid
mindmap
  root((Off-Page))
    Backlinks
      Links de outros sites
      Texto âncora
      Contexto do link
    Menções
      Com ou sem link
      Em artigos e notícias
      Em fóruns e comunidades
    PR Digital
      Press releases
      Entrevistas
      Guest posts
    Sinais Sociais
      Partilhas
      Engagement
      Perfis verificados
    Entidades
      Citações em IA
      Diretórios de nicho
      Wikipedia e Wikidata
    Reputação
      Reviews Google
      Trustpilot
      Perfil de imprensa
```

---

## Métricas de Off-Page Essenciais

| Métrica | O que mede | Ferramenta |
|---------|-----------|-----------|
| **Domain Rating (DR)** | Força do perfil de backlinks (0-100) | Ahrefs |
| **Domain Authority (DA)** | Autoridade do domínio (0-100) | Moz |
| **Referring Domains** | Número de domínios únicos a linkar | Ahrefs, SEMrush |
| **Âncoras** | Texto dos links que apontam para o site | Ahrefs |
| **Relevance Fit** | Relevância temática dos sites que linkam | Análise manual |
| **Trust Score** | Qualidade editorial e histórico | Majestic |
| **Freshness** | Links recentes (últimos 3-6 meses) | Ahrefs |

---

## Backlinks na Era do GEO

### Como o Google vê os backlinks (SEO clássico)

```mermaid
graph LR
    SITE_A["Site A\n(alta DA)"] -->|Link para| SITE_B["Teu Site"]
    SITE_A -->|"Transfere autoridade (PageRank)"| SITE_B
    
    subgraph AVALIACAO["Google avalia"]
        V1[DA do site que linka]
        V2[Relevância temática]
        V3[Posição no texto]
        V4[Naturalidade do link]
    end
```

### Como a LLM "vê" os backlinks

```mermaid
graph LR
    SITE_A["Artigo externo"] -->|"contém texto"| TEXTO["...segundo a [Empresa X],\nespecializada em SEO há 10 anos, a melhor abordagem é..."]
    TEXTO -->|"IA lê o contexto"| LLM["LLM aprende que Empresa X = autoridade em SEO"]
    LLM --> RESP["Quando perguntada sobre SEO, cita Empresa X"]
```

> [!important] **A mudança fundamental**
> Para a IA, **não importa o link** — importa o **contexto em volta do link**.
> - Link sem contexto útil = zero impacto na IA
> - Menção rica sem link = impacto positivo na IA
> - **Link building moderno = context building**

---

## Qualidade dos Backlinks

### Alta qualidade vs Baixa qualidade

| Alta Qualidade ✅ | Baixa Qualidade ❌ |
|------------------|------------------|
| Sites relevantes ao tema | Diretórios genéricos |
| Conteúdo editorial, não pago | Sites de guest post em massa |
| Link contextual no corpo do texto | Blog artificial ou PBN |
| Âncora natural e variada | Redes privadas de blogs (PBN) |
| Páginas bem posicionadas no Google | Links empilhados sem contexto |
| Entidade confiável (publicação, universidade) | Conteúdo irrelevante ao nicho |
| Diretórios de nicho (Reddit, GitHub, Academia) | Sites com spam ou baixa qualidade |
| Links de empresa em diretórios oficiais | Comentários e fóruns de spam |
| Menção em estudos e pesquisas | Footer links de templates |

---

## Tipos de Links e seu Valor

```mermaid
graph TD
    LINKS["Tipos de Links"] --> EDITORIAL["✅ Editorial O site decide linkar voluntariamente Maior valor — difícil de obter"]
    LINKS --> GUEST["⚠️ Guest Post Escrevemos, eles publicam Valor médio — depende da qualidade do site"]
    LINKS --> DIRETORIO["⚠️ Diretório Listagem em diretórios de nicho Valor baixo-médio — depende do diretório"]
    LINKS --> SOCIAL["ℹ️ Social / Forum Linkes em redes sociais e fóruns Pouco valor SEO, útil para GEO"]
    LINKS --> PBN["❌ PBN / Comprado Links artificiais e pagos Risco de penalização"]

    style EDITORIAL fill:#e8f5e9,stroke:#388E3C
    style GUEST fill:#fff3e0,stroke:#F57C00
    style DIRETORIO fill:#fff3e0,stroke:#F57C00
    style SOCIAL fill:#e3f2fd,stroke:#1976D2
    style PBN fill:#ffcdd2,stroke:#f44336
```

---

## Link Building / Digital PR

### Estratégias de Link Building legítimo

| Estratégia | Descrição | Dificuldade | Impacto GEO |
|-----------|-----------|-------------|-------------|
| **Newsjacking** | Comentar tendências noticiosas com expertise | Média | Alto |
| **Relatórios originais** | Publicar estudos com dados exclusivos | Alta | Máximo |
| **Conteúdo de dados** | Infográficos e visualizações com dados únicos | Alta | Alto |
| **Comentários especializados** | Responder a jornalistas como especialista (HARO) | Baixa | Muito alto |
| **Insight do setor** | Análises aprofundadas que outros citam | Média | Alto |
| **Guest Posts** | Artigos em publicações relevantes do setor | Média | Médio-Alto |
| **Parcerias** | Links recíprocos com parceiros não-concorrentes | Baixa | Médio |
| **Conteúdo linkable** | Recursos tão úteis que outros linkam naturalmente | Alta | Alto |

### O que é o Digital PR para GEO

```mermaid
graph TD
    DPR["Digital PR"] --> A["📰 Press Releases Notícias da empresa enviadas para media"]
    DPR --> B["🔬 Estudos e Pesquisas Dados originais que media cita"]
    DPR --> C["🎤 Comentários em Media Menção como especialista"]
    DPR --> D["🎙️ Podcasts e Entrevistas Menção em conteúdo áudio/vídeo"]
    DPR --> E["✍️ Op-Eds e Colunas Opiniões em publicações do setor"]

    A & B & C & D & E --> RESULT["Menções ricas contextuais = Autoridade semântica na IA"]

    style DPR fill:#388E3C,color:white
    style RESULT fill:#4CAF50,color:white
```

---

## Menções sem Link (Unlinked Mentions)

Para a IA, uma menção sem link pode ter **mais valor** do que um link sem contexto.

| Tipo de menção | Exemplo | Impacto IA |
|---------------|---------|-----------|
| **Menção simples** | "A empresa Exemplo faz SEO" | Baixo |
| **Menção com contexto** | "A Agência Exemplo, especializada em SEO há 10 anos" | Médio |
| **Menção como autoridade** | "Segundo a Agência Exemplo, líder em SEO em Portugal" | Alto |
| **Menção como fonte** | "Um estudo da Agência Exemplo revelou que..." | Muito alto |
| **Menção com dados** | "A Agência Exemplo analisou 500 sites e concluiu que..." | Máximo |

---

## Construir a Entidade Off-Page

### Os sinais que a IA usa para reconhecer uma entidade

```mermaid
graph LR
    ENTIDADE["🏢 Agência Exemplo (entidade)"] --> SCHEMA["📋 Schema.org/Organization no próprio site"]
    ENTIDADE --> GMB["📍 Google My Business\nficheiro completo"]
    ENTIDADE --> LINKEDIN["💼 LinkedIn Perfil da empresa verificado"]
    ENTIDADE --> MENCOES["📰 Menções em media 'segundo a Agência Exemplo...'"]
    ENTIDADE --> DIRS["📁 Diretórios de nicho Recomendações, Clutch, etc."]
    ENTIDADE --> WIKI["📚 Entradas wiki Wikipedia/Wikidata se elegível"]

    TODOS -->  IA["🤖 IA reconhece\ncomo entidade confiável"]
    SCHEMA & GMB & LINKEDIN & MENCOES & DIRS & WIKI --> TODOS["Sinal combinado"]

    style ENTIDADE fill:#1976D2,color:white
    style IA fill:#4CAF50,color:white
```

---

## Checklist Off-Page e Backlinks

### Link Building
- [ ] Perfil de backlinks auditado (sem links tóxicos)
- [ ] Estratégia de Digital PR definida
- [ ] Pipeline de guest posts ativo
- [ ] HARO (ou similar) configurado para comentários de especialista
- [ ] Parcerias com sites complementares estabelecidas

### Entidade e Menções
- [ ] Schema Organization implementado
- [ ] Google My Business completo e verificado
- [ ] LinkedIn da empresa e fundadores atualizado
- [ ] Listagem em diretórios relevantes do nicho
- [ ] Monitorização de menções configurada (Google Alerts, Mention)

---

## Ver também

- [[GEO - Overview]] — visão geral do GEO
- [[EEAT e Autoridade]] — construir confiança
- [[3 Pilares Fundamentais do GEO]] — pilares de presença e profundidade
- [[Como Medir o GEO]] — métricas para medir o impacto
