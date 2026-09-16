"use client";

import { useState, useEffect } from "react";
import { breakpoint } from "../components/style/style";

// Realinhado com components/style/style.js (antes usava os breakpoints do
// Bootstrap, que o projeto nunca usou). `l` (max-width: 1024px) é o
// equivalente do antigo useBreakpoint().md do Gatsby — o "é mobile?" usado
// em quase todas as páginas para decidir Swiper vertical/horizontal,
// número de títulos repetidos, drawer vs submenu, etc.
const queries = {
  xxl: `(max-width: ${breakpoint.xxl})`,
  xl: `(max-width: ${breakpoint.xl})`,
  l: `(max-width: ${breakpoint.l})`,
  m: `(max-width: ${breakpoint.m})`,
  s: `(max-width: ${breakpoint.s})`,
};

export function useBreakpoints() {
  const [breakpoints, setBreakpoints] = useState({
    xxl: false,
    xl: false,
    l: false,
    m: false,
    s: false,
  });

  useEffect(() => {
    const mediaQueries = Object.entries(queries).map(([key, query]) => ({
      key,
      mql: window.matchMedia(query),
    }));

    const updateBreakpoints = () => {
      setBreakpoints(Object.fromEntries(mediaQueries.map(({ key, mql }) => [key, mql.matches])));
    };

    updateBreakpoints();

    mediaQueries.forEach(({ mql }) => mql.addEventListener("change", updateBreakpoints));
    return () => {
      mediaQueries.forEach(({ mql }) => mql.removeEventListener("change", updateBreakpoints));
    };
  }, []);

  return breakpoints;
}
