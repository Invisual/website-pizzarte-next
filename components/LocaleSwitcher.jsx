"use client";

import styled from "styled-components";
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
  const pathname = usePathname();

  function hrefFor(nextLocale) {
    if (alternatePaths?.[nextLocale]) return alternatePaths[nextLocale];
    return getPathname({ href: pathname, locale: nextLocale });
  }

  function goTo(e, nextLocale) {
    e.preventDefault();
    if (nextLocale === locale) return;
    router.replace(hrefFor(nextLocale), { locale: nextLocale });
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
    color: ${color.red};
  }

  .dropdown-content {
    display: none;
    position: absolute;
    top: 12px;
    transform: translate(-17%, 0);
    background: #fff;
    padding-bottom: 15px;
    color: ${color.red};
  }

  .dropdown-content a {
    display: block;
    margin: 0;
    padding: 13px;
    height: 0;
  }

  &:hover .dropdown-content,
  &:focus-within .dropdown-content {
    display: flex;
    flex-direction: column;
  }
`;
