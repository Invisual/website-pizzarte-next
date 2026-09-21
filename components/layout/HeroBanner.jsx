import { getImageProps } from "next/image";
import imageManifest from "../../lib/imageManifest.json";
import { breakpoint } from "../style/style";

// Banner do topo da homepage — o elemento LCP da página. Gatsby escolhia
// entre "banner-mobile.webp" e "_MG_7941.webp" em runtime (useBreakpoint,
// só depois de hidratar). Aqui é um <picture> nativo: o browser decide qual
// pedir ANTES de descarregar — nunca busca as duas, ao contrário de duas
// <Image> alternadas por CSS display:none (Fase 6 do plano de migração).
//
// getImageProps (em vez de apontar direto ao ficheiro em public/images/)
// passa o LCP pelo otimizador do Next — srcset responsivo + AVIF/WebP —
// mantendo a decisão de qual imagem pedir no <picture>/<source> nativo,
// antes do download.
export default function HeroBanner({ desktopSrc, mobileSrc, alt }) {
  const desktop = imageManifest[desktopSrc];
  const mobile = imageManifest[mobileSrc];
  if (!desktop || !mobile) return null;

  const common = { alt, fetchPriority: "high", priority: true, sizes: "100vw" };

  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({ ...common, src: `/images/${mobileSrc}`, width: mobile.w, height: mobile.h });

  const {
    props: { srcSet: desktopSrcSet, ...desktopImgProps },
  } = getImageProps({ ...common, src: `/images/${desktopSrc}`, width: desktop.w, height: desktop.h });

  return (
    <picture>
      {/* width/height no <source>: o <img> traz as dimensões do desktop, por
          isso sem isto o browser reserva a proporção 16:9 e, ao escolher a
          imagem mobile (430x584), o banner cresce e empurra a página toda
          (CLS ~0.2 medido em Lighthouse mobile). */}
      <source media={`(max-width: ${breakpoint.l})`} srcSet={mobileSrcSet} width={mobile.w} height={mobile.h} />
      <source srcSet={desktopSrcSet} width={desktop.w} height={desktop.h} />
      <img {...desktopImgProps} alt={alt} style={{ width: "100%", height: "auto", display: "block" }} />
    </picture>
  );
}
