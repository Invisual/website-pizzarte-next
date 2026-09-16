import { notFound } from "next/navigation";
import MenuConfigClient from "../../../../../lib/MenuConfigClient";
import { SeoFromData } from "../../../../../components/Seo";
import { getCachedMessages } from "../../../../../lib/cache";
import { buildServiceSchema, buildBreadcrumbSchema, buildFaqSchema } from "../../../../../lib/jsonld";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";

export async function generateMetadata({ params }) {
  const { locale, slug, subpage } = await params;

  const messages = await getCachedMessages(locale);
  const services = messages.projects.projetos.all;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Not found" };

  const subPageData = service.subpages?.find((sp) => sp.slug === subpage);
  if (!subPageData) return { title: "Not found" };

  const otherLocale = locale === "pt" ? "en" : "pt";
  const messagesOther = await getCachedMessages(otherLocale);
  const otherService = messagesOther.projects.projetos.all.find(
    (s) => s.id === service.id
  );
  const otherSlug = otherService?.slug ?? slug;
  const otherSubPage = otherService?.subpages?.find(
    (sp) => sp.id === subPageData.id
  );
  const otherSubSlug = otherSubPage?.slug ?? subpage;

  return SeoFromData({
    locale,
    title: subPageData.seo.title,
    description: subPageData.seo.description,
    pathname:
      locale === "pt"
        ? `/servicos/${slug}/${subpage}`
        : `/services/${slug}/${subpage}`,
    image: subPageData.seo.image || null,
    alternatePaths: {
      pt:
        locale === "pt"
          ? `/servicos/${slug}/${subpage}`
          : `/servicos/${otherSlug}/${otherSubSlug}`,
      en:
        locale === "en"
          ? `/services/${slug}/${subpage}`
          : `/services/${otherSlug}/${otherSubSlug}`,
    },
  });
}

export default async function ServiceSubPage({ params }) {
  const { locale, slug, subpage } = await params;

  const messages = await getCachedMessages(locale);
  const services = messages.projects.projetos.all;

  const service = services.find((s) => s.slug === slug);

  const subPageData = service.subpages?.find((sp) => sp.slug === subpage);

  // 🔥 procurar versão do outro idioma
  const otherLocale = locale === "pt" ? "en" : "pt";
  const messagesOther = await getCachedMessages(otherLocale);
  const otherServices = messagesOther.projects.projetos.all;

  const otherService = otherServices.find((s) => s.id === service.id);
  const otherSlug = otherService?.slug;

  const otherSubPage = otherService?.subpages?.find(
    (sp) => sp.id === subPageData.id
  );
  const otherSubSlug = otherSubPage?.slug;

  const servicesUrl = `${BASE_URL}${locale === "pt" ? "/servicos" : "/en/services"}`;
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: locale === "pt" ? "Início" : "Home", item: BASE_URL },
    { name: locale === "pt" ? "Serviços" : "Services", item: servicesUrl },
    { name: service.seo.title, item: `${servicesUrl}/${slug}` },
    { name: subPageData.seo.title, item: `${servicesUrl}/${slug}/${subpage}` },
  ]);

  const serviceJsonLd = buildServiceSchema(service, slug, locale);
  const faqJsonLd = subPageData.faq?.length ? buildFaqSchema(subPageData.faq) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <MenuConfigClient
        uris={{
          pt:
            locale === "pt"
              ? `/servicos/${slug}/${subpage}`
              : otherSlug && otherSubSlug
                ? `/servicos/${otherSlug}/${otherSubSlug}`
                : null,

          en:
            locale === "en"
              ? `/services/${slug}/${subpage}`
              : otherSlug && otherSubSlug
                ? `/services/${otherSlug}/${otherSubSlug}`
                : null,
        }}
      />

      <h1>{service.seo.title}</h1>
      <h2>{subPageData.seo.title}</h2>
      <p>{subPageData.seo.description}</p>
    </>
  );
}
