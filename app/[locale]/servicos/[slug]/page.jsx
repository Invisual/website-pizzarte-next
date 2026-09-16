import { notFound } from "next/navigation";
import Link from "next/link";
import MenuConfigClient from "../../../../lib/MenuConfigClient";
import { SeoFromData } from "../../../../components/Seo";
import { getCachedMessages } from "../../../../lib/cache";
import { buildServiceSchema, buildBreadcrumbSchema } from "../../../../lib/jsonld";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;

    const messages = await getCachedMessages(locale);
    const services = messages.projects.projetos.all;
    const service = services.find((s) => s.slug === slug);

    if (!service) return { title: "Not found" };

    const otherLocale = locale === "pt" ? "en" : "pt";
    const messagesOther = await getCachedMessages(otherLocale);
    const otherService = messagesOther.projects.projetos.all.find(
        (s) => s.id === service.id
    );
    const otherSlug = otherService?.slug ?? slug;

    return SeoFromData({
        locale,
        title: service.seo.title,
        description: service.seo.description,
        pathname: locale === "pt" ? `/servicos/${slug}` : `/services/${slug}`,
        image: service.seo.image || null,
        alternatePaths: {
            pt: locale === "pt" ? `/servicos/${slug}` : `/servicos/${otherSlug}`,
            en: locale === "en" ? `/services/${slug}` : `/services/${otherSlug}`,
        },
    });
}

export default async function ProjectPage({ params }) {
    const { locale, slug } = await params;

    const messages = await getCachedMessages(locale);
    const services = messages.projects.projetos.all;

    const service = services.find((s) => s.slug === slug);
    if (!service) notFound();

    // 🔥 procurar slug no outro idioma
    const otherLocale = locale === "pt" ? "en" : "pt";
    const messagesOther = await getCachedMessages(otherLocale);
    const otherServices = messagesOther.projects.projetos.all;

    const otherService = otherServices.find((s) => s.id === service.id);
    const otherSlug = otherService?.slug;


    const servicesUrl = `${BASE_URL}${locale === "pt" ? "/servicos" : "/en/services"}`;
    const breadcrumbJsonLd = buildBreadcrumbSchema([
      { name: locale === "pt" ? "Início" : "Home", item: BASE_URL },
      { name: locale === "pt" ? "Serviços" : "Services", item: servicesUrl },
      { name: service.seo.title, item: `${servicesUrl}/${slug}` },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(service, slug, locale)) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
            <MenuConfigClient
                uris={{
                    pt:
                        locale === "pt"
                            ? `/servicos/${slug}`
                            : otherSlug
                                ? `/servicos/${otherSlug}`
                                : null,

                    en:
                        locale === "en"
                            ? `/services/${slug}`
                            : otherSlug
                                ? `/services/${otherSlug}`
                                : null,
                }}
            />

            <h1>{service.seo.title}</h1>
            <p>{service.seo.description}</p>

            <ul>
                {service.subpages?.map((sub, index) => (
                    <li key={index}>
                        <Link href={`/servicos/${service.slug}/${sub.slug}`}>
                            {sub.seo.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
