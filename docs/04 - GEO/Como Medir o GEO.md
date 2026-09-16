---
tags: [geo, métricas, kpis, medição, citation-share, monitorização]
description: Como medir o GEO — métricas, ferramentas e processo de monitorização
created: 2026-06-09
---

# Como Medir o GEO

> [!abstract] **O desafio de medir GEO**
> Ao contrário do SEO (onde a posição no ranking é objetiva), o GEO é mais difuso: mede-se pela presença nas respostas de IA, pelas menções externas e pelo reconhecimento como fonte autorizada. Mas há métricas claras para o fazer.

---

## As Métricas Principais do GEO

```mermaid
graph TD
    GEO_METRICAS["📊 Métricas GEO"] --> AM["Answer Share of Voice % das respostas de IA em que a marca aparece"]
    GEO_METRICAS --> CS["Citation Share % de vezes que és citado quando o tema é pesquisado"]
    GEO_METRICAS --> MS["Mention Share Frequência de menções em respostas de IA"]
    GEO_METRICAS --> AE["AI Exposure Score Score geral de visibilidade nas IAs"]
    GEO_METRICAS --> PL["Presença em Respostas Longas Aparecer em respostas detalhadas e aprofundadas"]
    GEO_METRICAS --> ML["Menções nas LLMs Quantas IAs principais te mencionam"]

    style GEO_METRICAS fill:#388E3C,color:white
```

---

## Descrição de Cada Métrica

### 1. Answer Share of Voice

**O que é:** Percentagem das respostas geradas pelas IAs sobre o teu setor em que a tua marca é mencionada.

**Como calcular:**
```
Answer SoV = (Nº de respostas com a tua marca / Total de respostas sobre o tema) × 100
```

**Como medir:**
- Define 20-50 perguntas relevantes para o teu setor
- Pergunta-as nas principais IAs (ChatGPT, Gemini, Perplexity)
- Regista quantas vezes a tua marca aparece

---

### 2. Citation Share

**O que é:** Percentagem de vezes que és especificamente **citado como fonte** quando um tema relevante é pesquisado.

**Como medir:**
```
Pesquisa: "Segundo quem é que [teu tema]?"
Pesquisa: "Quais as fontes para [teu nicho]?"
Registar presença vs. concorrentes
```

---

### 3. Mention Share

**O que é:** Frequência relativa de menções da tua marca em comparação com os concorrentes diretos.

**Fórmula:**
```
Mention Share = Tuas menções / (Tuas menções + Menções concorrente A + Menções concorrente B) × 100
```

---

### 4. AI Exposure Score

**O que é:** Score composto que agrega múltiplos sinais de visibilidade nas IAs.

| Componente | Peso |
|-----------|------|
| Menções em ChatGPT | 25% |
| Menções em Gemini | 20% |
| Menções em Perplexity | 20% |
| Menções em AI Overview (Google) | 20% |
| Menções em outros LLMs | 15% |

---

## Processo de Monitorização Mensal

```mermaid
graph TD
    START([Início do mês]) --> DEFINE["Definir 30 perguntas testadas este mês"]
    DEFINE --> TEST["Testar em 4 IAs: ChatGPT, Gemini, Perplexity, AI Overview"]
    TEST --> RECORD["Registar resultados: - Mencionado? Sim/Não - Contexto da menção - Concorrentes mencionados"]
    RECORD --> CALC["Calcular métricas: - Answer SoV - Citation Share - Mention Share"]
    CALC --> COMPARE["Comparar com mês anterior e com concorrentes"]
    COMPARE --> ACTION["Identificar oportunidades: - Temas não cobertos - Concorrentes a ganhar - Conteúdo a criar"]
    ACTION --> NEXT([Próximo mês])

    style START fill:#4CAF50,color:white
    style NEXT fill:#2196F3,color:white
```

---

## Template de Teste Manual nas IAs

```markdown
## Perguntas a testar nas IAs

### Sobre identidade da marca
- "Quem é a [Nome da Empresa]?"
- "O que faz a [Nome da Empresa]?"

### Sobre o nicho/serviço
- "Qual a melhor [agência/empresa] de [serviço] em [cidade/país]?"
- "Quem são os especialistas em [tema do nicho]?"
- "Quais as [agências/empresas] mais confiáveis para [problema do cliente]?"

### Sobre o tema/setor
- "Como se faz [tua especialidade]?"
- "Quais as melhores práticas para [teu serviço]?"
- "Que empresa devo contratar para [teu serviço]?"

### Registo de resultados
| Pergunta | ChatGPT | Gemini | Perplexity | AI Overview |
|----------|---------|--------|------------|-------------|
| Pergunta 1 | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| Pergunta 2 | ... | ... | ... | ... |
```

---

## Ferramentas para Medir GEO

| Ferramenta | O que mede | Tipo |
|------------|-----------|------|
| **Brandwatch AI** | Menções e sentimento nas IAs | Pago |
| **Mention.com** | Menções online e em IAs | Pago |
| **Google Alerts** | Menções na web (proxy para IA) | Gratuito |
| **Ahrefs** | Backlinks e menções (base para GEO) | Pago |
| **BrightEdge Generative Parser** | Análise de AI Overview | Pago |
| **ChatGPT/Gemini/Perplexity** | Teste manual de presença | Gratuito (manual) |
| **Semrush AI Toolkit** | Presença em respostas de IA | Pago |

---

## Dashboard de GEO — O que monitorizar

```mermaid
graph LR
    DASH["📊 Dashboard GEO"] --> M1["🔢 Mensal Answer SoV Citation Share Mention Share vs Concorrentes"]
    DASH --> T1["📅 Trimestral AI Exposure Score Qualidade das menções Análise de lacunas"]
    DASH --> A1["📋 Anual Evolução da autoridade semântica Impacto no tráfego\nROI do GEO"]
```

### KPIs por maturidade GEO

| Fase | KPIs foco | Meta |
|------|-----------|------|
| **Início (0-3 meses)** | Schema implementado, entidade criada | Ser mencionado em pelo menos 1 IA |
| **Crescimento (3-9 meses)** | Mention Share, Citation Share | 10-20% das perguntas do nicho |
| **Maturidade (9-18 meses)** | Answer SoV, AI Exposure Score | 30%+ das perguntas relevantes |
| **Liderança (18+ meses)** | Todas as métricas + concorrência | Top 3 no nicho nas IAs |

---

## Impacto do GEO no Negócio

> [!tip] **Como conectar GEO com resultados de negócio**

| Métrica GEO | Impacto no negócio |
|-------------|-------------------|
| Mais menções nas IAs | Mais brand awareness e consideração |
| Citado como fonte primária | Posição de liderança de pensamento |
| Mencionado em respostas de compra | Tráfego qualificado e leads |
| Recomendado pela IA para o nicho | Redução do CAC (custo de aquisição) |
| Alta visibilidade comparativa | Vantagem competitiva sustentável |

---

## Ver também

- [[GEO - Overview]] — visão geral do GEO
- [[3 Pilares Fundamentais do GEO]] — pilares que impactam as métricas
- [[EEAT e Autoridade]] — construir confiança para melhorar métricas
- [[Off-page e Backlinks]] — presença externa que afeta GEO
