"use client";

import { useLayoutEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Image } from "../layout/Image";
import { color, breakpoint } from "../style/style";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// Fusão de animation/waiting.js + animation/mobile/waitingMobile.js. Vídeo e
// poster recomprimidos (12,5MB -> 7,1MB o vídeo, 720p, mesmo áudio; 8,1MB ->
// 52KB o poster, webp) — eram os dois maiores ficheiros do site.
export default function Waiting({ home, NoAnimation, data }) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      const isMobile = window.matchMedia(`(max-width: ${breakpoint.l})`).matches;

      gsap.utils.toArray(".waiting-first, .waiting-first1").forEach((box) => {
        gsap.set(box, { translateX: 0 });
        gsap.to(box, { scrollTrigger: { trigger: box, scrub: true }, translateX: isMobile ? -100 : -500 });
      });

      gsap.utils.toArray(".waiting-second, .waiting-second1").forEach((box) => {
        gsap.set(box, { translateX: 0 });
        gsap.to(box, { scrollTrigger: { trigger: box, scrub: true }, translateX: isMobile ? 100 : 500 });
      });

      const pizzaMoves = isMobile
        ? [
            { translateX: 20, translateY: 20, rotate: 50, width: 200 },
            { translateX: 100, translateY: 200, rotate: 50, width: 150 },
            { translateX: 150, translateY: 350, rotate: 50, width: 140 },
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <WaitingStyled>
      {home && (
        <>
          <video controls poster="/video/poster.webp">
            <source src="/video/pizza-pizzarte.mp4" type="video/mp4" />
          </video>

          <div className="container-default">
            <div className="pizza-show">
              <div className="pizza-1">
                <Image src="Homepage/pizza.png" alt="" extraClass="pizza-icon" />
              </div>
              <div className="pizza-2">
                <Image src="Homepage/pizza.png" alt="" extraClass="pizza-icon" />
              </div>
              <div className="pizza-3">
                <Image src="Homepage/pizza.png" alt="" extraClass="pizza-icon" />
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
`;
