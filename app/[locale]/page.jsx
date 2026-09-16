import { getMessages, setRequestLocale } from "next-intl/server";
import { Seo } from "../../components/Seo";
import PageShell from "../../components/layout/PageShell";
import HeroBanner from "../../components/layout/HeroBanner";
import PizzaEffect from "../../components/animation/PizzaEffect";
import AboutIntro from "../../components/about/AboutIntro";
import FoodSlider from "../../components/about/FoodSlider";
import BarDrinks from "../../components/about/BarDrinks";
import Waiting from "../../components/animation/Waiting";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return Seo({ locale, namespace: "home.seo", pathname: "/" });
}

// Portado de src/pages/index.js (Gatsby). A árvore desktop/mobile fundiu-se
// nos próprios componentes (Fase 3) — esta página já não escolhe nada em
// runtime, só passa dados.
export default async function HomePage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const homeData = messages.home;

  return (
    <PageShell homeData={homeData} home>
      <HeroBanner desktopSrc="Homepage/banner/_MG_7941.webp" mobileSrc="Homepage/banner/banner-mobile.webp" alt="Pizzarte" />
      <PizzaEffect data={homeData} />
      <AboutIntro data={homeData.aboutIntro} home />
      <FoodSlider data={homeData} />
      <BarDrinks data={homeData} />
      <Waiting home data={homeData.waiting} />
    </PageShell>
  );
}
