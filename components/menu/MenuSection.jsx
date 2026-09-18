"use client";

import styled from "styled-components";
import { useLocale } from "next-intl";
import Title from "../layout/Title";
import { Image } from "../layout/Image";
import Reveal from "../layout/Reveal";
import { translateNavLink } from "../../i18n/navLinks";
import { media, hover } from "../style/style";

// Fusão de menu/desktop/menuSection.js + menu/mobile/menuSectionMobile.js
// (a landing /menu, grelha de categorias). O link para cada categoria
// passa a usar translateNavLink (mesma correção do Bug #5 aplicada aqui:
// o original já traduzia via gatsby-plugin-translate-urls, next-intl
// substitui isso 1:1).
export default function MenuSection({ data }) {
  const locale = useLocale();

  return (
    <MenuSectionStyled>
      <div className="container-default">
        <Title text={data.pageTitle} />
        <div className="menu-section">
          {Array.isArray(data.menus) &&
            data.menus.map((item, index) => (
              <Reveal key={index}>
                <a href={translateNavLink("/menu" + item.slug, locale)}>
                  <ImageContainer>
                    <Image src={item.imageSection} alt={item.title} extraClass="section-image" sizes="100vw" />
                    <Overlay className="overlay">
                      <Text>{item.title}</Text>
                    </Overlay>
                  </ImageContainer>
                </a>
              </Reveal>
            ))}
        </div>
      </div>
    </MenuSectionStyled>
  );
}

const MenuSectionStyled = styled.div`
  .menu-section {
    display: flex;
    flex-direction: column;
    padding: 0;
  }

  ${media.l`
    margin-top: 20px;
  `}
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 10px;

  ${hover`
    &:hover h3 {
      opacity: 0;
    }
    &:hover .overlay {
      opacity: 0;
    }
  `}

  .section-image {
    width: 100%;
    height: auto;

    ${media.l`
      height: 25vh;
      object-fit: cover;
    `}
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
`;

const Text = styled.h3`
  color: white;
  font-size: 24px;
  transition: opacity 0.3s ease-in-out;
  text-transform: uppercase;
`;
