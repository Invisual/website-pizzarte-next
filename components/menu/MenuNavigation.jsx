"use client";

import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Title from "../layout/Title";
import { translateNavLink } from "../../i18n/navLinks";
import { media } from "../style/style";

// Fusão de menu/desktop/menuNavegation.js + .../mobile/menuNavegationMobile.js.
// AniLink (gatsby-plugin-transition-link) saiu — sem equivalente direto no
// App Router; a navegação passa a ser um <a> normal.
// Bug #7 corrigido: a versão mobile tinha o título fixo "o nosso menu",
// ignorando a prop `dataTitle` — nunca traduzia nos outros 3 idiomas.
export default function MenuNavigation({ data, dataTitle }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <MenuStyled>
      <div className="container-default">
        <Title text={dataTitle} />
        <nav className="menu">
          {data.map((item) => {
            const href = translateNavLink("/menu" + item.slug, locale);
            const isCurrentPage = pathname === href || pathname === href + "/";
            return (
              <StyledLink key={item.slug} href={href} $isCurrentPage={isCurrentPage}>
                {item.title}
              </StyledLink>
            );
          })}
        </nav>
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
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      width: max-content;
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
`;
