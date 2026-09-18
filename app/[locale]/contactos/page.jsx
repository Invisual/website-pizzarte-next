import { getMessages, setRequestLocale } from "next-intl/server";
import { Seo } from "../../../components/Seo";
import { buildFaqSchema } from "../../../lib/jsonld";
import PageShell from "../../../components/layout/PageShell";
import ContactInfo from "../../../components/contact/ContactInfo";
import Faq from "../../../components/contact/Faq";
import Waiting from "../../../components/animation/Waiting";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return Seo({ locale, namespace: "contact.seo", pathname: "/contactos" });
}

// Portado de src/pages/contactos.js. O feed do Instagram não é migrado —
// o componente original já estava morto (getInstaFeed comentado, `feedList`
// sempre []), renderizava um bloco sempre vazio.
export default async function ContactosPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const faq = messages.contact.faq;

  // buildFaqSchema lê o mesmo array que <Faq> renderiza (contact.faq.items)
  // — schema e página nunca podem divergir (ver comentário em Faq.jsx).
  const faqSchema = buildFaqSchema(faq.items);

  return (
    <PageShell homeData={messages.home}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ContactInfo data={messages.contact} />
      <Faq data={faq} />
      <Waiting NoAnimation data={messages.home.waiting} />
    </PageShell>
  );
}
