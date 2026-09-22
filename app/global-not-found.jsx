// global-not-found.js "bypassa" a app inteira (não passa por
// app/layout.jsx nem app/[locale]/layout.jsx) — por isso importa aqui
// diretamente o que precisa (globals.css, fontes) e não recebe params:
// não há como saber que locale o visitante queria (a própria rota nunca
// chegou a resolver-se). Mostra sempre em PT (idioma por omissão do site).
// Ver app/[locale]/not-found.jsx para o caso "dentro de um locale válido,
// mas a página não existe" (esse sim sabe o idioma).
import "./globals.css";
import { montserrat } from "./fonts";
import NotFoundContent from "../components/layout/NotFoundContent";

export const metadata = {
  title: "Página não encontrada — Pizzarte",
  description: "A página que procura não existe.",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="pt" className={montserrat.variable}>
      <head>
        <link rel="preload" href="/fonts/BritishRegular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <NotFoundContent locale="pt" />
      </body>
    </html>
  );
}
