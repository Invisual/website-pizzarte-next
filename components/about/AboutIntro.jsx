import styled from "styled-components";
import { useLocale } from "next-intl";
import { Image } from "../layout/Image";
import { color, media } from "../style/style";
import Title from "../layout/Title";
import Button from "../layout/Button";
import Reveal from "../layout/Reveal";
import { translateNavLink } from "../../i18n/navLinks";

// Fusão de about/desktop/aboutIntro.js + about/mobile/aboutIntroMobile.js.
// O empilhamento desktop→mobile já vem de graça do CSS global
// (.grid-default passa de grid 12 colunas a flex-column em ≤1199px — ver
// app/globals.css); aqui só ficam os ajustes finos de espaçamento/posição.
// Bug #5 (repetido): data.link ("/pizzarte" na home, "/contactos" na
// página /pizzarte) ia direto para o Button, sem tradução de locale.
export default function AboutIntro({ data, home }) {
  const locale = useLocale();

  return (
    <AboutIntroStyled>
      <Reveal>
        <div className="container-default">
          <div className="container grid-default">
            <div className="textContainer">
              <Title text={data?.title} />
              <div className="text">
                <p dangerouslySetInnerHTML={{ __html: data?.text }} />
              </div>
              <Button to={data?.link ? translateNavLink(data.link, locale) : undefined} button={data?.button} />
            </div>
            <ImageContainer>
              <Image
                src={data?.image}
                alt=""
                extraClass="fill-image"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
              {home && <DecorativeCircle />}
            </ImageContainer>
          </div>
        </div>
      </Reveal>
    </AboutIntroStyled>
  );
}

const AboutIntroStyled = styled.div`
  .container {
    color: #1a1a1b;
    padding: 2rem;

    ${media.l`
      padding: 1rem 0;
    `}

    .textContainer {
      grid-column: 1 / 6;

      .text {
        padding: 0 0 60px 0;
        width: 474px;
        max-width: 100%;

        ${media.l`
          width: 100%;
          padding-bottom: 40px;
        `}

        p {
          margin: 0;
        }
      }

      button {
        margin-bottom: 60px;
      }
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  grid-column: 7 / 11;

  ${media.l`
    padding-bottom: 60px;
  `}

  .fill-image {
    width: 100%;
    height: auto;
  }
`;

const DecorativeCircle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${color.red};
  width: 123px;
  height: 123px;
  border-radius: 9999px;
  transform: translate(50%, 50%);

  ${media.l`
    transform: translate(15%, 80%);
  `}
`;
