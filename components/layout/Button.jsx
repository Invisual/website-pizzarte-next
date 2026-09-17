"use client";

import { useState } from "react";
import styled from "styled-components";
import { color, hover } from "../style/style";
import { Image } from "./Image";

const supportsHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

export default function Button({ button, to, normal, imageSrc, hoverImageSrc, border, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  if (to) {
    return (
      <ButtonStyled
        onMouseEnter={() => supportsHover() && setIsHovered(true)}
        onMouseLeave={() => supportsHover() && setIsHovered(false)}
        $border={border}
        onClick={onClick}
      >
        <a className="link" href={to}>
          {button}
          <Image src={isHovered ? hoverImageSrc : imageSrc} alt="" />
        </a>
      </ButtonStyled>
    );
  }

  if (normal) {
    return <ButtonStyled onClick={onClick}>{button}</ButtonStyled>;
  }

  return null;
}

const ButtonStyled = styled.button`
  color: ${color.red};
  border-radius: 34px;
  border: ${(props) => (props.$border ? `1px solid #fff` : `1px solid ${color.red}`)};
  padding: 7px 20px;
  font-size: 16px;
  background: transparent;
  display: inline-flex;
  align-items: center;
  transition: background-color 1s;
  cursor: pointer;

  ${hover`
    &:hover {
      background: ${(props) => (props.$border ? `#fff` : `${color.red}`)};
      color: #fff;

      a {
        color: ${(props) => (props.$border ? `#000` : `#fff`)};
      }
    }
  `}

  .link {
    font-size: 14px;
    text-transform: uppercase;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
