import Link from "next/link";
import { color } from "../style/style";
import { Image } from "./Image";

const COPY = {
  pt: { title: "PÁGINA NÃO ENCONTRADA", button: "voltar" },
  en: { title: "PAGE NOT FOUND", button: "back home" },
  fr: { title: "PAGE INTROUVABLE", button: "retour" },
  es: { title: "PÁGINA NO ENCONTRADA", button: "volver" },
};

// Conteúdo do 404, portado de src/pages/404.js (Gatsby). Partilhado entre
// app/[locale]/not-found.jsx (quando um notFound() é chamado dentro de um
// locale já resolvido — sabe a língua) e app/global-not-found.jsx (URLs que
// não batem em nenhuma rota — Next não sabe o locale, ver o próprio ficheiro).
export default function NotFoundContent({ locale = "pt" }) {
  const copy = COPY[locale] || COPY.pt;
  const homeHref = locale === "pt" ? "/" : `/${locale}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: color.red,
        position: "relative",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
      }}
    >
      <Image src="404-error/1.png" alt="" style={{ gridColumn: "10 / 12", gridRow: "1 / 2", width: "80%", height: "auto" }} />
      <Image src="404-error/2.png" alt="" style={{ gridColumn: "2 / 4", gridRow: "1 / 2", width: "80%", height: "auto" }} />
      <Image src="404-error/3.png" alt="" style={{ gridColumn: "4 / 6", gridRow: "2 / 2", width: "80%", height: "auto" }} />
      <Image src="404-error/4.png" alt="" style={{ gridColumn: "8 / 10", gridRow: "4 / 4", width: "80%", height: "auto" }} />
      <Image src="404-error/5.png" alt="" style={{ gridColumn: "2 / 5", gridRow: "3 / 5", width: "80%", height: "auto" }} />

      <div
        style={{
          position: "absolute",
          top: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          color: "#fff",
          padding: "100px 0",
          textAlign: "center",
        }}
      >
        <Image src="Menu/logo-white.svg" alt="Pizzarte" style={{ width: 200, height: "auto" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 style={{ fontSize: "13vw", margin: 0, fontFamily: "var(--font-british)", fontWeight: 100 }}>404</h1>
          <h5 style={{ fontSize: "6vw", margin: 0, fontFamily: "var(--font-british)", fontWeight: 100 }}>{copy.title}</h5>
        </div>
        <Link
          href={homeHref}
          style={{
            marginTop: 24,
            border: "1px solid #fff",
            borderRadius: 34,
            padding: "7px 20px",
            color: "#fff",
            textDecoration: "none",
            textTransform: "uppercase",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {copy.button}
        </Link>
      </div>
    </div>
  );
}
