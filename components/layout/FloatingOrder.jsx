"use client";

import styled from "styled-components";
import { useTranslations } from "next-intl";
import { color, hover } from "../style/style";
import { usePopup } from "../../utils/PopupContext";

// Portado de src/components/layout/floatingOrder.js (Gatsby) — lá dentro
// estava (por engano) exportado como `FloatingIcons`, nome do componente
// morto ao lado (floatingIcons.js, nunca renderizado). Renomeado aqui para
// o que realmente é: o botão fixo "Encomenda já".
export default function FloatingOrder() {
  const { handleOpenPopup } = usePopup();
  const t = useTranslations("home");

  return (
    <FixedContainer onClick={handleOpenPopup}>
      <IconContainer hoverIcon="/images/Homepage/shopping-cart-icon-white.svg">
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
      content: url(${(props) => props.hoverIcon});
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
