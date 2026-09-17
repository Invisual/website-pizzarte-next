"use client";

import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Image } from "../layout/Image";
import Title from "../layout/Title";
import Reveal from "../layout/Reveal";
import ClientOnly from "../layout/ClientOnly";
import Stars from "./Stars";
import { color, media, hover } from "../style/style";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";
import { useGsapEffect } from "../../hooks/useGsapEffect";

// Fusão de about/desktop/pizzarteInfo.js + about/mobile/pizzarteInfoMobile.js.
// O bloco de testemunhos ("feedback") tem tratamento visual genuinamente
// diferente por breakpoint no original (imagem única red-background vs
// red-top/red-bottom, tipografia British vs ChunkyRosie) — não é só CSS
// responsivo, por isso ficam os dois blocos de marcação, cada um mostrado
// só no seu breakpoint via CSS.
export default function PizzarteInfo({ data }) {
  useGsapEffect((gsap) => {
    if (prefersReducedMotion()) return;

    const isMobile = window.matchMedia(`(max-width: 1024px)`).matches;

    gsap.utils.toArray(".woman").forEach((box) => {
      gsap.to(box, { scrollTrigger: { trigger: box, scrub: true }, y: -200 });
    });

    gsap.utils.toArray(".man").forEach((box) => {
      gsap.to(box, { scrollTrigger: { trigger: box, scrub: true }, y: isMobile ? 100 : 200 });
    });
  }, []);

  const slides = data?.feedback?.map((feedback, index) => ({ ...feedback, index })) || [];

  return (
    <PizzarteInfoStyled>
      <div className="container-default">
        <Reveal>
          <div className="container">
            <div className="textContainer">
              <Title text={data?.title} />
              <p dangerouslySetInnerHTML={{ __html: data?.text }} />
            </div>
            <div className="ImageContainer">
              <Image src="Homepage/imagem_1.webp" alt="Pizzarte" />
              <div className="man-dancing">
                <Image src="Homepage/homem_1.webp" alt="" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="feedback feedback-desktop space">
        <div className="red-background">
          <Image src="Homepage/red-background.png" alt="" />
        </div>
        <ClientOnly>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            autoplay={{ delay: 3000 }}
            loop
            navigation={{ nextEl: ".swiper-button-next-desktop", prevEl: ".swiper-button-prev-desktop" }}
            modules={[Navigation]}
            className="inside-slide"
          >
            {slides.map((feedback) => (
              <SwiperSlide key={feedback.index}>
                <div className="feedback-person">
                  <h1>{feedback.quote}</h1>
                  <p>{feedback.author}</p>
                  <Stars count={feedback.rating} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ClientOnly>
        <div className="swiper-navigation">
          <div className="swiper-button-prev swiper-button-prev-desktop"></div>
          <div className="swiper-button-next swiper-button-next-desktop"></div>
        </div>
      </div>

      <div className="feedback feedback-mobile space">
        <div className="feedback-mobile-red">
          <ClientOnly>
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              autoplay={{ delay: 3000 }}
              loop
              navigation={{ nextEl: ".swiper-button-next-mobile", prevEl: ".swiper-button-prev-mobile" }}
              modules={[Navigation]}
            >
              {slides.map((feedback) => (
                <SwiperSlide key={feedback.index}>
                  <div className="feedback-person">
                    <h1>{feedback.quote}</h1>
                    <p className="author">{feedback.author}</p>
                    <Stars count={feedback.rating} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </ClientOnly>
          <div className="swiper-navigation">
            <div className="swiper-button-prev swiper-button-prev-mobile"></div>
            <div className="swiper-button-next swiper-button-next-mobile"></div>
          </div>
        </div>
      </div>

      <div className="woman-falling woman">
        <Image src="Homepage/senhora.webp" alt="" />
      </div>
      <div className="man-falling man">
        <Image src="Homepage/homem_2.webp" alt="" />
      </div>
    </PizzarteInfoStyled>
  );
}

const PizzarteInfoStyled = styled.div`
  position: relative;

  .feedback-mobile {
    display: none;
  }

  .woman-falling {
    position: absolute;
    left: 0;
    width: 473px;
    bottom: 0;
  }

  .man-falling {
    position: absolute;
    right: 0;
    width: 404px;
    bottom: 0;
    z-index: 4;
  }

  .feedback-desktop {
    position: relative;

    img {
      width: 100%;
      height: auto;
    }

    .inside-slide {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50%;
      transform: translate(-50%, -50%);
    }

    .feedback-person {
      text-align: center;
      color: #fff;

      h1 {
        width: 539px;
        margin: 0 auto;
        font-family: var(--font-british);
        text-transform: uppercase;
        font-weight: 200;
        font-size: 42px;
        line-height: 52px;
      }

      p {
        font-size: 21px;
        text-transform: uppercase;
        font-weight: 600;
      }
    }

    .swiper-navigation {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 57%;
      transform: translate(-50%, -50%);
      z-index: 5;
      pointer-events: none;

      .swiper-button-prev-desktop,
      .swiper-button-next-desktop {
        color: #fff;
        background: transparent;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #fff;
        position: relative !important;
        pointer-events: auto;
      }

      .swiper-button-next-desktop .swiper-navigation-icon,
      .swiper-button-prev-desktop .swiper-navigation-icon {
        width: 14px;
        height: 14px;
      }

      ${hover`
        .swiper-button-next-desktop:hover,
        .swiper-button-prev-desktop:hover {
          background-color: #fff;
          color: ${color.red};
        }
      `}
    }
  }

  .container {
    display: flex;
    justify-content: space-between;
    padding-top: 164px;

    .textContainer {
      width: 474px;
      margin-bottom: 2rem;
    }

    .ImageContainer {
      width: 392px;
      position: relative;

      img {
        width: 100%;
        height: auto;
      }

      .man-dancing {
        position: absolute;
        bottom: 0;
        width: 323px;
        left: 0;
        transform: translate(-50%, 36%);
        z-index: 1;
      }
    }
  }

  ${media.l`
    .woman-falling { display: none; }
    .man-falling {
      position: static;
      width: 250px;
      margin: 0 auto;
      z-index: auto;
    }

    .feedback-desktop { display: none; }
    .feedback-mobile {
      display: block;
      position: relative;
      margin-top: 8rem;

      .feedback-mobile-red {
        position: relative;
        background: ${color.red};
        border-radius: 3rem;
        padding: 3rem 0;
      }

      .feedback-person {
        text-align: center;
        color: #fff;
        margin: 0 13%;

        h1 {
          font-family: var(--font-chunky-rosie);
          font-weight: 200;
          font-size: 20px;
        }

        .author {
          font-size: 21px;
          text-transform: uppercase;
          font-weight: 600;
          margin: 0;
        }
      }

      .swiper-navigation {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 10%;
        right: 10%;
        transform: translateY(-50%);
        z-index: 5;
        pointer-events: none;

        .swiper-button-prev-mobile,
        .swiper-button-next-mobile {
          color: #fff;
          background: ${color.red};
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid ${color.red};
          position: relative !important;
          pointer-events: auto;
        }

        .swiper-button-next-mobile .swiper-navigation-icon,
        .swiper-button-prev-mobile .swiper-navigation-icon {
          width: 14px;
          height: 14px;
        }

        ${hover`
          .swiper-button-next-mobile:hover,
          .swiper-button-prev-mobile:hover {
            background-color: #fff;
            color: ${color.red};
          }
        `}
      }
    }

    .container {
      flex-direction: column;
      padding-top: 164px;

      .textContainer {
        width: auto;
        margin-bottom: 2rem;
      }

      .ImageContainer {
        width: 400px;
        margin-left: 20vw;

        ${media.m`
          width: 250px;
        `}

        .man-dancing {
          width: 205px;
        }
      }
    }
  `}
`;
