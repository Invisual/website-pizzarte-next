"use client";

import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useLocale } from "next-intl";
import { Image } from "../layout/Image";
import Button from "../layout/Button";
import ClientOnly from "../layout/ClientOnly";
import { color, media, breakpoint, hover } from "../style/style";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";
import { translateNavLink } from "../../i18n/navLinks";
import { useGsapEffect } from "../../hooks/useGsapEffect";

// Fusão de about/desktop/foodSlider.js + about/mobile/foodSliderMobile.js.
export default function FoodSlider({ data }) {
  const locale = useLocale();

  useGsapEffect((gsap) => {
    if (prefersReducedMotion()) return;

    const isMobile = window.matchMedia(`(max-width: ${breakpoint.l})`).matches;
    const radius = isMobile ? 200 : 700;

    gsap.utils.toArray(".background-radius").forEach((box) => {
      gsap.set(box, { borderTopLeftRadius: radius, borderTopRightRadius: radius });
      gsap.to(box, {
        scrollTrigger: { trigger: box, scrub: true },
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      });
    });
  }, []);

  return (
    <FoodSliderStyled>
      <div className="background-radius">menu</div>
      <div className="container">
        <div className="top">
          <h2 style={{ textTransform: "uppercase" }}>{data.foodSlider.title}</h2>
          <p style={{ textTransform: "uppercase" }}>{data.foodSlider.subtitle}</p>
          <div className="swiper-navigation">
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </div>
        </div>
        <div className="swiper-container">
          <ClientOnly>
            <Swiper
              spaceBetween={0}
              slidesPerView="auto"
              autoplay={{ delay: 3000 }}
              navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
              modules={[Navigation]}
            >
              {data.menu.map((menuItem, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-slide">
                    <a href={translateNavLink("/menu/" + menuItem.slug, locale)}>
                      <Image src={menuItem.img} alt="" extraClass="dish-thumb" sizes="280px" />
                      <span>{menuItem.description}</span>
                    </a>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </ClientOnly>
        </div>
        <div className="slider-cta">
          <Button button={data.foodSlider.btn.text} to={translateNavLink("/menu", locale)} />
        </div>
      </div>
    </FoodSliderStyled>
  );
}

const FoodSliderStyled = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2;

  ${media.l`
    height: auto;
    padding: 80px 0;
  `}

  .slider-cta {
    display: flex;
    justify-content: center;
    width: 100%;
    padding-top: 70px;

    ${media.l`
      padding-top: 40px;
    `}
  }

  .background-radius {
    position: absolute;
    background: #e5e1da;
    top: 0;
    width: 100%;
    left: 0;
    z-index: -1;
    color: transparent;
    height: 100%;
  }

  .container {
    .top {
      position: relative;
      text-align: center;
      z-index: 5;
      padding-bottom: 70px;

      ${media.xxl`
        padding-bottom: 40px;
      `}

      ${media.l`
        padding-bottom: 40px;
      `}

      h2 {
        color: ${color.red};
        font-family: var(--font-british);
        font-weight: 200;
        font-size: 60px;
        margin: 0;
        line-height: var(--line-height-dense);
        letter-spacing: -0.01em;

        ${media.l`
          font-size: 40px;
        `}
      }

      p {
        font-weight: 600;

        ${media.l`
          width: 240px;
          margin: 0 auto;
          padding: 20px 0;
        `}
      }

      .swiper-navigation {
        gap: 3vw;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-top: 20px;
        width: 90vw;

        ${media.l`
          justify-content: center;
          gap: 7vw;
          width: auto;
        `}

        .swiper-button-prev,
        .swiper-button-next {
          color: ${color.red};
          background: transparent;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid ${color.red};
          margin: 0 5px;
          position: relative !important;
        }

        .swiper-button-next .swiper-navigation-icon,
        .swiper-button-prev .swiper-navigation-icon {
          width: 14px;
          height: 14px;
        }

        ${hover`
          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background-color: ${color.red};
            color: #fff;
          }
        `}
      }
    }

    .swiper-container {
      overflow: hidden;
      position: relative;

      /* Reserva o espaço do <Swiper> (só existe no DOM depois do mount via
         ClientOnly) — estimado a partir do rácio real da imagem do slide
         (Menu/pao_alho_queijo.webp, 281×352) à largura do slide em mobile
         (227px) + texto. Sem isto a secção salta de altura ~0 para a
         altura do carrossel após a hidratação, CLS grande em mobile.
         Ajustar se o valor não bater certo com o layout real. */
      ${media.l`
        min-height: 340px;
      `}

      .swiper {
        width: 80vw !important;
        margin-left: 10vw !important;
        margin-right: inherit !important;
      }

      .swiper-wrapper {
        display: flex;
      }

      .swiper-slide {
        text-align: center;
        width: 280px;
        flex-shrink: 0;
        margin-right: 67px;

        ${media.xxl`
          width: 230px;
          margin-right: 40px;
        `}

        ${media.l`
          width: 227px;
          margin-right: 30px;
        `}

        a {
          display: block;
          color: #000;
          text-decoration: none;
        }

        .dish-thumb {
          margin-bottom: 17px;
          width: 100%;
          height: auto;
        }

        span {
          font-weight: 600;
          font-size: 20px;
          margin-top: 20px;
          text-transform: uppercase;
          color: #000 !important;
        }
      }
    }
  }
`;
