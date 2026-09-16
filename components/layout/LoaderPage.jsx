import styled from "styled-components";
import { color } from "../style/style";

export default function LoaderPage() {
  return (
    <LoaderPageStyled>
      <div className="loader" />
    </LoaderPageStyled>
  );
}

const LoaderPageStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  overflow: hidden !important;

  .loader {
    width: 100px;
    height: 100px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid ${color.red};
    border-radius: 50%;
    animation: spin 1s linear infinite;
    position: relative;
    z-index: 99;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
