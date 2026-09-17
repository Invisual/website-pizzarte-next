"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import { color, media, hover } from "../style/style";
import { HandlePhone } from "../../utils/handlePhone";

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Portado quase inalterado de src/components/popup/popupOrderNow.js — já era
// um modal acessível bem construído (role=dialog, focus trap, Escape,
// restaura o foco anterior ao fechar). Ícones pequenos (call/shop, stores)
// continuam fora do sistema <Image> — tal como no original, que também os
// importava à parte do wrapper GatsbyImage (fazem sentido como <img> simples
// a tamanho fixo, não como conteúdo "full width").
export default function PopupOrderNow({ isOpen, onClose, data }) {
  const popupRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key !== "Tab" || !popupRef.current) return;

      const focusable = popupRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const storeImages = {
    "google-play": "/images/Homepage/popup/google.png",
    "app-store": "/images/Homepage/popup/apple.png",
  };

  const trackClick = (eventName) => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, {
        event_category: "popupOrderNow",
        event_label: eventName,
      });
    }
  };

  return (
    <Overlay onClick={onClose}>
      <PopupCard
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-order-now-title"
      >
        <CloseButton ref={closeButtonRef} onClick={onClose} aria-label="Fechar">
          &times;
        </CloseButton>

        <Content>
          <PrimaryText id="popup-order-now-title">{data?.title}</PrimaryText>
          <SecondaryText aria-hidden="true">{data?.title}</SecondaryText>
          <Subtitle>{data?.subtitle}</Subtitle>

          <ButtonGroup>
            {data?.buttons?.map((btn) => (
              <ActionButton
                key={btn.id}
                href={btn.link}
                target={btn.id === "shop" ? "_blank" : undefined}
                onClick={(e) => {
                  if (btn.id === "shop") trackClick("shop");
                  if (btn.id === "call") {
                    e.preventDefault();
                    HandlePhone(btn.link);
                  }
                }}
              >
                <span>{btn.text}</span>
                {btn?.icon && (
                  <IconWrapper>
                    <IconDefault>
                      <img src={`/images/${btn.icon}`} alt="" />
                    </IconDefault>
                    <IconHover>
                      <img src={`/images/${btn.iconHover}`} alt="" />
                    </IconHover>
                  </IconWrapper>
                )}
              </ActionButton>
            ))}
          </ButtonGroup>

          <AppFooter>
            <AppText dangerouslySetInnerHTML={{ __html: data?.appSection?.text }} />
            <StoreButtons>
              {data?.appSection?.stores?.map((store) => (
                <a
                  key={store.id}
                  href={store.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackClick("aplicacao")}
                >
                  <img src={storeImages[store.id]} alt={store.id} />
                </a>
              ))}
            </StoreButtons>
          </AppFooter>
        </Content>
      </PopupCard>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(51, 51, 51, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const PopupCard = styled.div`
  width: 440px;
  height: 420px;
  background: #f4f4f4;
  border-radius: 40px;
  box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  opacity: 1;

  ${media.m`
    width: 90vw;
    height: auto;
    padding: 30px 24px;
  `}
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 25px;
  background: none;
  border: none;
  font-size: 30px;
  color: ${color.red};
  cursor: pointer;
  line-height: 1;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%;
`;

const PrimaryText = styled.p`
  font-family: var(--font-british);
  margin: 0;
  text-transform: uppercase;
  font-size: 2.5rem;
  font-weight: 200;
  -webkit-text-stroke: 1px ${color.red};
  color: transparent;
  line-height: 0.8;

  ${media.l`font-size: 50px;`}
  ${media.m`font-size: 45px;`}
`;

const SecondaryText = styled.p`
  font-family: var(--font-british);
  margin: 0;
  color: ${color.red};
  text-transform: uppercase;
  font-size: 2.5rem;
  font-weight: 200;
  margin-top: -30px;

  ${media.l`font-size: 50px;`}
  ${media.m`font-size: 45px;`}
`;

const Subtitle = styled.p`
  color: #000;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 0.875rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  position: relative;
`;

const IconDefault = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const IconHover = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ActionButton = styled.a`
  border: 1px solid ${color.red};
  color: ${color.red};
  border-radius: 50px;
  padding: 8px 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.2s ease-in-out;

  span {
    line-height: 1;
    font-size: 14px;
  }

  ${hover`
    &:hover {
      background-color: ${color.red};
      color: white;

      ${IconDefault} {
        display: none;
      }

      ${IconHover} {
        display: flex;
      }
    }
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-grow: 1;
  justify-content: center;
`;

const StoreButtons = styled.div`
  display: flex;
  gap: 20px;

  img {
    height: 40px;
    cursor: pointer;
  }
`;

const AppFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  padding-top: 20px;
`;

const AppText = styled.div`
  color: #000;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: center;
  line-height: 1.2;
  text-transform: uppercase;

  span,
  b,
  strong {
    color: ${color.red};
  }

  p {
    margin: 0;
  }
`;
