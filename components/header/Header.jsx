"use client";

import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { Image } from "../layout/Image";
import Button from "../layout/Button";
import LocaleSwitcher from "../LocaleSwitcher";
import { usePopup } from "../../utils/PopupContext";
import { translateNavLink } from "../../i18n/navLinks";
import { color, media, hover } from "../style/style";

// Fusão de src/components/header/desktop/header.js e
// src/components/header/mobile/headerMobile.js (Gatsby) num único
// componente responsivo — ver Fase 3/Bug #12 do plano de migração: no
// original o breakpoint era decidido em runtime (useBreakpoint().md), o
// servidor renderizava sempre a árvore desktop e o cliente trocava para
// mobile depois de montar, causando layout shift e um duplo mount. Aqui as
// duas árvores existem sempre no HTML; só o CSS (media.l, 1024px — o mesmo
// limiar do antigo .md) decide qual aparece.
//
// SwipeableDrawer (MUI) + Div100vh foram substituídos por um drawer próprio
// em styled-components (100dvh nativo) — tirou duas dependências do bundle
// mobile sem mudar o comportamento visual.
export default function Header({ data }) {
  const locale = useLocale();
  const pathname = usePathname();

  const { handleOpenPopup, setIsMobileMenuOpen } = usePopup();

  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [menuItemsVisible, setMenuItemsVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    setIsMobileMenuOpen(open);
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, setIsMobileMenuOpen]);

  useEffect(() => {
    if (!open) {
      setMenuItemsVisible(false);
      return;
    }
    const timeout = setTimeout(() => setMenuItemsVisible(true), 100);
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const header = document.querySelector(".pizzarte-header");
      if (!header) return;

      if (currentScrollPos > header.offsetHeight) {
        setIsSticky(currentScrollPos <= prevScrollPos);
      } else {
        setIsSticky(false);
      }
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function isActive(link) {
    // translateNavLink já devolve o pathname com o prefixo de locale
    // aplicado (getPathname trata disso) — não voltar a prefixar aqui.
    const translated = translateNavLink(link, locale);
    return pathname === translated || pathname === translated + "/";
  }

  const homeHref = translateNavLink("/", locale);

  return (
    <HeaderStyled className={`pizzarte-header ${isSticky ? "sticky-header" : ""}`}>
      <div className="container-default flex bar">
        <button type="button" className="hamburger" aria-label="Abrir menu" onClick={() => setOpen(true)}>
          <Image src="Homepage/menu.svg" alt="" />
        </button>

        <a href={homeHref} className="logo-desktop">
          <Image src="Menu/logo.svg" alt="Pizzarte" priority />
        </a>
        <a href={homeHref} className="logo-mobile">
          <Image src="Menu/logo.svg" alt="Pizzarte" priority />
        </a>

        <div className="flex nav-area">
          <nav className="nav-list">
            {data.nav?.map((navItem, x) => (
              <div key={x} className="nav-container">
                <a href={translateNavLink(navItem.link, locale)} className={isActive(navItem.link) ? "nav active-nav" : "nav"}>
                  {navItem.name}
                </a>
                {navItem.submenu && (
                  <div className="submenu">
                    {navItem.submenu.map((subItem, j) => (
                      <a
                        key={j}
                        href={translateNavLink("/menu/" + subItem.slug, locale)}
                        className={isActive("/menu/" + subItem.slug) ? "nav-sub active-sub" : "nav-sub"}
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Button
            imageSrc="Homepage/shopping-cart-icon.svg"
            hoverImageSrc="Homepage/shopping-cart-icon-white.svg"
            button={data.callButton?.text}
            onClick={handleOpenPopup}
          />
          <LocaleSwitcher locale={locale} />
        </div>

        <div className="lang-mobile">
          <LocaleSwitcher locale={locale} />
        </div>
      </div>

      <Backdrop $open={open} onClick={() => setOpen(false)} />
      <Drawer $open={open} aria-hidden={!open}>
        <div className="container container-default">
          <div className="top">
            <button type="button" className="menu" aria-label="Fechar menu" onClick={() => setOpen(false)}>
              <Image src="Menu/close.svg" extraClass="logo" alt="" />
            </button>
            <a href={homeHref} className="left">
              <Image src="Menu/logo-white.svg" alt="Pizzarte" />
            </a>
            <div className="lang">
              <LocaleSwitcher locale={locale} />
            </div>
          </div>

          <nav className="middle">
            {menuItemsVisible &&
              data.nav?.map((navItem, x) => (
                <div key={x} className="nav-container">
                  <a
                    href={translateNavLink(navItem.link, locale)}
                    className={isActive(navItem.link) ? "nav active-nav" : "nav"}
                    onClick={() => setOpen(false)}
                  >
                    {navItem.name}
                  </a>
                </div>
              ))}
          </nav>

          <div className="btn-social">
            <Button
              imageSrc="Homepage/shopping-cart-icon-white.svg"
              hoverImageSrc="Homepage/shopping-cart-icon.svg"
              button={data.callButton?.text}
              onClick={() => {
                handleOpenPopup();
                setOpen(false);
              }}
              border
            />
            <div className="social">
              {data.footer?.social?.map((image, index) => (
                <a key={index} href={image.link} target="_blank" rel="noreferrer">
                  <Image src={image.src} alt={image.alt} />
                </a>
              ))}
            </div>
          </div>

          <div className="policy-texts">
            {data.footer?.info?.[0]?.items?.map((item, l) => (
              <a key={l} href={item.link}>
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </Drawer>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.header`
  padding: 29px 0;
  background: #ffffff;
  box-shadow: 0px 3px 6px #00000029;
  z-index: 99;
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s;

  .hamburger,
  .lang-mobile,
  .logo-mobile {
    display: none;
  }

  .bar {
    gap: 29px;
  }

  .logo-desktop img,
  .logo-mobile img {
    display: block;
  }

  .nav-area {
    gap: 29px;
  }

  .nav-list {
    display: flex;
    align-items: center;
    gap: 29px;
  }

  .nav-container {
    position: relative;

    &:focus-within {
      .submenu {
        display: block;
        width: max-content;
      }
    }

    ${hover`
      &:hover {
        .submenu {
          display: block;
          width: max-content;
        }
      }
    `}

    .nav {
      padding-bottom: 30%;
      font-weight: 600;
      text-transform: uppercase;
      transition: color 0.2s ease-in-out;

      ${hover`
        &:hover {
          color: ${color.red};
        }
      `}
    }

    .active-nav {
      font-family: var(--font-chunky-rosie);
    }

    .submenu {
      display: none;
      position: absolute;
      top: 30px;
      left: 0;
      background-color: #fff;
      z-index: 10;

      .nav-sub {
        display: block;
        text-decoration: none;
        padding: 10px 20px;
        text-transform: uppercase;
        transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;

        ${hover`
          &:hover {
            color: ${color.red};
            background-color: #f5f5f5;
          }
        `}
      }

      .active-sub {
        font-family: var(--font-chunky-rosie);
      }
    }
  }

  ${media.l`
    padding: 0;

    .hamburger {
      display: flex;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
    }

    .lang-mobile {
      display: flex;
    }

    .logo-mobile {
      display: block;
    }

    .logo-desktop {
      display: none;
    }

    .bar {
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
    }

    .nav-area {
      display: none;
    }
  `}
`;

const Backdrop = styled.div`
  display: none;

  ${(props) =>
    props.$open &&
    css`
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 98;
    `}
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100dvh;
  width: 100vw;
  background-color: ${color.red};
  color: #fff;
  z-index: 99;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;

  ${(props) =>
    props.$open &&
    css`
      transform: translateX(0);
    `}

  a {
    color: #fff;
  }

  .container {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .top {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .menu {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
    }
  }

  .middle {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 30px;
    font-size: 7vw;

    .nav {
      padding-bottom: 30%;
      font-weight: 600;
      text-transform: uppercase;
    }

    .active-nav {
      font-family: var(--font-chunky-rosie);
    }
  }

  .btn-social {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    .social {
      display: flex;
      gap: 34px;
    }
  }

  .policy-texts {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: 10px;
  }

  button {
    width: max-content;
  }
`;
