// next.config.js
const createNextIntlPlugin = require("next-intl/plugin");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const nextConfig = {
  allowedDevOrigins: ["<your-ip>"],
  experimental: {
    globalNotFound: true,
    useCache: true,
  },
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    additionalData: `$var: red;`,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

// Cria o plugin Next Intl
const withNextIntl = createNextIntlPlugin();

// Combina MDX + Next Intl + Config
module.exports = withNextIntl(withMDX(nextConfig));
