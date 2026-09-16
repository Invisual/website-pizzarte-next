import imageManifest from "../../lib/imageManifest.json";
import { breakpoint } from "../style/style";

// Banner do topo da homepage — o elemento LCP da página. Gatsby escolhia
// entre "banner-mobile.webp" e "_MG_7941.webp" em runtime (useBreakpoint,
// só depois de hidratar). Aqui é um <picture> nativo: o browser decide qual
// pedir ANTES de descarregar — nunca busca as duas, ao contrário de duas
// <Image> alternadas por CSS display:none (Fase 6 do plano de migração).
export default function HeroBanner({ desktopSrc, mobileSrc, alt }) {
  const desktop = imageManifest[desktopSrc];
  const mobile = imageManifest[mobileSrc];
  if (!desktop || !mobile) return null;

  return (
    <picture>
      <source media={`(max-width: ${breakpoint.l})`} srcSet={`/images/${mobileSrc}`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/images/${desktopSrc}`}
        width={desktop.w}
        height={desktop.h}
        alt={alt}
        fetchPriority="high"
        loading="eager"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </picture>
  );
}
