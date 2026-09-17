"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { color, media } from "../style/style";

export default function MobileFilterDropdown({ activeLabel, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <DropdownStyled ref={ref}>
      <button
        type="button"
        className="trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        <span>{activeLabel}</span>
        <span className="chevron" aria-hidden="true">
          &#9660;
        </span>
      </button>

      {open && (
        <div className="panel" role="listbox" onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </DropdownStyled>
  );
}

const DropdownStyled = styled.div`
  display: none;

  ${media.l`
    display: block;
    position: relative;
    margin-bottom: 1.5rem;
  `}

  .trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: var(--border-radius);
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 600;
    text-transform: capitalize;
    cursor: pointer;

    .chevron {
      font-size: 10px;
      transition: transform 0.2s ease;
    }

    &[aria-expanded="true"] .chevron {
      transform: rotate(180deg);
    }
  }

  .panel {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 5;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: var(--border-radius);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    > * {
      padding: 12px 16px;
      font-size: 14px;
      text-align: left;
      text-transform: capitalize;
      border: none;
      background: none;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }

    > * + * {
      border-top: 1px solid rgba(0, 0, 0, 0.08);
    }

    .active {
      color: ${color.red};
      font-weight: 600;
    }
  }
`;
