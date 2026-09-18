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
    ];
  },
  async redirects() {
    return LEGACY_MENU_SLUG_REDIRECTS;
  },
};

const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl(nextConfig);
