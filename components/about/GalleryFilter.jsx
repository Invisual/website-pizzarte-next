"use client";

import { useQueryState } from "nuqs";
import styled from "styled-components";
import ImageGallery from "./ImageGallery";
import MobileFilterDropdown from "../layout/MobileFilterDropdown";
import { breakpoint, media } from "../style/style";

// Fusão de about/desktop/galleryFilter.js (a versão mobile nunca existiu à
// parte — a página /galeria só tinha a árvore desktop no Gatsby). Duas
// correções face ao original (ver plano de migração, Bug #8):
// - filtra de imediato, sem o LoaderPage artificial de 3s a cada clique;
// - `filtro` vive na URL via nuqs (?filtro=bar) — partilhável e indexável,
//   em vez de useState local.
//
// O <h1> da página NÃO vive aqui — vive em galeria/page.jsx, fora do
// Suspense. Este componente usa useQueryState (nuqs → useSearchParams),
// que força o Suspense boundary a renderizar `fallback={null}` no HTML
// estático (PPR): qualquer heading dentro de GalleryFilter só apareceria
// depois de hidratar no cliente, invisível a qualquer crawler que não
// execute JavaScript.
export default function GalleryFilter({ galleries, filters }) {
  const [filter, setFilter] = useQueryState("filtro", { defaultValue: "all" });
  const activeFilter = filters?.find((f) => f.slug === filter);

  return (
    <GalleryStyled>
      <div className="container-default">
        <div className="filter-buttons">
          {filters?.map((f) => (
            <div key={f.slug} className={filter === f.slug ? "active" : "desactive"} onClick={() => setFilter(f.slug)}>
              {f.displayName}
            </div>
          ))}
        </div>
        <MobileFilterDropdown activeLabel={activeFilter?.displayName}>
          {filters?.map((f) => (
            <div key={f.slug} className={filter === f.slug ? "active" : undefined} onClick={() => setFilter(f.slug)}>
              {f.displayName}
            </div>
          ))}
        </MobileFilterDropdown>
        <ImageGallery filter={filter} galleries={galleries} />
      </div>
    </GalleryStyled>
  );
}

const GalleryStyled = styled.div`
  /* Título e filtros são filhos diretos de <main> (h1 fica fora do Suspense
     de propósito — ver comentário em GalleryFilter). Isso apanha o gap de
     main > * + * (--space-section, 150px) do CSS global. Em /menu o título
     e os tabs vivem no mesmo bloco (MenuNavigation), sem esse gap — anula-se
     aqui para os dois ficarem com a mesma margem no desktop. */
  margin-top: 0;

  .filter-buttons {
    display: flex;
    gap: 1rem;
    position: relative;
    color: #000;
    padding-bottom: 1.5rem;
    cursor: pointer;
    text-transform: capitalize;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 2px;
      background-color: rgba(255, 0, 0, 0.3);
      bottom: 0;
      left: 0;
    }

    .desactive,
    .active {
      position: relative;
      transition: color 0.3s ease, font-weight 0.3s ease;

      &::after {
        content: "";
        position: absolute;
        bottom: -1.5rem;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #ff0000;
        z-index: 1;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s ease;
      }
    }

    .active {
      font-weight: 600;

      &::after {
        transform: scaleX(1);
      }
    }
  }

  @media screen and (min-width: ${breakpoint.l}) and (hover: hover) {
    .desactive:hover {
      color: #ff0000;

      &::after {
        transform: scaleX(1);
      }
    }
  }

  ${media.l`
    margin-top: 20px;

    .filter-buttons {
      display: none;
    }
  `}
`;
