import { Montserrat } from "next/font/google";

// Corpo de texto — antes carregado via <link> ao Google Fonts dentro do
// Helmet (render-blocking). next/font faz self-host + preload automático.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat",
});

// britishRegular e chunkyRosie (títulos decorativos, Title.jsx, .active-nav
// do Header) NÃO passam por next/font/local — o preload automático dele não
// estava a gerar nenhum <link rel="preload" as="font"> em produção (build
// testado com inlineCss/cacheComponents desligados, sem diferença), o que
// reabria a janela do bug de repaint-on-swap do Chromium em elementos com
// -webkit-text-stroke (fallback nunca trocava pela fonte real). @font-face
// + <link rel="preload"> escritos à mão em app/globals.css e
// app/[locale]/layout.jsx são ficheiros estáticos servidos de public/fonts/
// — não dependem de nenhuma geração automática do build.
