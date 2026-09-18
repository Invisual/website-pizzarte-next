"use client";

import { useEffect } from "react";
import styled from "styled-components";
import Title from "../layout/Title";
import { Image } from "../layout/Image";
import Reveal from "../layout/Reveal";
import { media } from "../style/style";

// Fusão de menu/desktop/dishes.js + menu/mobile/dishesMobile.js — a lista de
// pratos de uma categoria. `id` no contentor + scroll-into-view mantido do
// original (mobile), agora aplicado sempre: útil ao vir de um link com
// âncora #slug (ex: partilhado ou back/forward do browser).
export default function Dishes({ data }) {
  const sectionId = data.menu.slug.replace("/", "");

  useEffect(() => {
    if (window.location.hash === `#${sectionId}`) {
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
      }
    }
  }, [sectionId]);

  return (
    <DishesContainer id={sectionId}>
      <div className="container-default">
        <Title simple={data.menu.title} />
      </div>
      <Image src={data.menu.image} alt={data.menu.title} extraClass="banner" sizes="100vw" priority />
      <div className="container-default">
        {data.menu.meals.map((group, index) => (
          <div key={index} className={index % 2 === 0 ? "dish-group" : "dish-group-reverse"}>
            <Reveal>
              <div className="text-side">
                {group.dishes.map((dish, dishIndex) => (
                  <div className="dish" key={dishIndex}>
                    <p className="name">
                      {dish.name} <span className="price-sep">-</span> <span className="price">{dish.price}</span>
                    </p>
                    {dish.ingredients && <p className="ingredients">{dish.ingredients}</p>}
                  </div>
                ))}
              </div>
            </Reveal>
            {group.image && (
              <Reveal>
                <div className="image-side">
                  <Image
                    src={group.image}
                    alt={`${data.menu.title} — pratos em destaque`}
                    extraClass="group-image"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </Reveal>
            )}
          </div>
        ))}
      </div>
    </DishesContainer>
  );
}

const DishesContainer = styled.div`
  .banner {
    width: 100%;
    height: auto;

    ${media.l`
      height: 25vh;
      object-fit: cover;
    `}
  }

  .dish-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10vh 0;

    ${media.l`
      flex-direction: column;
      margin: 40px 0;
    `}
  }

  .dish-group-reverse {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10vh;

    .text-side {
      text-align: right;
      width: 426px;
    }

    ${media.l`
      flex-direction: column;
      margin-bottom: 40px;

      .text-side {
        text-align: center;
        width: auto;
      }
    `}
  }

  .text-side {
    flex: 1;
    text-align: left;

    ${media.l`
      text-align: center;
    `}

    .dish {
      border-bottom: 1px solid #666;

      .name {
        text-transform: uppercase;
        margin-bottom: 5px;
        padding-bottom: 5px;
        font-weight: 700;
        font-size: 1.1vw;

        ${media.l`
          font-size: 4.5vw;
        `}
      }

      .price-sep {
        ${media.l`
          display: none;
        `}
      }

      .price {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 0.9vw;

        ${media.l`
          font-size: 3vw;
          display: block;
        `}
      }

      &:last-child {
        border-bottom: none;
      }

      .ingredients {
        text-transform: uppercase;

        ${media.l`
          font-size: 3vw;
        `}
      }
    }
  }

  .image-side {
    flex: 1;
    margin-left: 20px;

    ${media.l`
      margin-left: 0;
    `}
  }

  .group-image {
    width: 100%;
    height: auto;
  }
`;
