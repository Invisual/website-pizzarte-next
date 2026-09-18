import Link from "next/link";
import styled from "styled-components";
import { color, hover, media } from "../style/style";
import { Image } from "./Image";

const COPY = {
  pt: { title: "PÁGINA NÃO ENCONTRADA", button: "voltar" },
  en: { title: "PAGE NOT FOUND", button: "back home" },
  fr: { title: "PAGE INTROUVABLE", button: "retour" },
  es: { title: "PÁGINA NO ENCONTRADA", button: "volver" },
};

const SOCIAL_LINKS = [
  { src: "logos/facebook-outline-white.svg", alt: "facebook", link: "https://www.facebook.com/pizzarte/?locale=pt_PT" },
  { src: "logos/instagram-outline-white.svg", alt: "instagram", link: "https://www.instagram.com/pizzarte_restaurante/" },
  { src: "logos/youtube-outline-white.svg", alt: "youtube", link: "https://www.youtube.com/channel/UCbf4bYkwKOq0TswicJm5_CQ" },
];

// Conteúdo do 404, redesenhado a partir do protótipo Figma (node 1:51707).
// Partilhado entre app/[locale]/not-found.jsx (quando um notFound() é
// chamado dentro de um locale já resolvido — sabe a língua) e
// app/global-not-found.jsx (URLs que não batem em nenhuma rota — Next não
// sabe o locale, ver o próprio ficheiro).
export default function NotFoundContent({ locale = "pt" }) {
  const copy = COPY[locale] || COPY.pt;
  const homeHref = locale === "pt" ? "/" : `/${locale}`;

  return (
    <Wrapper>
      <WomanPhoto src="404-error/5.webp" alt="" priority sizes="30vw" />
      <SwirlWrapper aria-hidden="true">
        <SwirlPhoto src="404-error/6.webp" alt="" sizes="25vw" />
      </SwirlWrapper>

      <Content>
        <Logo src="Menu/logo-white.svg" alt="Pizzarte" />
        <Number>
          <span>4</span>
          <Plate src="404-error/1.webp" alt="" priority sizes="18vw" />
          <span>4</span>
        </Number>
        <Subtitle>{copy.title}</Subtitle>
        <BackLink href={homeHref}>{copy.button}</BackLink>
        <Social>
          {SOCIAL_LINKS.map((item) => (
            <a key={item.alt} href={item.link} target="_blank" rel="noopener noreferrer">
              <Image src={item.src} alt={item.alt} />
            </a>
          ))}
        </Social>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  min-height: 100dvh;
  background: ${color.red};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(16px, 2.2vw, 32px);
  padding: 64px 24px;
  text-align: center;
`;

const Logo = styled(Image)`
  width: clamp(100px, 12.5vw, 180px);
  height: auto;
`;

const Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: var(--font-british);
  font-weight: 400;
  font-size: clamp(56px, 17vw, 245px);
  line-height: 1;

  span {
    display: block;
  }
`;

const Plate = styled(Image)`
  width: clamp(56px, 17vw, 249px);
  height: auto;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  margin: 0 clamp(-20px, -1.8vw, -6px);
`;

const Subtitle = styled.p`
  margin: 0;
  max-width: 90vw;
  color: #fff;
  font-family: var(--font-british);
  font-weight: 400;
  font-size: clamp(28px, 7.3vw, 105px);
  line-height: normal;
  white-space: normal;
  word-break: break-word;

  ${media.m`
    font-size: clamp(24px, 8vw, 40px);
  `}
`;

const BackLink = styled(Link)`
  border: 1px solid #fff;
  border-radius: 34px;
  padding: 4px 14px;
  color: #fff;
  text-decoration: none;
  text-transform: capitalize;
  font-family: var(--font-montserrat);
  font-weight: 300;
  font-size: 16px;
  line-height: 25px;
  transition:
    background-color 0.2s,
    color 0.2s;

  ${hover`
    &:hover {
      background: #fff;
      color: ${color.red};
    }
  `}
`;

const Social = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;

  img {
    display: block;
    width: 36px;
    height: 36px;
  }

  ${media.m`
    img {
      width: 30px;
      height: 30px;
    }
  `}
`;

const WomanPhoto = styled(Image)`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: clamp(200px, 27.6vw, 397px);
  height: auto;
  pointer-events: none;

  ${media.m`
    width: clamp(220px, 48vw, 320px);
  `}
`;

const SwirlWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
  width: 32vw;
  max-width: 465px;
  aspect-ratio: 465 / 501;
  overflow: hidden;
  pointer-events: none;
  clip-path: polygon(100% 0%, 100% 100%, 32% 100%);

  ${media.l`
    display: none;
  `}
`;

const SwirlPhoto = styled(Image)`
  position: absolute;
  top: -10%;
  left: -35%;
  width: 145%;
  max-width: none;
  height: auto;
  transform: rotate(-34deg);
`;
