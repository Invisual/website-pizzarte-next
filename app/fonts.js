import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

// Corpo de texto — antes carregado via <link> ao Google Fonts dentro do
// Helmet (render-blocking). next/font faz self-host + preload automático.
export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-montserrat",
});

// Títulos decorativos (Title.js — camada outline + camada sólida).
// Preload ligado só nesta (é a que aparece no H1 acima da dobra).
export const britishRegular = localFont({
  src: "../assets/fonts/BritishRegular.woff2",
  display: "swap",
  variable: "--font-british",
  preload: true,
});

// Usada apenas em blocos decorativos abaixo da dobra — sem preload.
export const chunkyRosie = localFont({
  src: "../assets/fonts/ChunkyRosieDemo.woff2",
  display: "swap",
  variable: "--font-chunky-rosie",
  preload: false,
});
