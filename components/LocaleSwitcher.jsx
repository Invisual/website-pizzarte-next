"use client";

import { usePathname, useRouter } from "@/i18n/navigation";

const LANGUAGES = [
  { id: "pt", label: "PT" },
  { id: "en", label: "EN" },
  { id: "fr", label: "FR" },
  { id: "es", label: "ES" },
];

// `alternatePaths`: só necessário em páginas de categoria de menu
// (/menu/[slug]), cujo slug traduzido não é um padrão estático — vem de
// MENU_CATEGORY_SLUGS (i18n/routing.jsx) e é passado pela própria página.
// Nas restantes rotas, o `pathname` interno do next-intl já é suficiente:
// o mapa `pathnames` em i18n/routing.jsx trata da tradução sozinho.
export default function LocaleSwitcher({ locale, alternatePaths }) {
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(nextLocale) {
    if (nextLocale === locale) return;
    if (alternatePaths?.[nextLocale]) {
      router.replace(alternatePaths[nextLocale], { locale: nextLocale });
      return;
    }
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <>
      {LANGUAGES.map((lng) => (
        <button
          key={lng.id}
          type="button"
          onClick={() => handleChange(lng.id)}
          disabled={locale === lng.id}
          aria-current={locale === lng.id ? "true" : undefined}
          className={locale === lng.id ? "selected black fs-4 text-uppercase KLight" : "black option fs-4 text-uppercase KLight"}
        >
          <p className="fs-4 text-uppercase KLight">{lng.label}</p>
        </button>
      ))}
    </>
  );
}
