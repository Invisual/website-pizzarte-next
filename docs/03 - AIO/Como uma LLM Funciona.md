---
tags: [aio, llm, ia-generativa, vetores, semântica]
description: Como os modelos de linguagem (LLMs) funcionam — treino, vetores e geração de resposta
created: 2026-06-09
---

# Como uma LLM Funciona

> [!abstract] **Porquê isto importa para o conteúdo**
> Para otimizar conteúdo para ser utilizado por uma IA, precisamos de entender como essa IA "aprende" e "lembra" informação. A LLM não lê páginas web em tempo real — ela aprendeu com bilhões de documentos e armazenou esse conhecimento como padrões matemáticos.

---

## As 3 Fases de uma LLM

```mermaid
graph TD
    subgraph FASE1["📚 Fase 1 — Coleta e Treino"]
        T1[Páginas web]
        T2[Livros e artigos]
        T3[Código documentado]
        T4[Dados públicos]
        T1 & T2 & T3 & T4 --> TREINO[Treino do modelo = aprender padrões de linguagem]
    end

    subgraph FASE2["🔢 Fase 2 — Codificação e Memorização"]
        TREINO --> VET[Vetores representações matemáticas de conceitos]
        VET --> MEM[(Memória Semântica espaço vetorial N-dimensional)]
    end

    subgraph FASE3["💬 Fase 3 — Recuperação e Geração"]
        PERGUNTA([Pergunta do utilizador]) --> INT[Interpreta intenção]
        INT --> BUSCA[Pesquisa vetores relevantes]
        BUSCA --> MEM
        MEM --> RELEVANTES[Retorna conceitos mais próximos]
        RELEVANTES --> GEN[Gera resposta natural]
        GEN --> RESP([Resposta ao utilizador])
    end

    FASE1 --> FASE2 --> FASE3

    style FASE1 fill:#e3f2fd,stroke:#1976D2
    style FASE2 fill:#f3e5f5,stroke:#7B1FA2
    style FASE3 fill:#e8f5e9,stroke:#388E3C
    style PERGUNTA fill:#4CAF50,color:white
    style RESP fill:#2196F3,color:white
    style MEM fill:#FF9800,color:white,stroke:#F57C00
```

---

## O que são Vetores?

Cada palavra, frase ou conceito é convertido num vetor — uma representação matemática que captura o seu **significado semântico**.

```mermaid
graph LR
    subgraph CONCEITOS["Conceitos no espaço vetorial"]
        direction TB
        REI["👑 Rei"]
        RAINHA["👑 Rainha"]
        HOMEM["👨 Homem"]
        MULHER["👩 Mulher"]
        
        REI -. "próximos semanticamente" .-> RAINHA
        HOMEM -. "próximos semanticamente" .-> MULHER
        REI -. "relação de género" .-> HOMEM
        RAINHA -. "relação de género" .-> MULHER
    end
```

> [!info] **Analogia simples**
> Se o conceito "Rei" é representado pelo vetor [0.9, 0.2, 0.8], o conceito "Rainha" estará em [0.9, 0.8, 0.8] — próximo em "realeza" mas diferente em "género". É assim que a IA entende relações semânticas.

---

## Como a LLM Processa uma Pergunta

```mermaid
sequenceDiagram
    actor U as Utilizador
    participant T as Tokenizer
    participant E as Encoder
    participant M as Memória Semântica
    participant D as Decoder
    participant R as Resposta

    U->>T: "Qual a melhor estratégia de SEO?"
    T->>E: Tokens: ["Qual", "a", "melhor", "estratégia", "de", "SEO"]
    E->>M: Vetor da pergunta
    M-->>E: Vetores relevantes: [SEO, estratégia, ranking, keywords, backlinks...]
    E->>D: Contexto semântico + tokens
    D->>R: Gera resposta token por token
    R-->>U: "A melhor estratégia de SEO combina..."
```

---

## LLMs com Pesquisa na Web (RAG)

Modelos como ChatGPT (com browsing) e Perplexity usam **RAG** (Retrieval-Augmented Generation):

```mermaid
graph TD
    P([Pergunta]) --> DECIDE{O modelo tem informação recente?}
    
    DECIDE -->|Sim, na memória| DIRECT[Responde com conhecimento interno]
    DECIDE -->|Não / precisa de dados atuais| SEARCH[Pesquisa na web\nBing, Google...]
    
    SEARCH --> DOCS[Recupera páginas relevantes]
    DOCS --> FILTER[Filtra por qualidade e confiabilidade]
    FILTER --> COMBINE[Combina com conhecimento interno]
    COMBINE --> RESP([Resposta com citações])
    
    DIRECT --> RESP2([Resposta sem citações])

    style P fill:#4CAF50,color:white
    style RESP fill:#2196F3,color:white
    style RESP2 fill:#9C27B0,color:white
```

> [!important] **Implicação para GEO**
> Quando a IA pesquisa na web antes de responder, os critérios que usa para selecionar fontes são: **autoridade da fonte, estrutura do conteúdo, clareza da resposta e dados estruturados**. É exatamente o que o GEO otimiza.

---

## O Papel do Conteúdo no Treino das LLMs

### O que aumenta a probabilidade de ser incluído no treino

| Fator | Impacto | Como aplicar |
|-------|---------|--------------|
| **Publicações em sites de alta DA** | Alto | Guest posts em publicações relevantes |
| **Conteúdo citado por outros sites** | Alto | Link building editorial |
| **Conteúdo original com dados** | Alto | Estudos, pesquisas, relatórios |
| **Schema markup correto** | Médio | JSON-LD em todos os conteúdos |
| **Consistência temática** | Médio | Especialização num nicho |
| **Freshness e atualização** | Médio | Rever e atualizar conteúdo regularmente |

---

## Diferença entre como o Google e a LLM "lêem" o conteúdo

```mermaid
graph LR
    subgraph GOOGLE["🔍 Google lê para ranking"]
        G1[Keywords e densidade]
        G2[Links e autoridade]
        G3[Velocidade da página]
        G4[Sinais de utilizador]
        G5[Meta tags]
    end

    subgraph LLM["🤖 LLM lê para compreensão"]
        L1[Semântica e entidades]
        L2[Contexto e relações]
        L3[Qualidade e profundidade]
        L4[Estrutura lógica]
        L5[Autoridade da fonte]
    end

    subgraph COMUM["✅ Ambos valorizam"]
        C1[Conteúdo de qualidade]
        C2[Estrutura clara]
        C3[Dados precisos]
        C4[E-E-A-T]
    end

    GOOGLE & LLM --> COMUM

    style GOOGLE fill:#e3f2fd,stroke:#1976D2
    style LLM fill:#f3e5f5,stroke:#7B1FA2
    style COMUM fill:#e8f5e9,stroke:#388E3C
```

---

## Implicações Práticas para o Conteúdo

> [!example] **O que a IA "aprende" sobre a tua marca**
>
> Se o teu site tem:
> - Artigos aprofundados sobre um tema específico
> - Citações por outros sites relevantes
> - Schema markup que identifica a empresa como entidade
> - Menções consistentes em diferentes fontes
>
> A IA "aprende" que a tua marca é uma **autoridade temática nesse domínio** e passa a citá-la quando relevante.

---

## Principais LLMs e como pesquisam

| LLM | Pesquisa na web? | Indexação | Implicação SEO/GEO |
|-----|-----------------|-----------|-------------------|
| **ChatGPT (sem browsing)** | Não | Dados de treino até data de corte | Depende de estar bem representado no treino |
| **ChatGPT (com browsing)** | Sim (Bing) | Resultados atuais | Bom ranking no Bing ajuda |
| **Google Gemini** | Sim (Google) | Resultados Google atuais | SEO no Google é crítico |
| **Perplexity** | Sim (múltiplos) | Resultados em tempo real | Alta DA e estrutura clara |
| **Claude (sem projects)** | Não | Dados de treino | Depende do treino |
| **AI Overviews (Google)** | Sim (Google) | Top resultados Google | SEO + E-E-A-T |

---

## Ver também

- [[Processo de Ranking das IA]] — como a IA escolhe o que citar
- [[Otimização On-Page para IA]] — táticas práticas de AIO
- [[../04 - GEO/GEO - Overview|GEO - Overview]] — ser citado pela IA
- [[../01 - Fundamentos/O que é SEO, GEO e AIO|O que é SEO, GEO e AIO]] — contexto geral
