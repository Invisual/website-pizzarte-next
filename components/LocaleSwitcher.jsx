"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter as useNextRouter } from "next/navigation";
import { usePathname, useRouter, getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { color, hover } from "./style/style";

// Portado de src/components/layout/languageSelector.js (Gatsby), mas
// trocado de hover/focus para click (mesmo padrão de
// components/layout/MobileFilterDropdown.jsx): abre/fecha no mesmo botão,
// fecha ao clicar fora. `href` real e traduzido em cada link (crawlable,
// abre em novo separador com botão do meio) tal como o original, só a
// navegação client-side é que passa por next-intl em vez de
// gatsby-plugin-translate-urls.
//
// `alternatePaths`: só necessário em páginas de categoria de menu
// (/menu/[slug]), cujo slug traduzido depende dos dados (ver
// MENU_CATEGORY_SLUGS em i18n/routing.jsx) — passado pela própria página.
export default function LocaleSwitcher({ locale, alternatePaths }) {
  const router = useRouter();
  const nextRouter = useNextRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

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
    setOpen(false);
    if (nextLocale === locale) return;
    if (alternatePaths?.[nextLocale]) {
      nextRouter.replace(alternatePaths[nextLocale]);
    } else {
      router.replace(pathname, { locale: nextLocale });
    }
  }

  return (
    <LanguageStyled ref={ref}>
      <button
        type="button"
        className="dropbtn"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{locale}</span>
        <span className="chevron" aria-hidden="true">
          &#9660;
        </span>
      </button>

      {open && (
        <div className="dropdown-content">
          <div className="dropdown-card" role="listbox">
            {routing.locales.map((lng) => (
              <a
                key={lng}
                href={hrefFor(lng)}
                onClick={(e) => goTo(e, lng)}
                className={lng === locale ? "active" : undefined}
              >
                {lng}
              </a>
            ))}
          </div>
        </div>
      )}
    </LanguageStyled>
  );
}

const LanguageStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 3;
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
    gap: 6px;
    font-size: 12px;
    color: ${color.red};
    transition: opacity 0.2s ease-in-out;

    .chevron {
      font-size: 8px;
      transition: transform 0.2s ease-in-out;
    }

    &[aria-expanded="true"] {
      opacity: 0.7;

      .chevron {
        transform: rotate(180deg);
      }
    }
  }

  ${hover`
    .dropbtn:hover {
      opacity: 0.7;
    }
  `}

  .dropdown-content {
    position: absolute;
    top: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    color: ${color.red};
    font-size: 12px;
    text-align: center;
  }

  .dropdown-card {
    display: flex;
    flex-direction: column;
    min-width: 64px;
    width: max-content;
    background: #fff;
    border-radius: var(--border-radius);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .dropdown-content a {
    display: block;
    padding: 10px 16px;
    white-space: nowrap;
    text-align: center;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  }

  .dropdown-content a.active {
    background-color: rgba(255, 0, 0, 0.06);
  }

  ${hover`
    .dropdown-content a:hover {
      color: #fff;
      background-color: ${color.red};
    }
  `}
`;
