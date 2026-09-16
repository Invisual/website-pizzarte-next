"use client";

import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";

// Substitui react-reveal/Fade (não mantido, avisos em React 18 e quebra em
// React 19 — ver plano de migração). Mesma API de superfície usada no
// projeto: <Reveal> e <Reveal delay={400}>, fade + slide-up ao entrar no
// viewport, uma vez, respeitando prefers-reduced-motion.
export default function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealWrapper ref={ref} $visible={visible} $delay={delay} className={className}>
      {children}
    </RevealWrapper>
  );
}

const RevealWrapper = styled.div`
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  transition-delay: ${(props) => props.$delay}ms;

  ${(props) =>
    props.$visible &&
    css`
      opacity: 1;
      transform: translateY(0);
    `}
`;
