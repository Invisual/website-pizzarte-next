"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { Image } from "../layout/Image";
import { color, media } from "../style/style";
import { HandlePhone } from "../../utils/handlePhone";

// Ano de referência para o build estático (Next 16/PPR rejeita `new Date()`
// lido diretamente durante o prerender de um Client Component — "unstable
// value"). Corrigido no cliente após montar, via useEffect abaixo.
const BUILD_YEAR = new Date().getFullYear();

// Fusão de src/components/footer/desktop/footer.js e
// .../mobile/footerMobile.js — mesmas diferenças resolvidas em CSS
// (gap/direção do .flex, tamanho da imagem do Livro de Reclamações,
// largura da woman-footer, Copyright em linha vs coluna).
//
// Bug corrigido: no FooterMobile original os ícones sociais do rodapé não
// estavam envolvidos em <a href>, ficavam por clicar (o Header mobile tem
// os seus próprios links sociais no drawer, mas o rodapé em si ficava
// morto). Aqui têm sempre <a>, como já acontecia na versão desktop.
export default function Footer({ data }) {
  const [currentYear, setCurrentYear] = useState(BUILD_YEAR);
  useEffect(() => setCurrentYear(new Date().getFullYear()), []);

  const footer = data?.footer;
  if (!footer) return null;

  return (
    <FooterStyled>
      <div className="container-default">
        <div className="ContentContainer">
          <div className="flex">
            {footer.info.map((footerItem, i) => (
              <div className="footer-section" key={i}>
                <Title className="title-with-underline">{footerItem.title}</Title>

                {footerItem.items.map((description, j) => {
                  const isPhone = description.text.includes("+351");
                  const phoneHref = isPhone ? `tel:${description.text.replace(/\s/g, "")}` : null;
                  const href = description.link || phoneHref;

                  return (
                    <div className="info" key={j}>
                      <Image src={description.icon} extraClass="icon" alt="" />
                      {href ? (
                        <a
                          href={href}
                          onClick={
                            isPhone
                              ? (e) => {
                                  e.preventDefault();
                                  HandlePhone(phoneHref);
                                }
                              : undefined
                          }
                        >
                          {description.text}
                        </a>
                      ) : (
                        <span>{description.text}</span>
                      )}
                      {description.note && (
                        <div className="note">
                          <small>{description.note}</small>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <LivroReclamacoesSection>
          <a href={footer.livroReclamacoes.link} target="_blank" rel="noreferrer">
            <Image
              extraClass="livro_image"
              src={footer.livroReclamacoes.icon}
              alt="Livro de reclamações"
              sizes="(max-width: 1024px) 25vw, 11vw"
            />
          </a>
        </LivroReclamacoesSection>

        <CoFinancedSection>
          <Title className="title-with-underline">{footer.coFinanced.title}</Title>
          <CoFinancedImages>
            <a href={footer.coFinanced.link}>
              <Image src={footer.coFinanced.image} extraClass="cert-desktop" alt="certificado" />
              <Image src={footer.coFinanced.imageMobile} extraClass="cert-mobile" alt="certificado" />
            </a>
          </CoFinancedImages>
        </CoFinancedSection>
      </div>

      <div className="woman-footer">
        <Image src="Homepage/woman-footer.webp" alt="" sizes="(max-width: 1024px) 0px, 35vw" />
      </div>

      <Copyright>
        <p>
          © {currentYear} {footer.allrights} {footer.createdBy} <a href="https://invisual.pt">Invisual.pt</a>
        </p>
        <div className="social">
          {footer.social.map((itemIcon, index) => (
            <a href={itemIcon.link} key={index} target="_blank" rel="noreferrer">
              <Image src={itemIcon.src} alt={itemIcon.alt} />
            </a>
          ))}
        </div>
      </Copyright>
    </FooterStyled>
  );
}

const FooterStyled = styled.footer`
  background-color: #fff;
  position: relative;
  padding: 40px 0 90px 0;
  box-shadow: 0px -3px 10px #00000029;
  height: 50vh;
  z-index: 10;

  ${media.xxl`
    padding: 40px 0 100px 0;
    height: 60vh;
  `}

  .ContentContainer {
    display: flex;

    .flex {
      gap: 50px;
      align-items: unset;
    }

    .footer-section {
      display: flex;
      flex-direction: column;

      .info {
        display: flex;
        gap: 7px;
        margin-bottom: 15px;

        a,
        span {
          color: #666666;
        }

        a {
          cursor: pointer;
        }

        .icon {
          width: 8px;
        }

        .note {
          margin-top: 15px;
          position: absolute;
          color: #666666;
        }
      }
    }
  }

  .title-with-underline {
    position: relative;
    display: inline-block;
  }

  .title-with-underline::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background-color: #666666;
    margin-top: 4px;
  }

  .woman-footer {
    width: 35vw;
    position: absolute;
    right: 0;
    bottom: 0;

    ${media.xxxl`
      width: 33vw;
    `}
  }

  ${media.l`
    height: auto;
    padding: 40px 0 0 0;

    .ContentContainer .flex {
      gap: 30px;
      flex-direction: column;
    }

    .ContentContainer .footer-section .info {
      flex-wrap: wrap;
    }

    .ContentContainer .footer-section .info .note {
      position: static;
      flex-basis: 100%;
      margin-top: 4px;
    }

    .woman-footer {
      display: none;
    }
  `}
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: #666666;
`;

const LivroReclamacoesSection = styled.div`
  margin-top: 2vh;

  .livro_image {
    width: 11vw;
    max-width: 160px;
    height: auto;
  }

  ${media.l`
    margin-top: 2.5rem;

    .livro_image {
      width: 25vw;
    }
  `}
`;

const CoFinancedSection = styled.div`
  margin-top: 1vh;

  ${media.l`
    margin-top: 2.5rem;
  `}
`;

const CoFinancedImages = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;

  img {
    width: 220px;
    height: auto;
  }

  .cert-mobile {
    display: none;
  }

  ${media.l`
    img {
      width: 90px;
    }

    .cert-desktop {
      display: none;
    }

    .cert-mobile {
      display: block;
    }
  `}
`;

const Copyright = styled.div`
  background-color: ${color.red};
  height: 74px;
  padding: 0 45px 0 32px;
  text-align: center;
  font-size: 16px;
  font-weight: 300;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;

  p {
    line-height: 25px;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  .social {
    display: flex;
    align-items: center;
    gap: 28px;

    img {
      width: 27px;
      height: 27px;
    }
  }

  ${media.l`
    position: static;
    height: auto;
    padding: 20px;
    flex-direction: column;
    gap: 12px;
    margin-top: 2.5rem;

    .social {
      justify-content: center;
      gap: 34px;
    }
  `}
`;
