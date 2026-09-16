
import { setRequestLocale } from "next-intl/server";
import { Seo } from "../../../components/Seo";
import Link from "next/link";
import MenuConfigClient from "../../../lib/MenuConfigClient";
import { getCachedMessages } from "../../../lib/cache";

export async function generateMetadata({ params }) {
    const { locale } = await params;

    return Seo({
        locale,
        namespace: "projects.projetos.seo",
        pathname: locale === "pt" ? "/servicos" : "/services",
        alternatePaths: { pt: "/servicos", en: "/services" },
    });
}

export default async function ServicesPage({ params }) {
    const { locale } = await params;

    setRequestLocale(locale);

    const messages = await getCachedMessages(locale);
    const dataProjects = messages.projects.projetos;



    return (

        <>
            <MenuConfigClient uris={null} />
            <div
                style={{ display: "flex", justifyContent: "center" }}
            >

                {dataProjects.all.map((service) => (
                    <div key={service.id}>
                        <Link href={`/servicos/${service.slug}`}>
                            {service.seo.title}
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}
