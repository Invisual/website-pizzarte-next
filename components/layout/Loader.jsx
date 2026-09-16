"use client";

import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { color } from "../style/style";

// Portado de src/components/layout/loader.js (Gatsby), com a duração
// comprimida de 5s para 1,3s — ver Bug #1 do relatório de migração: no
// site antigo este loader SUBSTITUÍA <main> durante 4500ms (nada de
// indexável no HTML inicial, LCP ≥4,5s). Aqui é sempre um overlay por
// cima do conteúdo já renderizado (ver components/layout/PageChrome.jsx),
// por isso a duração deixou de ter de acomodar o tempo de carregamento —
// é puramente decorativo, uma vez por sessão.
export default function Loader({ dataLoader, onDone }) {
  const [text, setText] = useState(dataLoader?.firstText);

  useEffect(() => {
    const swapText = setTimeout(() => setText(dataLoader?.secondText), 500);
    const finish = setTimeout(() => onDone?.(), 1300);
    return () => {
      clearTimeout(swapText);
      clearTimeout(finish);
    };
  }, [dataLoader, onDone]);

  return (
    <LoaderContainer>
      <Text>{text}</Text>
      <CurtainLeft />
      <CurtainRight />
    </LoaderContainer>
  );
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideOut = keyframes`
  0% { width: 50vw; }
  100% { width: 0; }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${color.red};
  z-index: 9999;
`;

const Text = styled.div`
  position: absolute;
  font-size: 3rem;
  text-transform: uppercase;
  color: #fff;
  animation: ${fadeIn} 0.4s ease-in-out;
  z-index: 99;
  font-family: var(--font-british);
`;

const Curtain = styled.div`
  position: absolute;
  top: 0;
  width: 50vw;
  height: 100vh;
  background: url("/images/curtain.webp") no-repeat center center;
  background-size: cover;
  z-index: 1;
`;

const CurtainLeft = styled(Curtain)`
  left: 0;
  animation: ${slideOut} 0.7s ease-in-out 0.4s forwards;
`;

const CurtainRight = styled(Curtain)`
  right: 0;
  transform: scaleX(-1);
  animation: ${slideOut} 0.7s ease-in-out 0.4s forwards;
`;
