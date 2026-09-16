import styled from "styled-components";

export default function Stars({ count }) {
  const stars = Array(5)
    .fill(0)
    .map((_, i) => (
      <span key={i} className={i < count ? "filled" : ""}>
        ★
      </span>
    ));
  return <StarsStyled>{stars}</StarsStyled>;
}

const StarsStyled = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;

  span {
    font-size: 35px;
    color: transparent;
    -webkit-text-stroke: 1px #fff;

    &.filled {
      color: #fff;
      font-size: 35px;
    }
  }
`;
