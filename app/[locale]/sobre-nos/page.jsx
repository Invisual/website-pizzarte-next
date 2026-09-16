import { setRequestLocale } from "next-intl/server";
import { Seo } from "../../../components/Seo";
import MenuConfigClient from "../../../lib/MenuConfigClient";
import { buildPersonSchema } from "../../../lib/jsonld";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return Seo({
    locale,
    namespace: "home.sobre.seo",
    pathname: locale === "pt" ? "/sobre-nos" : "/about",
    alternatePaths: { pt: "/sobre-nos", en: "/about" },
  });
}

export default async function SobreNosPage({ params }) {
  const { locale } = await params;

  setRequestLocale(locale);

  // Adicionar membros da equipa aqui quando disponíveis.
  // Exemplo de estrutura esperada por buildPersonSchema:
  // const team = [
  //   { name: "Nome", role: "Cargo", url: "/sobre-nos#nome", photo: "/equipa/foto.jpg", social: ["https://linkedin.com/in/nome"], expertise: ["Imobiliário"] }
  // ];

  return (
    <>
      {/* Schemas Person injetados por membro quando a equipa estiver definida */}
      {/* {team.map((person) => (
        <script key={person.name} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonSchema(person)) }} />
      ))} */}

      <MenuConfigClient
        uris={{
          pt: "/sobre-nos",
          en: "/about",
        }}
      />

      <main>
        <h1>{locale === "pt" ? "Sobre Nós" : "About Us"}</h1>
      </main>
    </>
  );
}
