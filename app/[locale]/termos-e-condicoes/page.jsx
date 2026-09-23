import { getMessages, setRequestLocale } from "next-intl/server";
import { Seo } from "../../../components/Seo";
import PageShell from "../../../components/layout/PageShell";
import LegalDocument from "../../../components/legal/LegalDocument";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return Seo({ locale, namespace: "legal.termos.seo", pathname: "/termos-e-condicoes" });
}

export default async function TermosECondicoesPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <PageShell homeData={messages.home}>
      <LegalDocument data={messages.legal.termos} />
    </PageShell>
  );
}
