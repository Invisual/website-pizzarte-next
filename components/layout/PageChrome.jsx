"use client";

import { useState, useEffect } from "react";
import { PopupContext } from "../../utils/PopupContext";
import { prefersReducedMotion } from "../../utils/prefersReducedMotion";
import FloatingOrder from "./FloatingOrder";
import Loader from "./Loader";
import PopupOrderNow from "../popup/PopupOrderNow";

const LOADER_SESSION_KEY = "pizzarte-loader-shown";

// Substitui src/components/layout/layout.js (Gatsby). Duas correções
// deliberadas face ao original (ver plano de migração):
//
// - Bug #1: no Gatsby, `loading` arrancava a `true` na página inicial e
//   <main> só era montado depois de 4500ms — nada de indexável no HTML
//   inicial, LCP garantido ≥4,5s. Aqui {children} está sempre montado; o
//   Loader é apenas um overlay decorativo por cima, opcional, 1x/sessão via
//   sessionStorage, e desligado com prefers-reduced-motion.
// - Bug #15: removido o window.scrollTo(0,0) forçado no mount — conflitua
//   com a restauração de scroll do browser ao navegar "para trás".
export default function PageChrome({ children, home, dataLoader, dataPopup }) {
  const [showLoader, setShowLoader] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (!home || prefersReducedMotion()) return;

    try {
      if (sessionStorage.getItem(LOADER_SESSION_KEY)) return;
      sessionStorage.setItem(LOADER_SESSION_KEY, "1");
    } catch {
      // sessionStorage indisponível (modo privado) — mostra o loader na mesma,
      // só não persiste a preferência entre páginas.
    }

    setShowLoader(true);
  }, [home]);

  return (
    <PopupContext.Provider
      value={{
        isPopupOpen,
        handleOpenPopup: () => setIsPopupOpen(true),
        handleClosePopup: () => setIsPopupOpen(false),
      }}
    >
      {children}

      {showLoader && <Loader dataLoader={dataLoader} onDone={() => setShowLoader(false)} />}

      <FloatingOrder />
      <PopupOrderNow isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} data={dataPopup} />
    </PopupContext.Provider>
  );
}
