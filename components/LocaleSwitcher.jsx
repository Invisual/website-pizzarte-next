"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useMenuConfig } from "../utils/menuProvider";

function stripLocalePrefix(pathname = "") {
  const result = pathname.replace(/^\/(pt|en)(?=\/|$)/, "") || "/";
  return result;
}

export default function LocaleSwitcher({ locale }) {
  const router = useRouter();
  const pathname = usePathname(); // ✅ importante
  const { menuConfig } = useMenuConfig();

  const languages = [
    { id: "pt", label: "PT" },
    { id: "en", label: "EN" },
  ];

  useEffect(() => { }, [locale, pathname]);

  function handleChange(nextLocale) {
    // caso especial: slugs traduzidos
    if (menuConfig?.uris?.[nextLocale]) {
      router.replace(menuConfig.uris[nextLocale], { locale: nextLocale });
      return;
    }

    // caso normal: rotas automáticas do next-intl
    const pathnameForRouter = stripLocalePrefix(pathname);
    router.replace(pathnameForRouter, { locale: nextLocale });
  }

  return (
    <>
      {languages.map((lngOption, i) => (
        <div key={i} className={`container-option-${i}`}>
          <button
            type="button"
            onClick={() => handleChange(lngOption.id)}
            disabled={locale === lngOption.id}
            className={
              locale === lngOption.id
                ? "selected black fs-4 text-uppercase KLight"
                : "black option fs-4 text-uppercase KLight"
            }
          >
            <p className="fs-4 text-uppercase KLight">{lngOption.label}</p>
          </button>
        </div>
      ))}
    </>
  );
}