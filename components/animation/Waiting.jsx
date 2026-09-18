"use client";

import styled from "styled-components";
import { Image } from "../layout/Image";
import { color, media, breakpoint } from "../style/style";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";
import { useGsapEffect } from "../../hooks/useGsapEffect";

// Fusão de animation/waiting.js + animation/mobile/waitingMobile.js. Vídeo e
// poster recomprimidos (12,5MB -> 7,1MB o vídeo, 720p, mesmo áudio; 8,1MB ->
// 52KB o poster, webp) — eram os dois maiores ficheiros do site.
export default function Waiting({ home, NoAnimation, data }) {
  useGsapEffect((gsap) => {
    if (prefersReducedMotion()) return;

    // gsap.matchMedia (em vez de window.matchMedia lido uma única vez no
    // mount) recalcula tudo se o ecrã mudar de breakpoint (ex: rotação do
    // telemóvel) e reverte sozinho os tweens do ramo anterior.
    const mm = gsap.matchMedia();

    // mm.add só corre o callback quando pelo menos uma condição do objeto é
    // verdadeira — com só "isMobile" definida, o callback nunca disparava em
    // desktop (>1024px), matando a animação nesse breakpoint (bug reportado).
    mm.add(
      { isMobile: `(max-width: ${breakpoint.l})`, isDesktop: `(min-width: ${breakpoint.l})` },
      (ctx) => {
        const { isMobile } = ctx.conditions;

        gsap.utils.toArray(".waiting-first, .waiting-first1").forEach((box) => {
          gsap.set(box, { translateX: 0 });
          gsap.to(box, { scrollTrigger: { trigger: box, scrub: true }, translateX: isMobile ? -100 : -500 });
        });

        gsap.utils.toArray(".waiting-second, .waiting-second1").forEach((box) => {
          gsap.set(box, { translateX: 0 });
          gsap.to(box, { scrollTrigger: { trigger: box, scrub: true }, translateX: isMobile ? 100 : 500 });
        });

        // Em mobile os offsets/larguras são calculados a partir da largura
        // real do palco (.pizza-show), não em px fixos — os valores fixos
        // (150px de translateX, fatias até 200px de largura) empurravam as
        // fatias para fora do ecrã em telemóveis estreitos (bug reportado).
        // Em desktop os valores mantêm-se exatamente como estavam.
        const stage = document.querySelector(".pizza-show");
        const stageW = stage ? stage.clientWidth : window.innerWidth;
        const slice = Math.min(stageW * 0.34, 180);
        const step = (stageW - slice) / 2;

        const pizzaMoves = isMobile
          ? [
              { translateX: 0, translateY: 0, rotate: 20, width: slice },
              { translateX: step, translateY: 110, rotate: 35, width: slice * 0.85 },
              { translateX: step * 2, translateY: 220, rotate: 50, width: slice * 0.75 },
            ]
          : [
              { translateX: 80, translateY: 80, rotate: 0, width: undefined },
              { translateX: 280, translateY: 250, rotate: 20, width: 200 },
              { translateX: 450, translateY: 400, rotate: 30, width: 180 },
            ];

        [".pizza-1", ".pizza-2", ".pizza-3"].forEach((selector, i) => {
          gsap.utils.toArray(selector).forEach((box) => {
            gsap.set(box, { translateX: 0, opacity: 0, rotate: 0 });
            gsap.to(box, {
              scrollTrigger: { trigger: box, scrub: true },
              opacity: 1,
              ...pizzaMoves[i],
            });
          });
        });
      }
    );
  }, []);

  return (
    <WaitingStyled>
      {home && (
        <>
          {/* preload="none": vídeo de 7MB que a maioria dos visitantes
              nunca reproduz — sem isto o browser ia buscar metadata (ou
              mais) logo ao carregar a página. */}
          <video controls poster="/video/poster.webp" preload="none" playsInline>
            <source src="/video/pizza-pizzarte.mp4" type="video/mp4" />
          </video>

          <div className="container-default">
            <div className="pizza-show">
              <div className="pizza-1">
                <Image src="Homepage/pizza.webp" alt="" extraClass="pizza-icon" sizes="200px" />
              </div>
              <div className="pizza-2">
                <Image src="Homepage/pizza.webp" alt="" extraClass="pizza-icon" sizes="200px" />
              </div>
              <div className="pizza-3">
                <Image src="Homepage/pizza.webp" alt="" extraClass="pizza-icon" sizes="200px" />
              </div>
            </div>
          </div>
        </>
      )}

      {NoAnimation ? (
        <div className="container">
          <div className="left1">
            <h1 className="waiting-first1">{data.title}</h1>
          </div>
          <div className="right1">
            <h1 className="waiting-second1">{data.title}</h1>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="left">
            <h1 className="waiting-first">{data.title}</h1>
          </div>
          <div className="right">
            <h1 className="waiting-second">{data.title}</h1>
          </div>
        </div>
      )}
    </WaitingStyled>
  );
}

const WaitingStyled = styled.div`
  video {
    width: 100%;
  }

  .pizza-show {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(3, 1fr);
    height: 600px;

    .pizza-1,
    .pizza-2,
    .pizza-3 {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    .pizza-icon {
      width: 100%;
      height: auto;
    }
  }

  .container {
    position: relative;
    font-family: var(--font-british);
    font-size: clamp(16px, 3vw, 76px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-x: hidden;

    .left,
    .left1 {
      color: ${color.red};
    }

    .waiting-first,
    .waiting-first1 {
      display: flex;
      width: 100%;
      justify-content: flex-end;
      font-weight: 200;
    }

    .waiting-second,
    .waiting-second1 {
      display: flex;
      width: 100%;
      justify-content: flex-start;
      -webkit-text-stroke: 1px ${color.red};
      color: transparent;
      font-weight: 200;
    }
  }

  ${media.l`
    .pizza-show {
      height: 360px;
      overflow: hidden;

      .pizza-1,
      .pizza-2,
      .pizza-3 {
        max-width: 45vw;
      }
    }
  `}
`;
