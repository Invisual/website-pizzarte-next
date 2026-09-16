---
tags: [intenção, busca, keywords, serp, conteúdo]
description: Tipos de intenção de busca e como alinhar o conteúdo com o que o utilizador quer
created: 2026-06-09
---

# Intenção de Busca

> [!abstract] **A chave do SEO moderno**
> O Google não rankeia apenas o conteúdo mais relevante — rankeia o conteúdo que melhor satisfaz a **intenção** do utilizador. Criar conteúdo desalinhado com a intenção é um dos erros mais comuns e mais prejudiciais.

---

## Os 4 Tipos de Intenção

```mermaid
graph TD
    INTENCAO["🎯 Intenção de Busca"] --> INFO["📖 Informacional Quero aprender sobre X"]
    INTENCAO --> NAV["🧭 Navegacional Quero ir para um site específico"]
    INTENCAO --> COM["🔍 Investigação Comercial Estou a considerar comprar X"]
    INTENCAO --> TRANS["🛒 Transacional Quero comprar/contratar X agora"]

    INFO --> I1["Pesquisas: 'O que é X? Como funciona X? Guia de X'"]
    NAV --> N1["Pesquisas: 'LinkedIn login Facebook Agência Exemplo site'"]
    COM --> C1["Pesquisas: 'Melhor X para Y' 'X vs Y' 'Reviews de X' 'Alternativas a X'"]
    TRANS --> T1["Pesquisas: 'Comprar X' 'Contratar X Lisboa' 'Preço de X' 'X + desconto'"]

    style INFO fill:#e3f2fd,stroke:#1976D2
    style NAV fill:#f3e5f5,stroke:#7B1FA2
    style COM fill:#fff3e0,stroke:#F57C00
    style TRANS fill:#e8f5e9,stroke:#388E3C
```

---

## Tipo de Conteúdo por Intenção

| Intenção | Tipo de Conteúdo | Objetivo | Métricas |
|----------|-----------------|---------|---------|
| **Informacional** | Artigos, guias, tutoriais, vídeos | Educar | Tempo na página, partilhas |
| **Navegacional** | Homepage, landing pages de marca | Converter visitantes diretos | CTR, bounce rate |
| **Investigação Comercial** | Comparativos, reviews, case studies, pricing | Avançar no funil | Tempo, conversão micro |
| **Transacional** | Páginas de produto/serviço, landing pages | Converter | Conversão, receita |

---

## Como Identificar a Intenção

### Método 1: Analisar os Top 10 Resultados

```mermaid
graph TD
    A([Pesquisar a keyword no Google]) --> B{Que tipo de páginas aparecem?}
    
    B -->|Artigos e guias| C[Intenção Informacional]
    B -->|Páginas de produto/serviço| D[Intenção Transacional]
    B -->|Comparativos e reviews| E[Intenção Investigação Comercial]
    B -->|Sites específicos/homepages| F[Intenção Navegacional]
    B -->|Mix de tipos| G[Intenção mista — criar conteúdo híbrido]
```

### Método 2: Analisar o Featured Snippet

| Featured Snippet | Intenção provável |
|-----------------|------------------|
| Definição/explicação | Informacional |
| Lista de passos | Informacional (how-to) |
| Lista de produtos | Investigação comercial |
| Preços ou comparação | Investigação comercial / Transacional |
| Endereço ou horário | Transacional local |

---

## Erros de Intenção — Os Mais Comuns

```mermaid
graph LR
    E1["❌ Erro 1 Usar página de produto para keyword informacional Ex: 'O que é SEO?' → página de serviços SEO Resultado: Alta bounce rate, sem ranking"] -->|"Solução"| S1["✅ Criar artigo informacional 'O que é SEO' → guia completo"]
    
    E2["❌ Erro 2 Usar artigo do blog para keyword transacional Ex: 'Contratar agência SEO Lisboa' → artigo informacional Resultado: Sem conversão, ranking fraco"] -->|"Solução"| S2["✅ Landing page dedicada com CTA, preços e contacto"]
    
    E3["❌ Erro 3 Ignorar intenção local Ex: 'dentista' sem geolocalização Resultado: Concorre com sites nacionais instead of locais"] -->|"Solução"| S3["✅ Conteúdo local-specific 'dentista Lisboa Baixa'"]
```

---

## Intenção Informacional — Como Otimizar

### Estrutura ideal de artigo informacional

```
H1: [Keyword principal] — [Proposta de valor]
↓
Parágrafo de abertura: resposta direta em 2-3 frases
↓
H2: O que é [tema]? (definição)
H2: Como funciona [tema]? (processo)
H2: Por que [tema] é importante? (benefícios)
H2: Como implementar [tema]? (passos práticos)
H2: Exemplos de [tema] (casos reais)
H2: Perguntas frequentes sobre [tema] (FAQ Schema)
↓
Conclusão com CTA suave (leitura adicional ou subscrição)
```

---

## Intenção Transacional — Como Otimizar

### Estrutura ideal de página de serviço/produto

```
H1: [Serviço] para [Tipo de Cliente] em [Localização]
↓
Value proposition clara em 2 frases
↓
CTA primário (botão "Pedir proposta" / "Contactar")
↓
H2: O que inclui [Serviço]? (lista de entregáveis)
H2: Como funciona o processo? (passos)
H2: Resultados que os nossos clientes obtêm (prova social)
H2: Quanto custa [Serviço]? (pricing ou range)
H2: Perguntas frequentes
↓
CTA final + formulário de contacto
```

---

## Intenção de Investigação Comercial

### Tipos de conteúdo mais eficazes

| Formato | Exemplo | Quando usar |
|---------|---------|-------------|
| **Comparativo** | "Ahrefs vs SEMrush: qual escolher em 2026?" | Utilizador avalia alternativas |
| **Review** | "Review: Ferramenta X — vale a pena?" | Utilizador quer validação |
| **Best-of** | "10 melhores ferramentas de SEO para PMEs" | Utilizador quer opções curadas |
| **Case study** | "Como aumentámos o tráfego orgânico 300% em 6 meses" | Prova de resultados |
| **Guia de compra** | "Como escolher uma agência de SEO" | Guiar a decisão |

---

## Intenção e AIO/GEO

```mermaid
graph TD
    subgraph INFO_AIO["Intenção Informacional + AIO"]
        I1[Conteúdo em H2/H3 como perguntas]
        I2[Resposta direta no 1.º parágrafo]
        I3[Featured Snippet e PAA]
        I4[Citado pela IA em perguntas do tema]
    end

    subgraph TRANS_GEO["Intenção Transacional + GEO"]
        T1[Marca citada quando utilizador pergunta à IA 'quem faz X']
        T2[Reviews positivas visíveis pela IA]
        T3[EEAT demonstrado na página de serviço]
        T4[Schema Service com dados precisos]
    end

    style INFO_AIO fill:#e3f2fd,stroke:#1976D2
    style TRANS_GEO fill:#e8f5e9,stroke:#388E3C
```

---

## Checklist de Alinhamento de Intenção

Para cada página do site:
- [ ] A intenção da keyword foi identificada
- [ ] O tipo de conteúdo corresponde à intenção
- [ ] O formato (artigo vs landing page vs lista) está correto
- [ ] O CTA está alinhado com a fase do funil
- [ ] O conteúdo responde completamente à questão do utilizador
- [ ] A página foi testada com pesquisa no Google (verificar top 10)

---

## Ver também

- [[Tipos de Busca e SERP]] — formatos de resultado SERP
- [[../02 - SEO/Conteúdo e Taxonomia|Conteúdo e Taxonomia]] — estratégia de conteúdo
- [[../03 - AIO/Otimização On-Page para IA|Otimização On-Page para IA]] — estrutura para AIO
