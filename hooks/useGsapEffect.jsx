"use client";

import { useLayoutEffect } from "react";

// gsap lê Date.now() ao ser importado (inicializa o seu ticker interno) —
// se o módulo é avaliado durante o prerender estático (Next 16/PPR), a
// build falha com "unstable value Date.now() in a Client Component"
// (Next.js encontra o valor "congelado" no HTML gerado em build).
// Importar dentro do efeito garante que gsap só carrega no browser, depois
// de montar — nunca durante SSR/prerender, sem perder o conteúdo (texto,
// imagens) que continua a renderizar no servidor normalmente.
export function useGsapEffect(setup, deps = []) {
  useLayoutEffect(() => {
    let ctx;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, stModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.default;
      const ScrollTrigger = stModule.default;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => setup(gsap));
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
