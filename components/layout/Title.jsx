import styled from "styled-components";
import { color, media } from "../style/style";

const PrimaryText = styled.h1`
  font-family: var(--font-british);
  margin: 0;
  text-transform: uppercase;
  font-size: 70px;
  font-weight: 200;
  -webkit-text-stroke: 1px ${color.red};
  color: transparent;

  ${media.l`
    font-size: 50px;
  `}

  ${media.m`
    font-size: 45px;
  `}
`;

const SecondaryText = styled.h1`
  font-family: var(--font-british);
  margin: 0;
  position: relative;
  top: -47px;
  color: ${color.red};
  text-transform: uppercase;
  font-size: 70px;
  font-weight: 200;

  ${media.l`
    font-size: 50px;
  `}

  ${media.m`
    font-size: 45px;
    top: -35px;
  `}
`;

const SimpleText = styled.h1`
  margin: 0;
  color: ${color.red};
  text-transform: uppercase;
  font-size: 60px;
  font-weight: 600;
  padding-bottom: 36px;

  ${media.l`
    font-size: 38px;
  `}
`;

export default function Title({ text, simple }) {
  if (simple) {
    // Sem spacer de âncora: o gap acima desta secção já vem do
    // main > * + * (app/globals.css) — um <h1 style={{paddingTop}}> extra
    // aqui somava-se a essa margem e duplicava o espaço antes do título
    // da categoria (ex: /menu/entradas).
    return <SimpleText>{simple}</SimpleText>;
  }

  return (
    <>
      <PrimaryText>{text}</PrimaryText>
      <SecondaryText>{text}</SecondaryText>
    </>
  );
}
