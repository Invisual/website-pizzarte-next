import styled from "styled-components";
import { useLocale } from "next-intl";
import Title from "../layout/Title";
import { Image } from "../layout/Image";
import Button from "../layout/Button";
import { color } from "../style/style";

// "contacto" era um literal fixo no original (Title text="contacto"),
// nunca traduzido — pequeno gap de i18n corrigido aqui.
const SECTION_TITLE = { pt: "contacto", en: "contact", fr: "contact", es: "contacto" };

// Fusão de contact/desktop/contactInfo.js + contact/mobile/contactInfoMobile.js.
// Dois bugs corrigidos (a versão mobile tinha ambos):
// - SubTitle vinha hardcoded "AVEIRO" no mobile, ignorando
//   data.contactInfo.title (traduzido) — nunca mudava com o idioma;
// - o email no mobile não estava dentro de <a href={emailLink}>, não era
//   clicável (a versão desktop já fazia bem).
export default function ContactInfo({ data }) {
  const locale = useLocale();
  const info = data?.contactInfo;
  if (!info) return null;

  return (
    <ContactoInfoStyled className="space">
      <div className="container-default">
        <Title text={SECTION_TITLE[locale] || SECTION_TITLE.pt} />
        <div className="contactContainer grid-default">
          <Image src="Homepage/_MG_7916.webp" alt="" extraClass="restaurant-photo" />
          <div className="contact-info">
            <SubTitle>{info.title}</SubTitle>
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
                <Image src="Homepage/email.svg" alt="" />
                <a href={info.emailLink}>{info.email}</a>
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
    .contact-info {
      grid-column: 8 / 11;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .text {
        margin-top: 1rem;

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
`;
