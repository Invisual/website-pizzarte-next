"use client";

import { createContext, useContext } from "react";

export const PopupContext = createContext();

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) throw new Error("usePopup deve estar dentro do PopupContext.Provider");
  return context;
};
