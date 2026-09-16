"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Image } from "../layout/Image";
import Reveal from "../layout/Reveal";
import { color, media } from "../style/style";
import { useAnimeEffect } from "../../hooks/useAnimeEffect";

// Fusão de about/desktop/ourSpace.js + about/mobile/ourSpaceMobile.js.
// Número de títulos repetidos unificado numa só fórmula (era duas lógicas
// de resize desencontradas: desktop só reagia a ≥1921px, mobile só a
// ≤1024px): ≥1921px -> 4, ≤1024px -> 6, resto -> 5.
export default function OurSpace() {
  const [numHeadings, setNumHeadings] = useState(5);

  useEffect(() => {
    const updateNumHeadings = () => {
      const width = window.innerWidth;
      if (width >= 1921) setNumHeadings(4);
      else if (width <= 1024) setNumHeadings(6);
      else setNumHeadings(5);
    };

    updateNumHeadings();
    window.addEventListener("resize", updateNumHeadings);
    return () => window.removeEventListener("resize", updateNumHeadings);
  }, []);

  useAnimeEffect((anime) => {
    const textWrappers = document.querySelectorAll(".ourspace-ml2");
    textWrappers.forEach((textWrapper, index) => {
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      anime.timeline({ loop: true }).add({
        targets: textWrapper.querySelectorAll(".letter"),
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 950,
        delay: (el, i) => 100 * i + index * 1000,
      });
    });
  }, []);

  return (
    <OurSpaceStyled className="space">
      <div className="container-red">
        <div className="container-default">
          <div className="local-div">
            <Reveal delay={400}>
              <div className="imagem-3">
                <Image src="Homepage/imagem_3.webp" alt="" extraClass="img-3" />
              </div>
            </Reveal>
            <Reveal delay={500}>
              <div className="imagem-4">
                <Image src="Homepage/imagem_4.webp" alt="" extraClass="img-4" />
              </div>
            </Reveal>
          </div>
        </div>
        <div className="background-red">
          {Array.from({ length: numHeadings }).map((_, index) => (
            <h1 key={index} className="ourspace-ml2">
              brutaaaaaaaaaaaaaaaaallllll
            </h1>
          ))}
        </div>
      </div>
    </OurSpaceStyled>
  );
}

const OurSpaceStyled = styled.div`
  .ourspace-ml2 {
    color: #e31515;
    text-transform: uppercase;
    font-size: 10vw;
    font-family: var(--font-british);
    font-weight: 200;
    margin: 0;
  }

  .container-red {
    position: relative;

    .local-div {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(2, 1fr);
      position: relative;
      z-index: 2;

      .imagem-3 {
        grid-column: 9 / 13;
        grid-row: 1 / 1;
        position: relative;
      }

      .imagem-4 {
        grid-column: 3 / 8;
        grid-row: 2 / 2;
        position: relative;
      }

      .img-3,
      .img-4 {
        width: 100%;
        height: auto;
      }

      ${media.l`
        grid-template-columns: repeat(5, 1fr);
        top: -10vh;

        .imagem-3 {
          grid-column: 3 / 6;
        }

        .imagem-4 {
          grid-column: 1 / 5;
        }
      `}
    }

    .background-red {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: ${color.red};
      transform: rotateX(45deg);

      ${media.l`
        transform: none;
      `}
    }
  }
`;
