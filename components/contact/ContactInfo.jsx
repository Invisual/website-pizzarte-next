import styled from "styled-components";
import { useLocale } from "next-intl";
import Title from "../layout/Title";
import { Image } from "../layout/Image";
import Button from "../layout/Button";
import { media } from "../style/style";

// "contacto" era um literal fixo no original (Title text="contacto"),
// nunca traduzido — pequeno gap de i18n corrigido aqui.
const SECTION_TITLE = { pt: "contacto", en: "contact", fr: "contact", es: "contacto" };

const SOCIAL_LINKS = [
  { src: "logos/facebook-outline.svg", alt: "facebook", link: "https://www.facebook.com/pizzarte/?locale=pt_PT" },
  { src: "logos/instagram-outline.svg", alt: "instagram", link: "https://www.instagram.com/pizzarte_restaurante/" },
  { src: "logos/youtube-outline.svg", alt: "youtube", link: "https://www.youtube.com/channel/UCbf4bYkwKOq0TswicJm5_CQ" },
];

// Fusão de contact/desktop/contactInfo.js + contact/mobile/contactInfoMobile.js.
// Dois bugs corrigidos (a versão mobile tinha ambos):
// - SubTitle vinha hardcoded "AVEIRO" no mobile, ignorando
//   data.contactInfo.title (traduzido) — nunca mudava com o idioma;
// - o email no mobile não estava dentro de <a href={emailLink}>, não era
//   clicável (a versão desktop já fazia bem).
//
// SubTitle e .contact-info partilham o wrapper .info-column — mesmo item
// de grid, sem linha própria (se SubTitle fosse item de grid separado da
// imagem, a linha ficava tão alta como a imagem e sobrava um vão enorme
// antes do endereço). Em mobile o wrapper vira `display:contents` para
// o `order:-1` do SubTitle conseguir saltar por cima da imagem.
export default function ContactInfo({ data }) {
  const locale = useLocale();
  const info = data?.contactInfo;
  if (!info) return null;

  return (
    <ContactoInfoStyled>
      <div className="container-default">
        <Title text={SECTION_TITLE[locale] || SECTION_TITLE.pt} />
        <div className="contactContainer grid-default">
          <Image src="Homepage/_MG_7916.webp" alt="" extraClass="restaurant-photo" />
          <div className="info-column">
            <SubTitle>{info.title}</SubTitle>
            <div className="contact-info">
              <div className="text">
                <div className="flexRow">
                  <Image src="Homepage/local.svg" alt="" />
                  <a href={info.addressLink} target="_blank" rel="noopener noreferrer">
                    {info.address}
                    <br />
                    {info.postalCode}
                  </a>
                </div>
                <div className="flexRow">
                  <Image src="Homepage/call.svg" alt="" extraClass="call-icon" />
                  <div className="info-number">
                    <h4>{info.reservationTitle}</h4>
                    <div>
                      <Button to={info.phoneLink} button={info.phone} />
                    </div>
                    {info.infoPhone?.map((item, key) => (
                      <small key={key} className="phone-note">
                        {item}
                      </small>
                    ))}
                  </div>
                </div>
                <div className="flexRow">
                  <Image src="Homepage/email.svg" alt="" />
                  <a href={info.emailLink}>{info.email}</a>
                </div>
              </div>
              <div className="flex">
                <Button to={info.phoneLink} imageSrc="Homepage/call.svg" hoverImageSrc="Homepage/call-white.svg" button={info.phoneButton} />
                <Button
                  to="https://www.google.com/maps/dir/?api=1&destination=R.+Eng%C2%BA+Von+Haff,+27,+3800-177+Aveiro"
                  imageSrc="Homepage/map.svg"
                  hoverImageSrc="Homepage/map-white.svg"
                  button={info.adressButton}
                />
              </div>
              <div className="social">
                {SOCIAL_LINKS.map((item) => (
                  <a key={item.alt} href={item.link} target="_blank" rel="noopener noreferrer">
                    <Image src={item.src} alt={item.alt} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContactoInfoStyled>
  );
}

const ContactoInfoStyled = styled.div`
  .restaurant-photo {
    grid-column: 1 / 7;
    width: 100%;
    height: auto;
  }

  .contactContainer {
    .info-column {
      grid-column: 8 / 11;
      display: flex;
      flex-direction: column;

      ${media.l`
        display: contents;
      `}
    }

    .contact-info {
      display: flex;
      flex-direction: column;
      flex: 1;

      .text {
        margin-top: 0.5rem;

        .flexRow {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 1.5rem;

          .call-icon {
            min-width: 20px;
            width: 20px;
            height: auto;
          }

          .info-number {
            display: flex;
            flex-direction: column;
          }

          .phone-note {
            margin-top: 0.5vh;
          }

          a {
            color: #000;
          }
        }
      }

      .flex {
        justify-content: unset;
        gap: 50px;
        margin-top: auto;
        padding-top: 1.5rem;

        ${media.l`
          order: -1;
          margin: 40px 0 24px;
          padding-top: 0;
          width: 100%;
          gap: 16px;

          button {
            flex: 1;
            justify-content: center;
          }

          .link {
            justify-content: center;
          }
        `}
      }

      .social {
        display: none;
        gap: 16px;
        margin-top: 1.5rem;

        img {
          width: 40px;
          height: 40px;
        }

        ${media.l`
          display: flex;
        `}
      }
    }
  }
`;

const SubTitle = styled.h3`
  font-size: 28px;
  font-weight: 600;
  color: #666666;
  margin: 0;
  text-transform: uppercase;

  ${media.l`
    order: -1;
    margin-bottom: 24px;
  `}
`;
