"use client";

import { useState } from "react"; // 1. Importar o useState
import RevealSlideAndFade from "../RevealSlideAndFade";
import GeneralButton from "../buttons/GeneralButton";
import Image from "next/image";

const NewsPagination = ({ news, button, more, mobile }) => {
  // 2. Estado para controlar quantos itens mostrar (começa com 5)
  const [visibleCount, setVisibleCount] = useState(5);

  // Inverter a lista conforme você já estava fazendo
  const reversedNews = news?.length > 0 ? [...news].reverse() : [];

  // 3. Cortar o array para mostrar apenas a quantidade permitida
  const currentNews = reversedNews.slice(0, visibleCount);

  // Função para carregar mais 5
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <div
      className="container-news-section-with-pagination margin-container mt-0 mb-0"
      id="news-top"
    >
      {currentNews.map((item, index) => (
        <div key={"project" + index}>
          <div className="container-news position-relative pt-5 pb-5">
            <RevealSlideAndFade>
              <div>
                <Image
                  fill={true}
                  src={item.frontmatter.image}
                  alt={item.frontmatter.title}
                  className="img-news w-100"
                  title={item.frontmatter.title}
                />
              </div>
            </RevealSlideAndFade>

            <div className="container-info">
              <RevealSlideAndFade delay="50">
                <p
                  className={
                    mobile
                      ? "fs-6 KLight black text-uppercase"
                      : "fs-5 KLight black text-uppercase"
                  }
                >
                  {item.frontmatter.date}
                </p>
              </RevealSlideAndFade>

              <RevealSlideAndFade delay="60">
                <h2
                  className={
                    mobile ? "fs-4 KLight black" : "fs-1 KMedium black"
                  }
                  dangerouslySetInnerHTML={{ __html: item.frontmatter.title }}
                />
              </RevealSlideAndFade>

              <RevealSlideAndFade delay="70">
                <p
                  className={mobile ? "fs-6 KLight black" : "fs-4 KLight black"}
                  dangerouslySetInnerHTML={{
                    __html: item?.frontmatter?.excerpt?.slice(0, 150) + "...",
                  }}
                />
              </RevealSlideAndFade>

              <RevealSlideAndFade delay="80">
                <GeneralButton
                  link={`/noticias/${item.frontmatter.slug}`}
                  text={button.text}
                />
              </RevealSlideAndFade>
            </div>
          </div>
          <hr />
        </div>
      ))}

      {/* 4. Botão "Ver Mais" - Só aparece se houver mais itens para mostrar */}
      {visibleCount < reversedNews.length && (
        <div
          className="d-flex justify-content-center mt-5 mb-5 "
          onClick={handleLoadMore}
        >
          <div className="d-flex mt-5 mb-5">
            <GeneralButton text={more.text} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPagination;
