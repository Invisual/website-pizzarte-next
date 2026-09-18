"use client";

import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Button from "../layout/Button";
import { Image } from "../layout/Image";
import { color, media, hover } from "../style/style";

// Portado de about/desktop/imageGallery.js. Mudanças:
// - react-masonry-component saiu (dependência a menos) — grelha masonry
//   via CSS columns, mais leve, sem JS de layout.
// - imagens locais (content/gallery.json + public/images/galeria/) via
//   <Image>, com blur placeholder e lazy loading automáticos, em vez de
//   <img src={link}> a apontar para media.pizzarte.com sem otimização.
// - lightbox ganha Escape para fechar e role="dialog" (não tinha nenhum
//   suporte de teclado no original).
// - removido um console.log(filteredImages) que ficou em produção.
export default function ImageGallery({ filter, galleries }) {
  const [visibleCount, setVisibleCount] = useState(7);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null);
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    const current = galleries[filter] || [];
    setShuffledImages(filter === "all" ? shuffleArray([...current]) : current);
    setVisibleCount(7);
  }, [filter, galleries]);

  const visibleImages = shuffledImages.slice(0, visibleCount);

  const closeFullscreen = useCallback(() => setFullscreenImageIndex(null), []);
  const nextImage = useCallback(
    () => setFullscreenImageIndex((i) => (i + 1) % shuffledImages.length),
    [shuffledImages.length]
  );
  const prevImage = useCallback(
    () => setFullscreenImageIndex((i) => (i - 1 + shuffledImages.length) % shuffledImages.length),
    [shuffledImages.length]
  );

  useEffect(() => {
    if (fullscreenImageIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeFullscreen();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [fullscreenImageIndex, closeFullscreen, nextImage, prevImage]);

  return (
    <ImageGalleryStyled>
      <div className="image-gallery">
        {visibleImages.map((image, index) => (
          <div key={image.src} className="image-wrapper" onClick={() => setFullscreenImageIndex(index)}>
            <Image src={image.src} alt={image.alt} extraClass="gallery-thumb" sizes="(max-width: 700px) 50vw, 22vw" />
          </div>
        ))}
      </div>

      {visibleCount < shuffledImages.length && (
        <div className="show-more">
          <Button normal button="ver mais" onClick={() => setVisibleCount((c) => c + 7)} />
        </div>
      )}

      {fullscreenImageIndex !== null && shuffledImages[fullscreenImageIndex] && (
        <FullscreenImage role="dialog" aria-modal="true" aria-label="Imagem em ecrã inteiro">
          <div className="image-container">
            <Image
              src={shuffledImages[fullscreenImageIndex].src}
              alt={shuffledImages[fullscreenImageIndex].alt}
              extraClass="fullscreen-image"
              sizes="800px"
              priority
            />
          </div>
          {shuffledImages.length > 1 && (
            <div className="button-glr">
              <button className="prev-button" onClick={prevImage} aria-label="Imagem anterior">{`<`}</button>
              <button className="next-button" onClick={nextImage} aria-label="Imagem seguinte">{`>`}</button>
            </div>
          )}
          <button className="close-button" onClick={closeFullscreen} aria-label="Fechar">
            X
          </button>
        </FullscreenImage>
      )}
    </ImageGalleryStyled>
  );
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ImageGalleryStyled = styled.div`
  padding-top: 50px;

  .image-gallery {
    columns: 4;
    column-gap: 1vw;

    ${media.l`
      columns: 2;
    `}
  }

  .image-wrapper {
    break-inside: avoid;
    margin-bottom: 1vw;
    overflow: hidden;
    cursor: zoom-in;
    transition: transform 0.3s;
  }

  ${hover`
    .image-wrapper:hover {
      transform: scale(1.05);
    }
  `}

  .gallery-thumb {
    width: 100%;
    height: auto;
    display: block;
  }

  .show-more {
    margin: 80px auto;
    display: flex;
    justify-content: center;
  }
`;

const FullscreenImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .image-container {
    position: relative;
    width: 80%;
    max-width: 800px;
    text-align: center;
  }

  .fullscreen-image {
    max-width: 100%;
    max-height: 80vh;
    width: auto;
    height: auto;
    margin-bottom: 20px;
  }

  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #fff;
    background: transparent;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #fff;
    cursor: pointer;

    ${hover`
      &:hover {
        background: ${color.red};
        border: 1px solid ${color.red};
      }
    `}
  }

  .button-glr {
    position: absolute;
    bottom: 20px;
    display: flex;
    gap: 20px;

    .prev-button,
    .next-button {
      color: #fff;
      background: transparent;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 1px solid #fff;
      cursor: pointer;

      ${hover`
        &:hover {
          background: ${color.red};
          border: 1px solid ${color.red};
        }
      `}
    }
  }
`;
