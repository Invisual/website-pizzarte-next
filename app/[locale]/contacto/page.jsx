import { setRequestLocale } from "next-intl/server";
import { Seo } from "../../../components/Seo";
import MenuConfigClient from "../../../lib/MenuConfigClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return Seo({
    locale,
    namespace: "home.contacto.seo",
    pathname: locale === "pt" ? "/contacto" : "/contact",
    alternatePaths: { pt: "/contacto", en: "/contact" },
  });
}

export default async function ContactoPage({ params }) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <>
      <MenuConfigClient
        uris={{
          pt: "/contacto",
          en: "/contact",
        }}
      />

      <main>
        <h1>{locale === "pt" ? "Contacto" : "Contact"}</h1>
      </main>
    </>
  );
}
