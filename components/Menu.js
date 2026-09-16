"use client";

import { useLocale } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import Link from "next/link";

const Menu = ({ menu }) => {
  const locale = useLocale();

  return (
    <>
      <LocaleSwitcher locale={locale} />
      {menu.options.map((item, index) => (
        <div
          key={"menu-option-" + index}
          className={`position-relative container-dot-text option-${index}`}
        >
          <Link href={item.link} key={"item-link-" + index}>
            {item.text}
          </Link>
        </div>
      ))}
    </>
  );
};

export default Menu;
