import { css } from "styled-components";

// Design tokens portados de src/components/style/style.js (Gatsby), sem
// alterações — é a base de todo o CSS-in-JS dos componentes fundidos.
export const breakpoint = {
  xxxl: "1921px",
  xxl: "1560px",
  xl: "1200px",
  l: "1024px",
  m: "700px",
  s: "500px",
};

export const media = {
  xxxl: (...args) => css`
    @media screen and (min-width: ${breakpoint.xxxl}) {
      ${css(...args)}
    }
  `,
  xxl: (...args) => css`
    @media screen and (max-width: ${breakpoint.xxl}) {
      ${css(...args)}
    }
  `,
  xl: (...args) => css`
    @media screen and (max-width: ${breakpoint.xl}) {
      ${css(...args)}
    }
  `,
  l: (...args) => css`
    @media screen and (max-width: ${breakpoint.l}) {
      ${css(...args)}
    }
  `,
  m: (...args) => css`
    @media screen and (max-width: ${breakpoint.m}) {
      ${css(...args)}
    }
  `,
  s: (...args) => css`
    @media screen and (max-width: ${breakpoint.s}) {
      ${css(...args)}
    }
  `,
};

export const color = {
  red: "#FF0000",
};

// Dispositivos touch não têm rato — :hover fica "preso" após um tap. Este
// helper garante que efeitos de hover só disparam em ecrãs com rato real.
export const hover = (...args) => css`
  @media (hover: hover) and (pointer: fine) {
    ${css(...args)}
  }
`;
