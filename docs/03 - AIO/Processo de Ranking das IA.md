---
tags: [aio, geo, ranking, ia, processo, vetores, fontes]
description: Como a IA decide o que citar — processo de ranking semântico e seleção de fontes
created: 2026-06-09
---

# Processo de Ranking das IA

> [!abstract] **A ideia central**
> As IAs não fazem "ranking" como o Google. Em vez disso, fazem uma **seleção semântica** de informação baseada em confiança, relevância e coerência. O GEO adapta sempre a resposta conforme o perfil, histórico e interações da pessoa com a LLM.

---

## O Processo Completo de Resposta da IA

```mermaid
graph TD
    A([Pergunta do utilizador]) --> B[Interpretação da Intenção]
    B --> C[Busca de Vetores Relevantes]
    C --> D[(Memória Semântica)]
    D --> E[Ranqueamento de Fontes]
    E --> F[Geração da Resposta]
    F --> G([Resposta final sintetizada])

    subgraph DETALHE_B["Interpretação da Intenção"]
        B --> B1[Contexto da conversa]
        B --> B2[Histórico do utilizador]
        B --> B3[Perfil e preferências]
    end

    subgraph DETALHE_E["Ranqueamento Mental de Fontes"]
        E --> E1[Autoridade semântica]
        E --> E2[Menções de terceiros]
        E --> E3[Reputação online]
        E --> E4[Coerência histórica]
        E --> E5[Citações em fontes fortes]
        E --> E6[Entidades bem definidas]
    end

    style A fill:#4CAF50,color:white,stroke:#388E3C
    style G fill:#2196F3,color:white,stroke:#1976D2
    style D fill:#FF9800,color:white,stroke:#F57C00
```

---

## O que a IA Prioriza ao Escolher Fontes

### Os 7 Fatores de Ranking Semântico

| Fator | O que significa | Como fortalecer |
|-------|-----------------|-----------------|
| **Autoridade semântica** | Profundidade e consistência de conteúdo sobre um tema | Publicar extensamente sobre o nicho |
| **Menções de terceiros** | Quantos sites relevantes mencionam a marca/conteúdo | Digital PR, link building editorial |
| **Reputação online** | Reviews, mentions, sinais sociais positivos | Gestão de reputação ativa |
| **Dados estruturados** | Schema markup que identifica entidades claramente | JSON-LD em todas as páginas |
| **Coerência histórica** | Consistência do conteúdo ao longo do tempo | Não apagar ou alterar radicalmente conteúdo antigo |
| **Citações em fontes fortes** | Ser mencionado por sites de alta autoridade | Guest posts, entrevistas, estudos citados |
| **Entidades bem definidas** | Empresa, pessoa ou tema claramente identificados | Schema Organization, Person, etc. |

---

## Como as Entidades São Lidas pela IA

Uma "entidade" para uma IA é um conceito claramente definível com:

```mermaid
graph LR
    ENTIDADE["🏢 Entidade\n(ex: 'Agência Exemplo')"] --> F1["📋 Ficha estruturada\nschema.org/Organization"]
    ENTIDADE --> F2["🔗 Citações externas\noutros sites mencionam"]
    ENTIDADE --> F3["📰 Notas de imprensa\nnoticias.pt, jornal.pt"]
    ENTIDADE --> F4["📝 Menções em artigos\n'segundo a Agência Exemplo...'"]
    ENTIDADE --> F5["🌐 Presença em diretórios\nLinkedIn, Google My Business"]
    
    F1 & F2 & F3 & F4 & F5 --> FORTE[Entidade forte\nreconhecida pela IA]
    
    style ENTIDADE fill:#1976D2,color:white
    style FORTE fill:#4CAF50,color:white
```

### Como construir uma entidade forte

| Ação | Plataforma | Prioridade |
|------|-----------|------------|
| Página "Sobre Nós" robusta com schema Organization | Site próprio | 🔴 Alta |
| Perfil Google My Business completo | Google | 🔴 Alta |
| LinkedIn da empresa e fundadores | LinkedIn | 🔴 Alta |
| Wikipedia (se elegível) | Wikipedia | 🟡 Média |
| Wikidata entry | Wikidata | 🟡 Média |
| Menções em publicações do setor | Externo | 🔴 Alta |
| Perfil em diretórios de nicho | Vários | 🟡 Média |

---

## Como as LLMs Utilizam Backlinks (diferente do Google)

```mermaid
graph TD
    subgraph GOOGLE["🔍 Google com backlinks"]
        GL1[Link de site A para site B]
        GL2[Google conta como voto de confiança]
        GL3[Aumenta Domain Authority]
        GL1 --> GL2 --> GL3
    end

    subgraph LLM["🤖 LLM com backlinks"]
        LL1[Texto em volta do link]
        LL2["'Segundo a empresa X, especializada em...'"]
        LL3[IA lê o contexto, não o link em si]
        LL4[Menção rica = ponta de autoridade semântica]
        LL1 --> LL2 --> LL3 --> LL4
    end

    style GOOGLE fill:#e3f2fd,stroke:#1976D2
    style LLM fill:#f3e5f5,stroke:#7B1FA2
```

> [!warning] **Mudança crítica no link building**
> Um link sem texto útil em volta **= zero impacto em IA**.
> Uma menção contextual rica = reconhecimento de autoridade.
> O link building moderno É context building.

### Comparação: link vs. menção para IA

| Tipo | Exemplo | Impacto na IA |
|------|---------|--------------|
| **Link sem contexto** | `Veja aqui <a href="...">aqui</a>` | ❌ Zero impacto |
| **Link com texto âncora** | `Segundo <a href="...">SEO técnico</a>` | ⚠️ Baixo impacto |
| **Menção contextual** | `Segundo a [Empresa X], especializada em SEO há 10 anos, a melhor abordagem é...` | ✅ Alto impacto |
| **Citação como fonte primária** | `Um estudo de 2026 da [Empresa X] mostrou que...` | ✅✅ Máximo impacto |

---

## Aparecer nas Respostas das LLMs

### Framework para máxima presença nas IAs

```mermaid
graph TD
    BASE["🏗️ Base: Conteúdo técnico sólido\n(SEO on-page + AIO)"] --> AUTH
    
    AUTH["🎯 Autoridade temática profunda\nPublicar extensamente sobre 1-2 temas"] --> CONF
    
    CONF["✅ Conteúdos confiáveis e consistentes\nFactos verificados, fontes citadas"] --> FRESH
    
    FRESH["🔄 Freshness constante\nAtualizar conteúdo existente\nPublicar regularmente"] --> EXT
    
    EXT["🔗 Citações externas\nGuest posts, Digital PR\nMenções em publicações do setor"] --> SOC
    
    SOC["📣 Sinais sociais e reputação\nEngagement, reviews positivas\nPresença em comunidades"] --> RESULT

    RESULT(["🏆 Presença nas respostas de IA"])

    style BASE fill:#e3f2fd,stroke:#1976D2
    style RESULT fill:#4CAF50,color:white
```

---

## Métricas para Medir Presença nas IAs

| Métrica | O que mede | Ferramenta |
|---------|-----------|-----------|
| **Answer Share of Voice** | % das respostas da IA em que a tua marca aparece | Brandwatch AI, Mention |
| **Citation Share** | % de vezes que és citado quando o tema é pesquisado | Monitorização manual + tools |
| **Mention Share** | Frequência de menções nas respostas de IA | Perplexity, ChatGPT testing |
| **AI Exposure Score** | Score geral de visibilidade nas IAs | Ferramentas especializadas GEO |
| **Presença em respostas longas** | Se apareces em respostas detalhadas | Teste manual |
| **Menções nas LLMs** | Perguntar diretamente às IAs sobre a marca | ChatGPT, Gemini, Claude |

### Como testar a tua presença agora

```
1. Abre o ChatGPT, Gemini ou Perplexity
2. Pergunta: "Quais são as melhores [empresas/agências/especialistas] em [teu nicho] em [país]?"
3. Pergunta: "O que é [teu produto/serviço]? Que empresas recomendam?"
4. Regista se és mencionado e em que contexto
5. Compara com os concorrentes
```

---

## Ver também

- [[Como uma LLM Funciona]] — base técnica
- [[Otimização On-Page para IA]] — táticas práticas
- [[../04 - GEO/EEAT e Autoridade|EEAT e Autoridade]] — como construir confiança
- [[../04 - GEO/Como Medir o GEO|Como Medir o GEO]] — métricas detalhadas
