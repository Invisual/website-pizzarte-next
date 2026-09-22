"use client";

import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper/modules";
import { useLocale } from "next-intl";
import Title from "../layout/Title";
import { Image } from "../layout/Image";
import Button from "../layout/Button";
import Reveal from "../layout/Reveal";
import ClientOnly from "../layout/ClientOnly";
import { color, media } from "../style/style";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";
import { translateNavLink } from "../../i18n/navLinks";
import { useAnimeEffect } from "../../hooks/useAnimeEffect";

// Fusão de about/desktop/barDrinks.js + about/mobile/barDrinksMobile.js.
// (o gsap importado no original nunca era usado aqui — só o registerPlugin
// morto; ficou de fora.)
export default function BarDrinks({ data }) {
  const locale = useLocale();

  useAnimeEffect((anime) => {
    if (prefersReducedMotion()) return;

    // Timeline única partilhada por todas as linhas: cada uma resolvia o
    // próprio delay em loop independente, ficando invisível `index*1000`ms
    // a cada ciclo antes de revelar — parecia texto partido/com espaços em
    // branco em vez de um cascade estável.
    const textWrappers = document.querySelectorAll(".ml2");
    const timeline = anime.timeline({ loop: true });
    textWrappers.forEach((textWrapper, index) => {
      textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
      timeline.add(
        {
          targets: textWrapper.querySelectorAll(".letter"),
          scale: [4, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 950,
          delay: (el, i) => 100 * i,
        },
        index * 1000
      );
    });
  }, []);

  return (
    <BarDrinksStyled>
      <div className="container-default">
        <Reveal>
          <div className="grid-default">
            <div className="text-container">
              <Title text={data.drinks.title} question={data.drinks.question} level="h2" />
              <p className="description" dangerouslySetInnerHTML={{ __html: data.drinks.text }} />
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
                  <span className="ml2" key={i} aria-hidden="true">
                    BAAAAAAAAAAAR
                  </span>
                ))}
              </div>
              <ClientOnly>
                <Swiper
                  modules={[Pagination, Mousewheel]}
                  direction="horizontal"
                  loop={true}
                  pagination={{ clickable: true }}
                  grabCursor={false}
                  speed={1000}
                  mousewheel={{ forceToAxis: true, sensitivity: 1, releaseOnEdges: true }}
                >
                  {data.drinks.drinksImage.map((drinksItem, l) => (
                    <SwiperSlide key={l}>
                      <Image
                        src={drinksItem.img}
                        alt=""
                        extraClass="drink-image"
                        sizes="(max-width: 700px) 60vw, (max-width: 1024px) 45vw, 13vw"
                      />
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
    /* Reserva o espaço do <Swiper> (só existe no DOM depois do mount via
       ClientOnly) — mesmos valores de altura do bloco \`.swiper\` abaixo.
       Sem isto o carrossel salta de 0 para 50/60vh após a hidratação, CLS
       grande em mobile. */
    min-height: 50vh;

    ${media.xxl`
      grid-column: 8 / 13;
      min-height: 60vh;
    `}

    ${media.l`
      grid-column: unset;
      margin-top: 80px;
      overflow: hidden;
      min-height: 60vh;
    `}
  }

  .background-red-bar {
    background: ${color.red};
    color: #e31515;
    text-transform: uppercase;
    position: absolute;
    border-radius: 40px 40px 0 0;
    font-family: var(--font-british);
    font-weight: 600;
    padding: 9px 23px 0 23px;
    top: 0;
    right: 0;
    /* Largura fixa (não a do stage todo) para o cartão vermelho ficar mais
       estreito que a coluna, com o mesmo aspeto em qualquer breakpoint
       (mobile e desktop já usam o mesmo layout). As 5 linhas usam flex
       space-between para preencherem a altura toda. */
    width: 84%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    overflow: hidden;
    container-type: inline-size;

    ${media.l`
      /* right:4% em vez de 0 centra a caixa de 92% dentro do .bar-stage
         (que em mobile ocupa a largura toda da página, já não é a coluna
         estreita do grid desktop) — right:0 encostava tudo à direita.
         Um único valor de height para todo o mobile (sem override extra em
         media.m) — dois blocos de media diferentes a definir height da
         mesma regra competiam entre si e o de max-width menor (media.m,
         "auto") ganhava sempre em telemóveis reais, anulando este valor. */
      width: 100%;
      height: 60%;
      right: 0;
    `}

    .ml2 {
      display: flex;
      /* Cada letra é um flex item próprio (spans injetados pelo
         useAnimeEffect); space-between encosta a primeira à esquerda e a
         última à direita, esticando o texto à largura toda do cartão
         independentemente do nº de carateres ou do font-size — mais robusto
         que afinar um valor de cqw à mão. */
      justify-content: space-between;
      margin: 0;
      line-height: 1;
      font-size: 9.5cqw;
    }
  }

  .swiper {
    /* height:100% (não vh fixo) — .bar-stage é esticado pela grid à altura
       real de .text-container (que varia com o texto/idioma); um valor vh
       fixo descolava a paginação (bottom:20px do fundo do próprio .swiper)
       do botão "Menu Bebidas" (bottom:20px do fundo do .text-container)
       sempre que essa altura real passava do min-height. */
    height: 100%;
    /* position:absolute + top/right iguais ao background-red-bar (em vez de
       margin-left:auto em fluxo normal) para as duas caixas ocuparem
       exatamente a mesma área horizontal — só assim o conteúdo (copo,
       bolinhas) fica mesmo centrado dentro do cartão. */
    position: absolute;
    top: 0;
    right: 0;
    width: 84%;
    padding-bottom: 40px;
    display: flex;

    ${media.l`
      width: 100%;
      right: 0;
    `}

    .swiper-wrapper {
      display: flex;
      position: relative;
    }

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 320px;
    }

    .swiper-pagination-bullet {
      width: 18px;
      height: 18px;
      border-radius: unset;
      background: rgba(255, 0, 0, 0.5);
    }

    .swiper-pagination-bullet-active {
      background: ${color.red};
    }

    .swiper-pagination {
      bottom: 20px !important;
      top: unset !important;
      display: flex;
      gap: 10px;
      width: 100%;
      justify-content: center;
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
    /* .text-container é esticado pela grid à mesma altura de .bar-stage
       (linha partilhada). Flex column + margin-top:auto no botão empurra-o
       para o fundo dessa caixa, à mesma altura das bolinhas de paginação
       (bottom:20px dentro de .swiper). */
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .description {
      margin: 0;
      padding-bottom: 60px;
    }

    button {
      margin-top: auto;
      margin-bottom: 20px;
    }

    ${media.l`
      grid-column: unset;

      .description {
        padding-bottom: 0;
      }

      button {
        margin-top: 60px;
        margin-bottom: 0;
      }
    `}
  }
`;
