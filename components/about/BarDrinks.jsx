"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import { useLocale } from "next-intl";
import Title from "../layout/Title";
import { Image } from "../layout/Image";
import Button from "../layout/Button";
import Reveal from "../layout/Reveal";
import ClientOnly from "../layout/ClientOnly";
import { color, media, breakpoint } from "../style/style";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";
import { translateNavLink } from "../../i18n/navLinks";
import { useAnimeEffect } from "../../hooks/useAnimeEffect";

// Fusão de about/desktop/barDrinks.js + about/mobile/barDrinksMobile.js.
// (o gsap importado no original nunca era usado aqui — só o registerPlugin
// morto; ficou de fora.)
export default function BarDrinks({ data }) {
  const locale = useLocale();

  // Correção de responsivo: em mobile o carrossel vertical roubava o swipe
  // vertical do dedo, que devia fazer scroll da página. <1024px passa a
  // horizontal (o Swiper não troca de `direction` sozinho — precisa de
  // remontar, daí o `key` no <Swiper> abaixo).
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint.l})`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useAnimeEffect((anime) => {
    if (prefersReducedMotion()) return;

    const textWrappers = document.querySelectorAll(".ml2");
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
    <BarDrinksStyled>
      <div className="container-default">
        <Reveal>
          <div className="grid-default">
            <div className="text-container">
              <Title text={data.drinks.title} />
              <p dangerouslySetInnerHTML={{ __html: data.drinks.text }} />
              <Button to={translateNavLink("/menu/bebidas", locale)} button={data.drinks.button} />
            </div>
            <div className="bar-stage">
              {/* Fora do <Swiper>: estava como filho não-slide, dentro do
                  .swiper-wrapper (que o Swiper transforma a cada slide) —
                  este cartão, absolute, deslizava junto com as imagens. */}
              <div className="background-red-bar">
                {/* Efeito puramente decorativo (letra a letra, anime.js) — mesmo
                    texto em todos os idiomas no original, não é conteúdo real. */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <h1 className="ml2" key={i}>
                    BAAAAAAAAAAAR
                  </h1>
                ))}
              </div>
              <ClientOnly>
                <Swiper
                  key={isMobile ? "h" : "v"}
                  modules={[Pagination, Mousewheel]}
                  direction={isMobile ? "horizontal" : "vertical"}
                  loop={true}
                  pagination={{ clickable: true }}
                  grabCursor={false}
                  speed={1000}
                  mousewheel={{ forceToAxis: true, sensitivity: 1, releaseOnEdges: true }}
                >
                  {data.drinks.drinksImage.map((drinksItem, l) => (
                    <SwiperSlide key={l}>
                      <Image src={drinksItem.img} alt="" extraClass="drink-image" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </ClientOnly>
            </div>
          </div>
        </Reveal>
      </div>
    </BarDrinksStyled>
  );
}

const BarDrinksStyled = styled.div`
  .bar-stage {
    grid-column: 9 / 13;
    position: relative;

    ${media.xxl`
      grid-column: 8 / 13;
    `}

    ${media.l`
      grid-column: unset;
      margin-top: 80px;
      overflow: hidden;
    `}
  }

  .background-red-bar {
    background: ${color.red};
    color: #e31515;
    text-transform: uppercase;
    position: absolute;
    border-radius: 40px 40px 0 0;
    font-size: 40px;
    font-family: var(--font-british);
    font-weight: 600;
    padding: 9px 23px 0 23px;
    top: 0;
    left: 0;

    ${media.l`
      font-size: 27px;
      width: 100%;
      height: 60%;

      ${media.m`
        height: auto;
      `}
    `}

    h1 {
      margin: 0;

      ${media.l`
        font-size: 11vw;
        text-align: center;

        ${media.m`
          font-size: 13vw;
        `}
      `}
    }
  }

  .swiper {
    height: 50vh;
    position: relative;
    width: -webkit-fill-available;
    display: flex;

    ${media.xxl`
      height: 60vh;
    `}

    ${media.l`
      height: 60vh;
      padding-bottom: 40px;
    `}

    .swiper-wrapper {
      display: flex;
      position: relative;
    }

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;

      ${media.l`
        min-height: 320px;
      `}
    }

    .swiper-pagination-bullet {
      width: 18px;
      height: 18px;
      border-radius: unset;
      background: #ffb4b4;
    }

    .swiper-pagination-bullet-active {
      background: ${color.red};
    }

    ${media.l`
      .swiper-pagination {
        bottom: 0 !important;
        top: unset !important;
        display: flex;
        gap: 10px;
        width: 100%;
        justify-content: center;
      }
    `}

    .drink-image {
      width: 40%;
      height: auto;

      ${media.m`
        width: 60%;
      `}
    }
  }

  .text-container {
    grid-column: 1 / 5;

    p {
      margin: 0;
      padding-bottom: 60px;
    }

    ${media.l`
      grid-column: unset;

      button {
        margin-top: 60px;
      }
    `}
  }
`;
