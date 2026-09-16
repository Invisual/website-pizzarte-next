import { getMessages, setRequestLocale } from "next-intl/server";
import { SeoFromData } from "../../../components/Seo";
import PageShell from "../../../components/layout/PageShell";
import PizzarteInfo from "../../../components/about/PizzarteInfo";
import AboutIntro from "../../../components/about/AboutIntro";
import OurSpace from "../../../components/about/OurSpace";
import ChessIntro from "../../../components/chess/ChessIntro";

// Bug de SEO corrigido: o Gatsby usava o SEO da homepage nesta página
// (`t("home").seo`), ignorando pizzarte.json.seo que já existia — título e
// descrição ficavam duplicados entre / e /pizzarte.
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const seo = messages.pizzarte.seo;
  return SeoFromData({ locale, title: seo.title, description: seo.description, image: seo.image, pathname: "/pizzarte" });
}

export default async function PizzartePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <PageShell homeData={messages.home}>
      <PizzarteInfo data={messages.pizzarte.info} />
      <AboutIntro data={messages.pizzarte.ourSpace} />
      <OurSpace />
      <ChessIntro data={messages.pizzarte.chessIntro} />
    </PageShell>
  );
}
