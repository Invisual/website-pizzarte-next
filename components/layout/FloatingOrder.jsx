"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { color, hover } from "../style/style";
import { usePopup } from "../../utils/PopupContext";

// Opacidade ligada à fração do footer realmente visível no ecrã (via
// IntersectionObserver), não a uma distância de scroll em px — assim é
// imune à altura da página/footer (que varia muito: contactos é uma
// página curta, a home é longa). Fica 100% opaco até o footer começar a
// entrar no ecrã, e só fica totalmente invisível quando HIDE_AT_RATIO da
// altura do footer já estiver visível.
const HIDE_AT_RATIO = 0.5;
const THRESHOLDS = Array.from({ length: 51 }, (_, i) => i / 50);

// Portado de src/components/layout/floatingOrder.js (Gatsby) — lá dentro
// estava (por engano) exportado como `FloatingIcons`, nome do componente
// morto ao lado (floatingIcons.js, nunca renderizado). Renomeado aqui para
// o que realmente é: o botão fixo "Encomenda já".
export default function FloatingOrder() {
  const { handleOpenPopup } = usePopup();
  const t = useTranslations("home");
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visibleRatio = entry.isIntersecting ? entry.intersectionRatio : 0;
        setOpacity(Math.min(1, Math.max(0, 1 - visibleRatio / HIDE_AT_RATIO)));
      },
      { threshold: THRESHOLDS }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <FixedContainer $opacity={opacity} onClick={handleOpenPopup}>
      <IconContainer $hoverIcon="/images/Homepage/shopping-cart-icon-white.svg">
        <Text>{t("callButton.text")}</Text>
        <Icon src="/images/Homepage/shopping-cart-icon.svg" alt="Encomendar" />
      </IconContainer>
    </FixedContainer>
  );
}

const FixedContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 10000;
  opacity: ${(props) => props.$opacity};
  pointer-events: ${(props) => (props.$opacity === 0 ? "none" : "auto")};
  transition: opacity 0.15s linear;
`;

const IconContainer = styled.div`
  background-color: #fff;
  color: ${color.red};
  border: 1px solid #ddd;
  border-radius: 100px 0 0 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 30px 10px 20px;
  cursor: pointer;
  transition: width 0.3s;
  overflow: hidden;
  position: relative;
  gap: 10px;
  width: auto;

  ${hover`
    &:hover {
      background: ${color.red};
      color: #fff;
    }

    &:hover img {
      content: url(${(props) => props.$hoverIcon});
    }
  `}
`;

const Icon = styled.img`
  width: 12px;
  height: 15px;
`;

const Text = styled.span`
  white-space: nowrap;
`;
