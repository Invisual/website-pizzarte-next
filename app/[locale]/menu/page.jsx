import { getMessages, setRequestLocale } from "next-intl/server";
import { SeoFromData } from "../../../components/Seo";
import { buildMenuSchema } from "../../../lib/jsonld";
import PageShell from "../../../components/layout/PageShell";
import MenuSection from "../../../components/menu/MenuSection";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const seo = messages.pizzarte.seoMenu;
  return SeoFromData({ locale, title: seo.title, description: seo.description, image: seo.image, pathname: "/menu" });
}

export default async function MenuPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const menuSchema = buildMenuSchema(messages.menu.menus, locale);

  return (
    <PageShell homeData={messages.home}>
      {/* schema.org/Menu com a ementa completa — o maior ganho de GEO do
          projeto (ver Fase 7 do plano de migração): torna toda a lista de
          pratos/preços legível por motores generativos. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }} />
      <MenuSection data={messages.menu} />
    </PageShell>
  );
}
