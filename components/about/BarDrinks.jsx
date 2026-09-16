"use client";

import { useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import anime from "animejs/lib/anime.es.js";
import { useLocale } from "next-intl";
import Title from "../layout/Title";
import { Image } from "../layout/Image";
import Button from "../layout/Button";
import Reveal from "../layout/Reveal";
import { color, media } from "../style/style";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";
import { translateNavLink } from "../../i18n/navLinks";

gsap.registerPlugin(ScrollTrigger);

// Fusão de about/desktop/barDrinks.js + about/mobile/barDrinksMobile.js.
export default function BarDrinks({ data }) {
  const locale = useLocale();

  useEffect(() => {
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
          <div className="grid-default space">
            <div className="text-container">
              <Title text={data.drinks.title} />
              <p dangerouslySetInnerHTML={{ __html: data.drinks.text }} />
              <Button to={translateNavLink("/menu/bebidas", locale)} button={data.drinks.button} />
            </div>
            <Swiper
              modules={[Pagination, Mousewheel]}
              direction="vertical"
              loop={true}
              pagination={{ clickable: true }}
              grabCursor={false}
              speed={1000}
              mousewheel={{ forceToAxis: true, sensitivity: 1, releaseOnEdges: true }}
              parallax={true}
              autoplay={true}
              effect="slide"
            >
              {data.drinks.drinksImage.map((drinksItem, l) => (
                <SwiperSlide key={l}>
                  <Image src={drinksItem.img} alt="" extraClass="drink-image" />
                </SwiperSlide>
              ))}
              <div className="background-red-bar">
                {/* Efeito puramente decorativo (letra a letra, anime.js) — mesmo
                    texto em todos os idiomas no original, não é conteúdo real. */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <h1 className="ml2" key={i}>
                    BAAAAAAAAAAAR
                  </h1>
                ))}
              </div>
            </Swiper>
          </div>
        </Reveal>
      </div>
    </BarDrinksStyled>
  );
}

const BarDrinksStyled = styled.div`
  .swiper {
    height: 50vh;
    grid-column: 9 / 13;
    position: relative;
    width: -webkit-fill-available;
    display: flex;

    ${media.xxl`
      grid-column: 8 / 13;
      height: 60vh;
    `}

    ${media.l`
      height: 60vh;
      margin-top: 80px;
      grid-column: unset;
    `}

    .swiper-wrapper {
      display: flex;
      position: relative;
    }

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
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

      ${media.l`
        font-size: 27px;
        width: 100%;
        height: 50vh;

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
