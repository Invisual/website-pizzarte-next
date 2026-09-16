"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Image } from "../layout/Image";
import { color, media, breakpoint } from "../style/style";
import Triangle from "../layout/Triangle";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Fusão de animation/pizzaEffect.js + animation/mobile/pizzaEffectMobile.js.
// Bug corrigido: a versão mobile pedia "Homepage/pizza_top.png" — esse
// ficheiro nunca existiu (só existe pizza_top.webp), a imagem partia
// silenciosamente em todos os telemóveis (GetURL devolvia null).
export default function PizzaEffect({ data }) {
  const [isInView, setIsInView] = useState(false);
  const pizzaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!pizzaRef.current) return;
      const rect = pizzaRef.current.getBoundingClientRect();
      setIsInView(rect.top >= 0 && rect.bottom <= window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      const isMobile = window.matchMedia(`(max-width: ${breakpoint.l})`).matches;
      const from = isMobile ? -800 : 0;
      const to = isMobile ? 100 : 600;

      gsap.utils.toArray(".phrase-title").forEach((box) => {
        gsap.set(box, { translateX: from });
        gsap.to(box, { scrollTrigger: { trigger: box, scrub: true }, translateX: to });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <TopPhrase>
        <div className="container-default">
          <h1 className="phrase-title">{data.pizzaEffect.titleTop}</h1>
        </div>
      </TopPhrase>
      <PizzaStyled ref={pizzaRef} className={isInView ? "open" : "not-open"}>
        <div className="forma-left">
          <Triangle width="100%" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className={`pizzaTop ${isInView ? "open" : ""}`}>
            <Image src="Homepage/pizza_top.webp" alt="" extraClass="pizza-half" />
          </div>
          <div className={`pizzaBottom ${isInView ? "open" : ""}`}>
            <Image src="Homepage/pizza_bottom.webp" alt="" extraClass="pizza-half" />
          </div>
        </div>
        <div className="forma-right">
          <Triangle color="white" width="134px" />
        </div>
        {isInView && <div className="textBehind" dangerouslySetInnerHTML={{ __html: data.pizzaEffect.text }} />}
      </PizzaStyled>
    </>
  );
}

const TopPhrase = styled.div`
  position: relative;

  .container-default {
    overflow-x: hidden;
    max-width: none;
  }

  .phrase-title {
    font-size: 130px;
    font-family: var(--font-british);
    font-weight: 200;
    -webkit-text-stroke: 1px ${color.red};
    color: transparent;
    margin-top: 3rem;

    ${media.l`
      font-size: 10vw;
    `}
  }
`;

const PizzaStyled = styled.div`
  position: relative;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 500px 0;

  ${media.xxl`
    margin: 300px 0;
  `}

  ${media.l`
    height: 90vh;
    margin: 100px 0;

    ${media.m`
      height: 70vh;
    `}

    .forma-left {
      display: none;
    }
  `}

  .forma-left {
    position: absolute;
    left: 30px;
    top: 100px;
  }

  .forma-right {
    position: absolute;
    right: 30px;
    top: -100px;
  }

  .pizzaTop,
  .pizzaBottom {
    position: absolute;
    transition: transform 1s ease;
  }

  .pizza-half {
    width: 100%;
    height: auto;
  }

  .pizzaTop,
  .pizzaBottom {
    width: 45%;

    ${media.l`
      width: 100%;
      z-index: 2;
    `}
  }

  .pizzaTop {
    transform: translateY(-20vh);
  }

  .pizzaBottom {
    transform: translateY(20vh);

    ${media.xxl`
      transform: translateY(17vh);
    `}

    ${media.l`
      transform: translateY(17vh);

      ${media.m`
        transform: translateY(5vh);
      `}
    `}
  }

  .open.pizzaTop {
    transform: translateY(-45vh);

    ${media.l`
      transform: translateY(-36vh);
    `}
  }

  .open.pizzaBottom {
    transform: translateY(45vh);

    ${media.l`
      transform: translateY(30vh);
    `}
  }

  .textBehind {
    position: absolute;
    opacity: 1;
    transition: opacity 1s ease-in-out;
    text-align: center;
    font-size: 50px;
    color: ${color.red};
    text-transform: uppercase;
    font-weight: 200;

    ${media.l`
      font-size: inherit;
    `}

    .first-text {
      font-family: var(--font-british);
      font-weight: 200;
      font-size: 8rem;

      ${media.l`
        font-size: 6rem;
      `}
    }

    .middle-text {
      font-size: 8rem;
      font-weight: 200;
      color: transparent;
      -webkit-text-stroke: 1px #ff0000;

      ${media.l`
        font-size: 5rem;
      `}
    }
  }

  &.not-open .textBehind {
    opacity: 0;
  }
`;
