import styled from "styled-components";
import { Image } from "./Image";

const ImageWrapper = styled.div`
  display: inline-block;
  width: ${({ $width }) => $width || "100px"};
  animation: spin 10s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Triangle({ color, width }) {
  const src = color === "white" ? "Homepage/forma-white.svg" : "Homepage/forma.svg";
  return (
    <ImageWrapper $width={width}>
      <Image src={src} alt="" />
    </ImageWrapper>
  );
}
