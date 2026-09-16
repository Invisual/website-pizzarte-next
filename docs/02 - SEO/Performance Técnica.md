---
tags: [seo, performance, core-web-vitals, velocidade, ttfb, lcp, cls, fid]
description: Performance técnica de SEO — Core Web Vitals, TTFB, lazy load e renderização
created: 2026-06-09
---

# Performance Técnica

> [!abstract] **Impacto direto no ranking**
> O Google confirmou: páginas que demoram mais de **3 segundos** a carregar são penalizadas no ranking. A performance é um sinal oficial de ranking desde 2021 (Core Web Vitals).

---

## Core Web Vitals — Os 3 Métricas Obrigatórias

```mermaid
graph TD
    subgraph LCP["⏱️ LCP — Largest Contentful Paint"]
        L1["Mede: tempo até o maior elemento visível carregar"]
        L2["✅ Bom: < 2.5s"]
        L3["⚠️ Melhorar: 2.5s – 4.0s"]
        L4["❌ Mau: > 4.0s"]
        L1 --> L2 & L3 & L4
    end

    subgraph INP["⚡ INP — Interaction to Next Paint"]
        I1["Mede: tempo de resposta a interações do utilizador"]
        I2["✅ Bom: < 200ms"]
        I3["⚠️ Melhorar: 200ms – 500ms"]
        I4["❌ Mau: > 500ms"]
        I1 --> I2 & I3 & I4
    end

    subgraph CLS["📐 CLS — Cumulative Layout Shift"]
        C1["Mede: estabilidade visual — elementos que saltam"]
        C2["✅ Bom: < 0.1"]
        C3["⚠️ Melhorar: 0.1 – 0.25"]
        C4["❌ Mau: > 0.25"]
        C1 --> C2 & C3 & C4
    end

    style LCP fill:#e3f2fd,stroke:#1976D2
    style INP fill:#f3e5f5,stroke:#7B1FA2
    style CLS fill:#e8f5e9,stroke:#388E3C
```

### O que afeta cada métrica

| Métrica | Principais Causas de Falha | Solução |
|---------|---------------------------|---------|
| **LCP** | Imagens grandes sem otimização, servidor lento, CSS bloqueante | Otimizar imagens, CDN, preload de recursos críticos |
| **INP** | JavaScript pesado, event handlers lentos, long tasks | Code splitting, diferir JS não-crítico |
| **CLS** | Imagens sem dimensões definidas, anúncios dinâmicos, web fonts | Sempre definir width/height, reservar espaço para ads |

---

## TTFB — Time to First Byte

> [!info] **O que é o TTFB**
> É o tempo que o navegador demora a receber o **primeiro byte** de resposta do servidor, a partir do momento em que fez o pedido.

```mermaid
graph LR
    A[Browser faz pedido] --> B[DNS Lookup]
    B --> C[TCP Connection]
    C --> D[SSL Handshake]
    D --> E[Server Processing]
    E --> F([1º Byte recebido])
    
    style F fill:#4CAF50,color:white
    
    subgraph TTFB["Tudo isto = TTFB"]
        B
        C
        D
        E
    end
```

| TTFB | Avaliação | Ação |
|------|-----------|------|
| < 200ms | ✅ Excelente | Manter |
| 200–500ms | ⚠️ Aceitável | Otimizar servidor e cache |
| > 500ms | ❌ Mau | CDN, cache agressivo, upgrade de hosting |

### Como melhorar o TTFB

- **CDN** (Content Delivery Network) — servidor mais próximo do utilizador
- **Cache de servidor** — gerar HTML uma vez e servir em cache
- **Hosting de qualidade** — evitar partilhado, preferir VPS/cloud
- **Otimizar base de dados** — queries lentas aumentam o TTFB
- **Pré-renderização** (SSG) — HTML gerado em build time, não em runtime

---

## Otimização de Imagens

As imagens são frequentemente o maior culpado na performance de um site.

```mermaid
flowchart TD
    IMG["Imagem original"] --> A{"Formato correto?"}

    A -->|Não| B["Converter para WebP/AVIF"]
    A -->|Sim| C{"Dimensões corretas?"}

    B --> C

    C -->|Não| D["Redimensionar para<br>tamanho exato de exibição"]
    C -->|Sim| E{"Compressão<br>aplicada?"}

    D --> E

    E -->|Não| F["Comprimir com<br>80-85% qualidade"]
    E -->|Sim| G{"Lazy loading<br>configurado?"}

    F --> G

    G -->|Não| H["Adicionar loading='lazy'<br>(exceto above-the-fold)"]
    G -->|Sim| I{"width e height<br>definidos no HTML?"}

    H --> I

    I -->|Não| J["Adicionar dimensões<br>para evitar CLS"]
    I -->|Sim| K(["✅ Imagem otimizada"])

    %% Estilização
    style K fill:#4CAF50,color:white
```

### Formatos de imagem recomendados

| Formato | Uso ideal | Suporte | Tamanho vs JPEG |
|---------|-----------|---------|-----------------|
| **WebP** | Fotos e imagens complexas | 95%+ browsers | -30% |
| **AVIF** | Fotos de alta qualidade | 85%+ browsers | -50% |
| **SVG** | Ícones, logos, ilustrações | 100% | Vetorial |
| **PNG** | Transparência necessária | 100% | Maior que WebP |
| **JPEG** | Fallback legacy | 100% | Referência |

---

## Lazy Loading

> [!tip] **O que é o Lazy Loading**
> Carregar imagens e outros recursos **apenas quando entram no viewport** do utilizador, em vez de carregar tudo ao início.

### Implementação correta

```html
<!-- ✅ Correto: imagens abaixo do fold com lazy loading -->
<img src="foto.webp" loading="lazy" width="800" height="600" alt="Descrição">

<!-- ❌ Errado: above-the-fold com lazy loading (atrasa o LCP) -->
<img src="hero.webp" loading="lazy" ...> <!-- NÃO fazer -->

<!-- ✅ Correto: hero image sem lazy loading -->
<img src="hero.webp" loading="eager" fetchpriority="high" width="1200" height="600" alt="Hero">
```

> [!warning] **Lazy loading e SEO**
> Não aplicar lazy loading a imagens **above-the-fold** (visíveis sem scroll). O Googlebot pode não esperar pelo carregamento, tornando-as invisíveis para indexação.

---

## Renderização Bloqueante

Recursos que **bloqueiam o rendering** da página atrasam o LCP e prejudicam a experiência do utilizador.

### CSS Bloqueante

```html
<!-- ❌ Bloqueia rendering -->
<link rel="stylesheet" href="styles.css">

<!-- ✅ CSS crítico inline, resto assíncrono -->
<style>/* CSS crítico above-the-fold aqui */</style>
<link rel="preload" as="style" href="styles.css" onload="this.rel='stylesheet'">
```

### JavaScript Bloqueante

```html
<!-- ❌ Bloqueia parsing e rendering -->
<script src="analytics.js"></script>

<!-- ✅ Defer: executa depois do HTML, não bloqueia -->
<script src="analytics.js" defer></script>

<!-- ✅ Async: carrega em paralelo, executa quando pronto -->
<script src="widget.js" async></script>
```

### Quando usar defer vs async

| Atributo | Comportamento | Quando usar |
|----------|--------------|-------------|
| **Nenhum** | Bloqueia HTML parsing | Evitar para scripts externos |
| **`defer`** | Carrega em paralelo, executa em ordem após HTML | Scripts que dependem do DOM |
| **`async`** | Carrega em paralelo, executa imediatamente | Scripts independentes (analytics) |

---

## Checklist de Performance

### Core Web Vitals
- [ ] LCP < 2.5 segundos (medir no PageSpeed Insights)
- [ ] INP < 200ms
- [ ] CLS < 0.1

### Imagens
- [ ] Todas as imagens em WebP ou AVIF
- [ ] Lazy loading em imagens abaixo do fold
- [ ] width e height definidos em todas as imagens
- [ ] Imagens comprimidas (max 200kb por imagem de conteúdo)

### Código
- [ ] CSS crítico inline ou preloaded
- [ ] JavaScript não-crítico com defer/async
- [ ] Remover CSS/JS não utilizado
- [ ] Minificação de HTML, CSS, JS

### Servidor
- [ ] TTFB < 200ms
- [ ] HTTPS configurado corretamente
- [ ] Gzip/Brotli compressão ativa
- [ ] Headers de cache configurados
- [ ] CDN configurada (para sites com tráfego global)

---

## Ferramentas de Medição

| Ferramenta | O que mede | URL |
|------------|-----------|-----|
| **PageSpeed Insights** | Core Web Vitals por URL | pagespeed.web.dev |
| **Google Search Console** | CWV no campo real | search.google.com/search-console |
| **GTmetrix** | Performance detalhada + waterfall | gtmetrix.com |
| **WebPageTest** | Análise avançada, filmstrip | webpagetest.org |
| **Lighthouse** | Auditoria completa no browser | DevTools → Lighthouse |

---

## Ver também

- [[SEO Técnico]] — visão geral técnica
- [[Arquitetura e Estrutura da Página]] — estrutura que afeta performance
- [[Robots e Sitemap]] — controlo de rastreamento
