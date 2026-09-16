import { getMessages, setRequestLocale } from "next-intl/server";
import { Seo } from "../../../components/Seo";
import { buildFaqSchema } from "../../../lib/jsonld";
import PageShell from "../../../components/layout/PageShell";
import ContactInfo from "../../../components/contact/ContactInfo";
import Waiting from "../../../components/animation/Waiting";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return Seo({ locale, namespace: "contact.seo", pathname: "/contactos" });
}

// Perguntas fixas por idioma (não há FAQ dedicado no conteúdo original) —
// as respostas usam sempre dados reais já existentes em messages/*/home.json
// e contact.json (horário, morada, política de reservas), nunca inventados.
const FAQ_QUESTIONS = {
  pt: { hours: "Qual o horário da Pizzarte?", reservation: "Como faço uma reserva?", address: "Qual a morada da Pizzarte?" },
  en: { hours: "What are Pizzarte's opening hours?", reservation: "How do I make a reservation?", address: "What is Pizzarte's address?" },
  fr: { hours: "Quels sont les horaires de la Pizzarte ?", reservation: "Comment réserver une table ?", address: "Quelle est l'adresse de la Pizzarte ?" },
  es: { hours: "¿Cuál es el horario de Pizzarte?", reservation: "¿Cómo hago una reserva?", address: "¿Cuál es la dirección de Pizzarte?" },
};

// Portado de src/pages/contactos.js. O feed do Instagram não é migrado —
// o componente original já estava morto (getInstaFeed comentado, `feedList`
// sempre []), renderizava um bloco sempre vazio.
export default async function ContactosPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const info = messages.contact.contactInfo;
  const hoursItems = messages.home.footer.info[2].items;
  const questions = FAQ_QUESTIONS[locale] || FAQ_QUESTIONS.pt;

  const faqSchema = buildFaqSchema([
    { question: questions.hours, answer: hoursItems.map((i) => i.text).join(". ") },
    { question: questions.reservation, answer: `${info.reservationTitle} ${info.phone}` },
    { question: questions.address, answer: `${info.address}, ${info.postalCode}` },
  ]);

  return (
    <PageShell homeData={messages.home}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ContactInfo data={messages.contact} />
      <Waiting NoAnimation data={messages.home.waiting} />
    </PageShell>
  );
}
