import styled from "styled-components";
import { media } from "../style/style";

// Página de texto simples (termos, política de privacidade, informação ao
// consumidor) — conteúdo denso, por isso usa heading normal em vez do
// Title decorativo (components/layout/Title.jsx), pensado para títulos
// curtos de secções com hero/imagem.
export default function LegalDocument({ data }) {
  if (!data) return null;

  return (
    <LegalDocumentStyled>
      <div className="container-default">
        <h1>{data.title}</h1>

        {data.lawRef && <p className="law-ref">{data.lawRef}</p>}

        {data.stores?.map((store, i) => (
          <div className="store" key={i}>
            <h3>{store.name}</h3>
            <blockquote>{store.quote}</blockquote>
          </div>
        ))}

        {data.paragraph && <p>{data.paragraph}</p>}

        {data.intro?.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        {data.tocItems && (
          <>
            {data.tocIntro && <p>{data.tocIntro}</p>}
            <ol className="toc">
              {data.tocItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </>
        )}

        {data.contactNote && <p>{data.contactNote}</p>}

        {data.sections?.map((section, i) => (
          <section key={i}>
            {section.heading && <h2>{section.heading}</h2>}
            {section.paragraphs?.map((paragraph, j) => (
              <p key={j}>{paragraph}</p>
            ))}
          </section>
        ))}

        {data.contactLines && (
          <p className="contact-lines">
            {data.contactLines.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </p>
        )}
      </div>
    </LegalDocumentStyled>
  );
}

const LegalDocumentStyled = styled.div`
  padding: 60px 0;

  .container-default {
    max-width: 760px;
  }

  h1 {
    font-size: 2.25rem;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.375rem;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-size: 1.125rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p,
  li {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .law-ref {
    font-weight: 600;
  }

  blockquote {
    margin: 0 0 1rem;
    padding-left: 1rem;
    border-left: 3px solid #ddd;
    font-style: italic;
  }

  .toc {
    padding-left: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .contact-lines span {
    display: inline;
  }

  ${media.l`
    padding: 40px 0;

    h1 {
      font-size: 1.75rem;
    }
  `}
`;
