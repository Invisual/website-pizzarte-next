---
tags: [dados-estruturados, schema, json-ld, rich-results, seo, aio]
description: O que são dados estruturados e porque são essenciais para SEO e AIO
created: 2026-06-09
---

# Dados Estruturados — Overview

> [!abstract] **Definição**
> Dados estruturados são marcações adicionadas ao código HTML de uma página que ajudam motores de pesquisa e sistemas de IA a compreenderem, com precisão, o que aquele conteúdo representa — seja um artigo, produto, evento, pessoa, empresa ou outro tipo de entidade.

---

## Como Funcionam os Dados Estruturados

```mermaid
graph TD
    HTML["📄 Página HTML (texto legível para humanos)"] --> DS["🏷️ Schema Markup (JSON-LD no <head>)"]
    
    DS --> GOOGLE["🔍 Google interpreta com precisão o conteúdo"]
    DS --> LLM["🤖 IA lê e entende as entidades e relações"]
    
    GOOGLE --> RICH["Rich Results na SERP FAQ, estrelas, breadcrumbs carrosséis de produtos"]
    LLM --> CITA["Citações mais precisas en respostas geradas"]
    
    RICH & CITA --> RESULT["📈 Mais visibilidade e confiança"]

    style HTML fill:#e3f2fd,stroke:#1976D2
    style DS fill:#FF9800,color:white,stroke:#F57C00
    style RESULT fill:#4CAF50,color:white
```

---

## Por que os Dados Estruturados são Essenciais

| Benefício | Para SEO | Para AIO/GEO |
|-----------|---------|-------------|
| **Rich results** | Snippets visuais que aumentam CTR | Não aplicável diretamente |
| **Compreensão de entidades** | Google entende tipo de conteúdo | IA identifica entidades e relações |
| **Canonical e duplicados** | Define página principal | Consolida sinais de autoridade |
| **Conexão ao Knowledge Graph** | Integra no gráfico de conhecimento do Google | Fortifica o reconhecimento da entidade |
| **FAQ e PAA** | Aparece em People Also Ask | IA usa para responder diretamente |
| **Sitelinks** | Menu de navegação na SERP | Estrutura do site visível para IA |

---

## Formatos de Marcação

| Formato | Estado | Recomendado |
|---------|--------|-------------|
| **JSON-LD** | Moderno, separado do HTML | ✅ Sim — recomendado pelo Google |
| **Microdata** | Legado, integrado no HTML | ⚠️ Funciona mas complexo |
| **RDFa** | Legado, integrado no HTML | ⚠️ Evitar para novos projetos |

### Estrutura básica JSON-LD

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Agência Exemplo",
  "url": "https://agencia.pt",
  "logo": "https://agencia.pt/logo.png",
  "description": "Agência especializada em SEO, GEO e marketing digital em Lisboa, Portugal.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lisboa",
    "addressCountry": "PT"
  },
  "sameAs": [
    "https://www.linkedin.com/company/agencia-exemplo",
    "https://twitter.com/agencia_exemplo"
  ]
}
</script>
```

---

## Como os Dados Estruturados Conectam ao Conhecimento Global

```mermaid
graph LR
    SITE["🌐 Teu Site com Schema Markup"] -->|"identifica entidade"| KG["📚 Knowledge Graph do Google"]
    SITE -->|"define relações"| LLM_TRAIN["🤖 Dados de treino\ndas LLMs"]
    
    KG --> PANEL["Knowledge Panel no Google"]
    KG --> SAMEIAS["sameAs links Wikipedia, LinkedIn"]
    LLM_TRAIN --> CITA["IA cita a entidade com precisão"]
    
    PANEL & SAMEIAS & CITA --> AUTH["Autoridade de entidade reconhecida"]
    
    style SITE fill:#1976D2,color:white
    style KG fill:#FF9800,color:white
    style AUTH fill:#4CAF50,color:white
```

---

## Tipos de Rich Results

| Schema Type | Rich Result | Aumenta CTR |
|------------|-------------|-------------|
| **FAQ** | Accordion com perguntas e respostas | +50% área na SERP |
| **Product** | Estrelas de review, preço, disponibilidade | +30% CTR |
| **Article** | Data, autor, imagem em carrossel | +20% CTR |
| **Recipe** | Tempo de preparação, calorias, avaliação | +25% CTR |
| **Event** | Data, local, preço | Destaque em resultados de eventos |
| **LocalBusiness** | Horário, morada, avaliação | Pack local |
| **Breadcrumb** | Caminho de navegação sob o título | Melhor UX |
| **HowTo** | Passos visuais | +30% em pesquisas procedurais |
| **Video** | Thumbnail e duração | Destaque em resultados de vídeo |

---

## Validação e Testes

### Ferramentas de validação

| Ferramenta | O que verifica | URL |
|------------|---------------|-----|
| **Google Rich Results Test** | Se o schema gera rich results | search.google.com/test/rich-results |
| **Schema Markup Validator** | Validade do JSON-LD (schema.org) | validator.schema.org |
| **Google Search Console** | Rich results reais no site | search.google.com/search-console |
| **Structured Data Testing Tool (legacy)** | Teste de esquemas | Deprecated mas ainda funciona |

---

## Ver também

- [[Schema Markup - Tipos e Implementação]] — todos os tipos em detalhe com código
- [[../02 - SEO/SEO - Overview|SEO Overview]] — contexto do SEO técnico
- [[../03 - AIO/Otimização On-Page para IA|Otimização On-Page para IA]] — AIO e estrutura
- [[../04 - GEO/EEAT e Autoridade|EEAT e Autoridade]] — como o schema fortalece a entidade
