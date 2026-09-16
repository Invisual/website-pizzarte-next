"use client";

import { useEffect } from "react";

// Mesmo motivo do hooks/useGsapEffect.jsx: anime.js também lê o relógio ao
// carregar — import dinâmico dentro do efeito evita que isso aconteça
// durante o prerender estático.
export function useAnimeEffect(setup, deps = []) {
  useEffect(() => {
    let cancelled = false;

    import("animejs/lib/anime.es.js").then((mod) => {
      if (cancelled) return;
      setup(mod.default);
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
