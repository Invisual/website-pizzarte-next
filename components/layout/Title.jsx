import styled from "styled-components";
import { color, media } from "../style/style";

// Heading real (AIO/SEO) — separado da camada decorativa. `level` escolhe a
// tag (h1/h2/h3...); sem `level`, não há heading nenhum aqui (usado quando a
// página já tem o seu h1 real noutro sítio, ex: MenuNavigation duplica o
// título de Dishes).
//
// A pergunta AIO (H1/H2 em forma de pergunta, ver docs/03 - AIO) existe
// sempre só para leitores de ecrã/motores de busca — visualmente escondida.
// A camada decorativa já mostra o título normal da secção.
const VisuallyHidden = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

// Camada puramente decorativa (efeito contorno + preenchido) — nunca
// carrega semântica própria, por isso é sempre <p aria-hidden> e nunca
// heading. Preserva explicitamente line-height/letter-spacing do antigo
// reset global de `h1` (app/globals.css) para não haver diferença de
// pixel ao deixar de ser h1.
const PrimaryText = styled.p`
  font-family: var(--font-british);
  margin: 0;
  line-height: var(--line-height-dense);
  letter-spacing: -0.01em;
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

const SecondaryText = styled.p`
  font-family: var(--font-british);
  margin: 0;
  line-height: var(--line-height-dense);
  letter-spacing: -0.01em;
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

const SimpleText = styled.p`
  margin: 0;
  line-height: var(--line-height-dense);
  letter-spacing: -0.01em;
  color: ${color.red};
  text-transform: uppercase;
  font-size: 60px;
  font-weight: 600;
  padding-bottom: 36px;

  ${media.l`
    font-size: 38px;
  `}
`;

export default function Title({ text, simple, question, level }) {
  const displayText = simple ?? text;
  const heading = level ? <VisuallyHidden as={level}>{question ?? displayText}</VisuallyHidden> : null;

  if (simple) {
    // Sem spacer de âncora: o gap acima desta secção já vem do
    // main > * + * (app/globals.css) — um <h1 style={{paddingTop}}> extra
    // aqui somava-se a essa margem e duplicava o espaço antes do título
    // da categoria (ex: /menu/entradas).
    return (
      <>
        {heading}
        <SimpleText aria-hidden="true">{simple}</SimpleText>
      </>
    );
  }

  return (
    <>
      {heading}
      <PrimaryText aria-hidden="true">{text}</PrimaryText>
      <SecondaryText aria-hidden="true">{text}</SecondaryText>
    </>
  );
}
