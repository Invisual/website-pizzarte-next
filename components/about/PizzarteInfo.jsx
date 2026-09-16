"use client";

import { useLayoutEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Image } from "../layout/Image";
import Title from "../layout/Title";
import Reveal from "../layout/Reveal";
import Stars from "./Stars";
import { media } from "../style/style";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Fusão de about/desktop/pizzarteInfo.js + about/mobile/pizzarteInfoMobile.js.
// O bloco de testemunhos ("feedback") tem tratamento visual genuinamente
// diferente por breakpoint no original (imagem única red-background vs
// red-top/red-bottom, tipografia British vs ChunkyRosie) — não é só CSS
// responsivo, por isso ficam os dois blocos de marcação, cada um mostrado
// só no seu breakpoint via CSS.
export default function PizzarteInfo({ data }) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      const isMobile = window.matchMedia(`(max-width: 1024px)`).matches;

      gsap.utils.toArray(".woman").forEach((box) => {
        gsap.to(box, { scrollTrigger: { trigger: box, scrub: true }, y: -200 });
      });

      gsap.utils.toArray(".man").forEach((box) => {
        gsap.to(box, { scrollTrigger: { trigger: box, scrub: true }, y: isMobile ? 100 : 200 });
      });
    });

    return () => ctx.revert();
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
        <Swiper spaceBetween={50} slidesPerView={1} autoplay={{ delay: 3000 }} loop navigation modules={[Navigation]} className="inside-slide">
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
      </div>

      <div className="feedback feedback-mobile">
        <Image src="Homepage/red-top.png" extraClass="red-top" alt="" />
        <Swiper spaceBetween={50} slidesPerView={1} autoplay={{ delay: 3000 }} loop navigation modules={[Navigation]}>
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
        <Image src="Homepage/red-bottom.png" extraClass="red-bottom" alt="" />
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

    .swiper {
      width: 50%;
    }

    .inside-slide {
      position: absolute;
      top: 50%;
      left: 50%;
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

    .swiper-button-next,
    .swiper-button-prev {
      color: #fff;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid;
    }

    .swiper-button-next:hover,
    .swiper-button-prev:hover {
      background-color: rgba(255, 255, 255, 0.8);
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
    .woman-falling { width: 283px; }
    .man-falling { width: 250px; z-index: auto; }

    .feedback-desktop { display: none; }
    .feedback-mobile {
      display: block;

      .swiper {
        position: relative;
        top: -10vh;

        ${media.m`
          top: -18vh;
        `}
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

      .red-top {
        transform: translate(0, 0);
        width: 76rem;
        height: auto;

        ${media.m`
          transform: translate(-100vw, 0vh);
        `}
      }

      .red-bottom {
        width: 76rem;
        height: auto;
        transform: translate(0, -25vh);

        ${media.m`
          transform: translate(-100vw, -40vh);
        `}
      }

      .swiper-button-next,
      .swiper-button-prev {
        color: #fff;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid;
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
