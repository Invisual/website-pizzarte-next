import styled from "styled-components";
import { Image } from "../layout/Image";
import Triangle from "../layout/Triangle";
import Title from "../layout/Title";
import Reveal from "../layout/Reveal";
import { media } from "../style/style";

// Fusão de chess/desktop/chessIntro.js + chess/mobile/chessIntroMobile.js.
export default function ChessIntro({ data }) {
  return (
    <ChessIntroStyled>
      <div className="container-default">
        <div className="triangle-left desktop-only">
          <Triangle color="red" width="207px" />
        </div>
        <div className="triangle-left mobile-only">
          <Triangle color="red" width="80px" />
        </div>

        <div className="container">
          <Reveal className="text-section">
            <Title text={data?.title} />
            <p dangerouslySetInnerHTML={{ __html: data?.text }} />
          </Reveal>
          <Reveal className="chess-right-position">
            <div className="chess-image">
              <Image src="Homepage/chess-image.webp" alt="" extraClass="fill-image" />
              <div className="triangle-right desktop-only">
                <Triangle color="white" width="234px" />
              </div>
              <div className="triangle-right mobile-only">
                <Triangle color="white" width="110px" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </ChessIntroStyled>
  );
}

const ChessIntroStyled = styled.div`
  .mobile-only {
    display: none;
  }

  .fill-image {
    width: 100%;
    height: auto;
  }

  .container {
    display: flex;
    justify-content: space-between;

    .text-section {
      width: 474px;
    }

    .chess-right-position {
      .chess-image {
        width: 700px;
        position: relative;

        ${media.xxxl`
          width: 900px;
        `}
      }

      .triangle-right {
        position: absolute;
        right: 100px;
        top: -150px;
      }
    }
  }

  ${media.l`
    .desktop-only { display: none; }
    .mobile-only { display: block; }

    .container {
      flex-direction: column;
      height: auto;

      .text-section {
        width: 100%;
      }

      .chess-right-position {
        position: static;

        .chess-image {
          width: 100%;
          position: relative;
          padding-top: 90px;
        }

        .triangle-right {
          position: absolute;
          right: 0;
          top: 18px;
        }
      }
    }
  `}
`;
