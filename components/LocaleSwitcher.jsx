"use client";

import styled from "styled-components";
import { useRouter as useNextRouter } from "next/navigation";
import { usePathname, useRouter, getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { color } from "./style/style";

// Portado de src/components/layout/languageSelector.js (Gatsby) — mesmo
// dropdown ao hover/focus (botão "PT ▾" + lista), mesma UX. `href` real e
// traduzido em cada link (crawlable, abre em novo separador com botão do
// meio) tal como o original, só a navegação client-side é que passa por
// next-intl em vez de gatsby-plugin-translate-urls.
//
// `alternatePaths`: só necessário em páginas de categoria de menu
// (/menu/[slug]), cujo slug traduzido depende dos dados (ver
// MENU_CATEGORY_SLUGS em i18n/routing.jsx) — passado pela própria página.
export default function LocaleSwitcher({ locale, alternatePaths }) {
  const router = useRouter();
  const nextRouter = useNextRouter();
  const pathname = usePathname();

  function hrefFor(nextLocale) {
    if (alternatePaths?.[nextLocale]) return alternatePaths[nextLocale];
    return getPathname({ href: pathname, locale: nextLocale });
  }

  // `alternatePaths` já vem com o locale/slug traduzido resolvido (ver
  // menu/[slug]/page.jsx) — navegar com o router do next-intl outra vez
  // duplicava o prefixo de locale (ex: /en/en/menu). Para esse caso usa-se
  // o router "cru" do Next; para as rotas estáticas (pathnames config)
  // passa-se o `pathname` interno (sem tradução) e deixa o next-intl traduzir.
  function goTo(e, nextLocale) {
    e.preventDefault();
    if (nextLocale === locale) return;
    if (alternatePaths?.[nextLocale]) {
      nextRouter.replace(alternatePaths[nextLocale]);
    } else {
      router.replace(pathname, { locale: nextLocale });
    }
  }

  return (
    <LanguageStyled>
      <button type="button" className="dropbtn">
        {locale} &#9660;
      </button>

      <div className="dropdown-content">
        {routing.locales.map((lng) => (
          <a key={lng} href={hrefFor(lng)} onClick={(e) => goTo(e, lng)}>
            {lng}
          </a>
        ))}
      </div>
    </LanguageStyled>
  );
}

const LanguageStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;

  .dropbtn {
    text-transform: uppercase;
    background: none;
    outline: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    color: ${color.red};
    transition: opacity 0.2s ease-in-out;
  }

  &:hover .dropbtn,
  &:focus-within .dropbtn {
    opacity: 0.7;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 100%;
    width: max-content;
    background: #fff;
    padding-bottom: 15px;
    color: ${color.red};
    font-size: 12px;
    text-align: center;
  }

  .dropdown-content a {
    display: block;
    margin: 0;
    padding: 8px 13px;
    white-space: nowrap;
    text-align: center;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;

    &:hover {
      color: #fff;
      background-color: ${color.red};
    }
  }

  &:hover .dropdown-content,
  &:focus-within .dropdown-content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
`;
