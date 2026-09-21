"use client";

import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";

// Substitui react-reveal/Fade (não mantido, avisos em React 18 e quebra em
// React 19 — ver plano de migração). Mesma API de superfície usada no
// projeto: <Reveal> e <Reveal delay={400}>, fade + slide-up ao entrar no
// viewport, uma vez, respeitando prefers-reduced-motion.
//
// O HTML do servidor sai VISÍVEL. Só depois de hidratar é que o primeiro
// callback do IntersectionObserver decide: já no viewport → fica como está
// (sem animação); abaixo da dobra → esconde e revela quando lá chegar. O
// inverso (opacity:0 no SSR) escondia o conteúdo acima da dobra — incluindo
// o LCP de /pizzarte — até o JS carregar e hidratar (LCP ~9s no Lighthouse
// mobile, com o texto já no HTML).
export default function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          observer.disconnect();
        } else {
          setHidden(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealWrapper ref={ref} $hidden={hidden} $delay={delay} className={className}>
      {children}
    </RevealWrapper>
  );
}

const RevealWrapper = styled.div`
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  transition-delay: ${(props) => props.$delay}ms;

  ${(props) =>
    props.$hidden &&
    css`
      opacity: 0;
      transform: translateY(20px);
    `}
`;
