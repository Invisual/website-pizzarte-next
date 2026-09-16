import NextImage from "next/image";
import PropTypes from "prop-types";
import imageManifest from "../../lib/imageManifest.json";

// Substitui src/components/layout/image.js (Gatsby). Mesma API de superfície
// (`src` relativo a public/images/, `alt`, `extraClass`, resto das props
// passa através) para que os componentes portados não precisem de mudar a
// forma como chamam <Image>.
//
// Diferenças propositadas face ao original (ver plano de migração, bugs #2 e #3):
// - `alt` é obrigatório (o Gatsby fixava alt='' no ramo SVG e nunca propagava
//   o alt recebido para o GatsbyImage — todas as imagens ficavam sem texto
//   alternativo). Aqui é sempre usado.
// - GetURL() deixa de ser hook (useStaticQuery chamado condicionalmente em
//   components/layout/seo.js violava as Rules of Hooks) — é um lookup puro.
export function GetURL(src) {
  if (!src) return null;
  return `/images/${src}`;
}

export function Image({ src, alt, extraClass, priority = false, sizes, ...rest }) {
  if (!src) return null;

  const publicSrc = GetURL(src);

  if (src.toLowerCase().endsWith(".svg")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={publicSrc} alt={alt} className={extraClass} {...rest} />;
  }

  const meta = imageManifest[src];

  if (!meta) {
    // Imagem fora do manifesto (adicionada depois do último `prebuild`) —
    // cai para <img> simples em vez de rebentar a página.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={publicSrc} alt={alt} className={extraClass} {...rest} />;
  }

  return (
    <NextImage
      src={publicSrc}
      alt={alt}
      width={meta.w}
      height={meta.h}
      placeholder={meta.blurDataURL ? "blur" : undefined}
      blurDataURL={meta.blurDataURL}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      sizes={sizes}
      className={extraClass ? `${extraClass} image` : "image"}
      style={{ width: "100%", height: "auto" }}
      {...rest}
    />
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
  priority: PropTypes.bool,
  sizes: PropTypes.string,
};
