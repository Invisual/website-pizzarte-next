"use client";

import { useRef } from "react";
import styled from "styled-components";
import { Image } from "../layout/Image";
import { color, media, breakpoint } from "../style/style";
import Triangle from "../layout/Triangle";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";
import { useGsapEffect } from "../../hooks/useGsapEffect";

// Fusão de animation/pizzaEffect.js + animation/mobile/pizzaEffectMobile.js.
// Bug corrigido: a versão mobile pedia "Homepage/pizza_top.png" — esse
// ficheiro nunca existiu (só existe pizza_top.webp), a imagem partia
// silenciosamente em todos os telemóveis (GetURL devolvia null).
export default function PizzaEffect({ data }) {
  const pizzaRef = useRef(null);

  useGsapEffect((gsap) => {
    if (!pizzaRef.current) return;

    // gsap.matchMedia (em vez de window.matchMedia lido uma única vez no
    // mount) recalcula tudo se o ecrã mudar de breakpoint (ex: rotação do
    // telemóvel) e reverte sozinho os tweens do ramo anterior — mesmo padrão
    // usado em Waiting.jsx. isDesktop tem de estar definida também: mm.add só
    // corre o callback quando pelo menos uma condição é verdadeira.
    const mm = gsap.matchMedia();

    mm.add(
      { isMobile: `(max-width: ${breakpoint.l})`, isDesktop: `(min-width: ${breakpoint.l})` },
      (ctx) => {
        const { isMobile } = ctx.conditions;
        const phraseTo = isMobile ? 0 : 600;
        const pizzaTopTo = isMobile ? "-36vh" : "-45vh";
        const pizzaBottomTo = isMobile ? "30vh" : "45vh";

        // Um único range de scroll (altura do container + viewport) partilhado
        // por todos os tweens — em vez de misturar um scrub instantâneo no
        // texto com um snap binário CSS nas metades da pizza, tudo acompanha
        // a mesma posição de scroll, suavizado por "scrub: 1".
        //
        // Em mobile o range acaba quando o centro do container chega ao centro
        // do ecrã ("center center"), não quando o fundo sai por cima
        // ("bottom top"): as metades abertas ocupam ~90vh, por isso, no fim do
        // range antigo o container já estava fora do ecrã e a pizza só ficava
        // 100% aberta quando já não se via.
        const scrollCfg = {
          trigger: pizzaRef.current,
          start: "top bottom",
          end: isMobile ? "center center" : "bottom top",
          scrub: 1,
        };
        // textBehind só começa a aparecer depois do meio do range de scroll —
        // pedido do user para o texto surgir mais tarde, não junto com a
        // pizza a abrir. Em mobile termina logo a seguir à pizza abrir.
        const textScrollCfg = isMobile
          ? { ...scrollCfg, start: "center 80%", end: "center 40%" }
          : { ...scrollCfg, start: "center bottom" };

        if (prefersReducedMotion()) {
          gsap.set(".phrase-title", { translateX: phraseTo });
          gsap.set(".pizzaTop", { translateY: pizzaTopTo });
          gsap.set(".pizzaBottom", { translateY: pizzaBottomTo });
          gsap.set(".textBehind", { opacity: 1 });
          return;
        }

        // Em mobile o título fica acima do container da pizza (trigger do
        // scroll), pelo texto já ter passado grande parte do ecrã quando o
        // trigger dispara — resultado era o texto aparecer tarde demais ou
        // nem se notar. Em mobile mostra-se logo, sem animação de scroll.
        if (isMobile) {
          gsap.set(".phrase-title", { translateX: phraseTo });
        } else {
          gsap.utils.toArray(".phrase-title").forEach((box) => {
            gsap.set(box, { translateX: 0 });
            gsap.to(box, { scrollTrigger: { ...scrollCfg }, translateX: phraseTo });
          });
        }

        gsap.utils.toArray(".pizzaTop").forEach((box) => {
          gsap.to(box, { scrollTrigger: { ...scrollCfg }, translateY: pizzaTopTo });
        });

        gsap.utils.toArray(".pizzaBottom").forEach((box) => {
          gsap.to(box, { scrollTrigger: { ...scrollCfg }, translateY: pizzaBottomTo });
        });

        gsap.utils.toArray(".textBehind").forEach((box) => {
          gsap.to(box, { scrollTrigger: { ...textScrollCfg }, opacity: 1 });
        });
      }
    );
  }, []);

  return (
    <>
      <TopPhrase>
        <div className="container-default">
          <h2 className="phrase-title">{data.pizzaEffect.titleTop}</h2>
        </div>
      </TopPhrase>
      <PizzaStyled ref={pizzaRef}>
        <div className="forma-left">
          <Triangle width="100%" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className="pizzaTop">
            <Image
              src="Homepage/pizza_top.webp"
              alt=""
              extraClass="pizza-half"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
          <div className="pizzaBottom">
            <Image
              src="Homepage/pizza_bottom.webp"
              alt=""
              extraClass="pizza-half"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
        <div className="forma-right">
          <Triangle color="white" width="134px" />
        </div>
        <div className="textBehind" dangerouslySetInnerHTML={{ __html: data.pizzaEffect.text }} />
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
    margin: 3rem 0 0;
    padding: 0;
    line-height: var(--line-height-dense);
    letter-spacing: -0.01em;

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

  .textBehind {
    position: absolute;
    opacity: 0;
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
`;
