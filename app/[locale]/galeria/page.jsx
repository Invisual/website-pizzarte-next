import { Suspense } from "react";
import { getMessages, setRequestLocale } from "next-intl/server";
import { SeoFromData } from "../../../components/Seo";
import { buildImageGallerySchema } from "../../../lib/jsonld";
import PageShell from "../../../components/layout/PageShell";
import Title from "../../../components/layout/Title";
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
  const content = messages.pizzarte.gallery;
  const seo = messages.pizzarte.seoGallery;
  const gallerySchema = buildImageGallerySchema(galleries.all, { locale, name: seo.title, description: seo.description });

  return (
    <PageShell homeData={messages.home}>
      {/* schema.org/ImageGallery com as 30 fotos — sinal estruturado extra
          para GEO/AIO, além do global Restaurant/WebSite do layout. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />
      {/* O h1 fica aqui, fora do Suspense — GalleryFilter usa useQueryState
          (nuqs → useSearchParams), que força o Suspense abaixo a renderizar
          fallback={null} no HTML estático (PPR). Um heading dentro dele só
          apareceria depois de hidratar no cliente. */}
      <div className="container-default">
        <Title text={content?.title} question={content?.question} level="h1" />
      </div>
      <Suspense fallback={null}>
        <GalleryFilter galleries={galleries} filters={messages.pizzarte.filters} />
      </Suspense>
    </PageShell>
  );
}
