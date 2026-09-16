import { Suspense } from "react";
import { getMessages, setRequestLocale } from "next-intl/server";
import { SeoFromData } from "../../../components/Seo";
import PageShell from "../../../components/layout/PageShell";
import GalleryFilter from "../../../components/about/GalleryFilter";
import galleryData from "../../../content/gallery.json";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const seo = messages.pizzarte.seoGallery;
  return SeoFromData({ locale, title: seo.title, description: seo.description, image: seo.image, pathname: "/galeria" });
}

// Portado de src/pages/galeria.js. A galeria já não vem do WordPress em
// runtime (ver Fase 5 do plano de migração) — content/gallery.json é
// estático, gerado uma vez por scripts/fetch-gallery.mjs. `all` já não tem
// o bug dos índices [0],[1],[2] hardcoded do original (rebentava/omitia se
// as categorias do WP mudassem).
export default async function GaleriaPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  const galleries = { ...galleryData, all: Object.values(galleryData).flat() };

  return (
    <PageShell homeData={messages.home}>
      {/* useQueryState (nuqs) lê useSearchParams — precisa de Suspense para
          poder prerenderizar estaticamente (Next 16/PPR). */}
      <Suspense fallback={null}>
        <GalleryFilter galleries={galleries} filters={messages.pizzarte.filters} />
      </Suspense>
    </PageShell>
  );
}
