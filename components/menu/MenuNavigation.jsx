"use client";

import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Title from "../layout/Title";
import MobileFilterDropdown from "../layout/MobileFilterDropdown";
import { translateNavLink } from "../../i18n/navLinks";
import { media, breakpoint } from "../style/style";

// Fusão de menu/desktop/menuNavegation.js + .../mobile/menuNavegationMobile.js.
// AniLink (gatsby-plugin-transition-link) saiu — sem equivalente direto no
// App Router; a navegação passa a ser um <a> normal.
// Bug #7 corrigido: a versão mobile tinha o título fixo "o nosso menu",
// ignorando a prop `dataTitle` — nunca traduzia nos outros 3 idiomas.
export default function MenuNavigation({ data, dataTitle }) {
  const locale = useLocale();
  const pathname = usePathname();

  const items = data.map((item) => {
    const href = translateNavLink("/menu" + item.slug, locale);
    const isCurrentPage = pathname === href || pathname === href + "/";
    return { ...item, href, isCurrentPage };
  });
  const activeItem = items.find((item) => item.isCurrentPage);

  return (
    <MenuStyled>
      <div className="container-default">
        <Title text={dataTitle} />
        <nav className="menu">
          {items.map((item) => (
            <StyledLink key={item.slug} href={item.href} $isCurrentPage={item.isCurrentPage}>
              {item.title}
            </StyledLink>
          ))}
        </nav>
        <MobileFilterDropdown activeLabel={activeItem?.title}>
          {items.map((item) => (
            <a key={item.slug} href={item.href} className={item.isCurrentPage ? "active" : undefined}>
              {item.title}
            </a>
          ))}
        </MobileFilterDropdown>
      </div>
    </MenuStyled>
  );
}

const MenuStyled = styled.div`
  .container-default {
    padding: 253px 0 0 0;
  }

  .menu {
    display: flex;
    gap: 1rem;
    position: relative;
    flex-wrap: wrap;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: rgba(255, 0, 0, 0.3);
      bottom: 0;
      left: 0;
    }
  }

  ${media.l`
    .container-default {
      padding: 150px 0 0 0;
    }

    .menu {
      display: none;
    }
  `}
`;

const StyledLink = styled.a`
  position: relative;
  text-decoration: none;
  padding-bottom: 1.5rem;
  color: #000;
  text-transform: capitalize;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
  }

  ${(props) =>
    props.$isCurrentPage &&
    `
    font-weight: 600;

    &::after {
      background-color: red;
    }
  `}

  ${(props) =>
    !props.$isCurrentPage &&
    `
    @media screen and (min-width: ${breakpoint.l}) and (hover: hover) {
      transition: color 0.3s ease;

      &::after {
        background-color: #ff0000;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
      }

      &:hover {
        color: #ff0000;

        &::after {
          transform: scaleX(1);
        }
      }
    }
  `}
`;
