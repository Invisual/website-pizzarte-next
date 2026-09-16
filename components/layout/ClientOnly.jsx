"use client";

import { useState, useEffect } from "react";

// Swiper lê Date.now() durante o próprio render inicial (não só em efeitos)
// — impossível de prerenderizar estaticamente (mesmo motivo do
// hooks/useGsapEffect.jsx, mas a biblioteca não dá controlo sobre isso).
// Usado só à volta do carrossel em si (FoodSlider, BarDrinks,
// PizzarteInfo) — o resto de cada secção (títulos, texto, imagens) continua
// a renderizar no servidor normalmente. O conteúdo destes carrosséis
// específicos também existe, indexável, nas páginas /menu/[slug]
// correspondentes — não é a única fonte desses dados no site.
export default function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children : fallback;
}
