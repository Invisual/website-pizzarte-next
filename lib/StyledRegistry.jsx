"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

// Sem isto, o CSS-in-JS de styled-components só existe depois da hidratação
// no cliente: primeiro paint sem estilo (flash), e conflito de classes entre
// server e client. Ver .repowiki/FAQ — compiler.styledComponents:true (SWC)
// só ativa a transformação de babel-plugin-styled-components; o streaming do
// CSS para o <head> do SSR precisa deste registry.
export default function StyledRegistry({ children }) {
  const [sheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement();
    sheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return children;

  return (
    <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
}
