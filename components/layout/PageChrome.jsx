"use client";

import { useState } from "react";
import { PopupContext } from "../../utils/PopupContext";
import FloatingOrder from "./FloatingOrder";
import PopupOrderNow from "../popup/PopupOrderNow";

// Substitui src/components/layout/layout.js (Gatsby).
//
// - Bug #1: no Gatsby, `loading` arrancava a `true` na página inicial e
//   <main> só era montado depois de 4500ms — nada de indexável no HTML
//   inicial, LCP garantido ≥4,5s. Aqui {children} está sempre montado
//   desde o início (sem overlay de intro por cima).
// - Bug #15: removido o window.scrollTo(0,0) forçado no mount — conflitua
//   com a restauração de scroll do browser ao navegar "para trás".
export default function PageChrome({ children, dataPopup }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <PopupContext.Provider
      value={{
        isPopupOpen,
        handleOpenPopup: () => setIsPopupOpen(true),
        handleClosePopup: () => setIsPopupOpen(false),
      }}
    >
      {children}

      <FloatingOrder />
      <PopupOrderNow isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} data={dataPopup} />
    </PopupContext.Provider>
  );
}
