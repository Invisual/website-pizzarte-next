// next.config.js
const createNextIntlPlugin = require("next-intl/plugin");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), camera=(), microphone=()" },
  {
    key: "Content-Security-Policy-Report-Only",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://cdn-cookieyes.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://cdn-cookieyes.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
  },
];

// Slugs de categoria de menu que o Gatsby publicou em PT sob os prefixos
// EN/FR/ES (gatsby-node.js não traduzia o slug). Redireciona para o slug
// correto de cada idioma, definido em messages/{locale}/menu.json.
const LEGACY_MENU_SLUG_REDIRECTS = require("./lib/legacyMenuRedirects.js");

const nextConfig = {
  allowedDevOrigins: ["192.168.2.29"],
  experimental: {
    globalNotFound: true,
    // O CSS total do site é minúsculo (styled-components já injeta o seu
    // inline; o resto são ~7KB) — inlinar poupa dois pedidos render-blocking
    // (~900ms de FCP/LCP em mobile 4G no Lighthouse).
    inlineCss: true,
  },
  cacheComponents: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Cortar 2048/3840 do default poupa transformações que raramente
    // seriam pedidas — o maior breakpoint real do site é ~2560px.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // Ficheiros de public/ saem por defeito com "max-age=0" (revalidam a
      // cada visita) — Lighthouse: "Use durações totais de cache eficientes".
      // Não têm hash no nome, por isso 30 dias (igual a minimumCacheTTL) em
      // vez de "immutable": se uma imagem for substituída com o mesmo nome,
      // propaga-se em no máximo um mês (ou renomeia-se o ficheiro).
      ...["images", "video", "icons", "pdf"].map((dir) => ({
        source: `/${dir}/:path*`,
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      })),
    ];
  },
  async redirects() {
    return LEGACY_MENU_SLUG_REDIRECTS;
  },
};

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);
