import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["pt", "en"],
    defaultLocale: "pt",
    localePrefix: "as-needed",
    pathnames: {
        "/": "/",
        "/sobre-nos": {
            pt: "/sobre-nos",
            en: "/about",
        },
        "/noticias": {
            pt: "/noticias",
            en: "/news",
        },
        "/noticias/[slug]": {
            pt: "/noticias/[slug]",
            en: "/news/[slug]",
        },
        "/servicos": {
            pt: "/servicos",
            en: "/services",
        },
        "/servicos/[slug]": {
            pt: "/servicos/[slug]",
            en: "/services/[slug]",
        },
        "/servicos/[slug]/[subpage]": {
            pt: "/servicos/[slug]/[subpage]",
            en: "/services/[slug]/[subpage]",
        },
        "/contacto": {
            pt: "/contacto",
            en: "/contact",
        },
        "/politica-de-privacidade": {
            pt: "/politica-de-privacidade",
            en: "/privacy-policy",
        },

    },
});