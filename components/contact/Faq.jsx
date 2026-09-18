"use client";

import { useId, useState } from "react";
import styled from "styled-components";
import { color, media } from "../style/style";

// FAQ visível — tem de ficar sempre alinhada com o FAQPage schema em
// app/[locale]/contactos/page.jsx (buildFaqSchema lê este mesmo array).
// O Google desqualifica FAQPage sem contrapartida visível na página, por
// isso schema e conteúdo lêem sempre a mesma fonte (contact.faq.items).
// Perguntas ficam sempre visíveis (são o trigger do accordion); só a
// resposta abre/fecha, uma de cada vez.
export default function Faq({ data }) {
  const items = data?.items;
  const idPrefix = useId();
  const [openIndex, setOpenIndex] = useState(0);

  if (!items?.length) return null;

  return (
    <FaqStyled>
      <div className="container-default">
        <h2>{data.question}</h2>
        <dl>
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const questionId = `${idPrefix}-question-${index}`;
            const answerId = `${idPrefix}-answer-${index}`;

            return (
              <div className="faq-item" key={index} data-open={isOpen}>
                <dt>
                  <h3>
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      {item.question}
                      <span className="icon" aria-hidden="true" />
                    </button>
                  </h3>
                </dt>
                <dd id={answerId} role="region" aria-labelledby={questionId}>
                  <div className="answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </FaqStyled>
  );
}

const FaqStyled = styled.div`
  margin-top: 80px;

  ${media.l`
    margin-top: 60px;
  `}

  h2 {
    font-family: var(--font-british);
    color: ${color.red};
    text-transform: uppercase;
    font-weight: 200;
    font-size: 60px;
    margin: 0 0 32px;

    ${media.l`
      font-size: 38px;
    `}
  }

  dl {
    margin: 0;
  }

  .faq-item {
    border-bottom: 1px solid #e5e1da;

    &:last-child {
      border-bottom: none;
    }

    &:first-child button {
      padding-top: 0;
    }
  }

  dt h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }

  dt button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 24px 0;
    background: none;
    border: none;
    font: inherit;
    color: inherit;
    text-align: left;
    cursor: pointer;
  }

  .icon {
    position: relative;
    flex-shrink: 0;
    width: 14px;
    height: 14px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      background: ${color.red};
      transition: transform 0.3s ease;
    }

    &::before {
      width: 100%;
      height: 2px;
      transform: translate(-50%, -50%);
    }

    &::after {
      width: 2px;
      height: 100%;
      transform: translate(-50%, -50%);
    }
  }

  .faq-item[data-open="true"] .icon::after {
    transform: translate(-50%, -50%) rotate(90deg);
    opacity: 0;
  }

  dd {
    margin: 0;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;
  }

  .faq-item[data-open="true"] dd {
    grid-template-rows: 1fr;
  }

  .answer-inner {
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .faq-item[data-open="true"] .answer-inner {
    opacity: 1;
    transition: opacity 0.3s ease 0.1s;
  }

  p {
    margin: 0;
    padding-bottom: 24px;
    color: #666666;
  }
`;
