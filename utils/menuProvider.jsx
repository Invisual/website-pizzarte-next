"use client";

import { createContext, useContext, useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";

const MenuContext = createContext();

function NavigationObserver({ setPlayAnimation }) {
  const pathname = usePathname();

  useEffect(() => {
    setPlayAnimation(true);

    const timer = setTimeout(() => {
      setPlayAnimation(false);

      setTimeout(() => {
        if (typeof window !== "undefined" && window.location.hash) {
          const targetId = window.location.hash.replace("#", "");
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo(0, 0);
        }
      }, 100);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export function MenuProvider({ children }) {
  const [playAnimation, setPlayAnimation] = useState(false);

  const [menuConfig, setMenuConfig] = useState({
    showLogoWhite: false,
    showLogoBlack: true,
    noFormOrCommercial: false,
    uris: null,
    loading: false,
  });

  return (
    <MenuContext.Provider value={{ menuConfig, setMenuConfig }}>
      <Suspense>
        <NavigationObserver setPlayAnimation={setPlayAnimation} />
      </Suspense>

      {/* SE TIVER ALGUM LOADER */}

      {children}
    </MenuContext.Provider>
  );
}

export function useMenuConfig() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenuConfig must be used inside MenuProvider");
  return ctx;
}