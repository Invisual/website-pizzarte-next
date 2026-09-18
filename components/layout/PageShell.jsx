"use client";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import PageChrome from "./PageChrome";

// Cada página do Gatsby repetia Header+Footer+Layout na própria mão; aqui
// isso fica num único wrapper client, reduzindo repetição sem mudar o
// comportamento (cada Server Component de página continua a decidir os
// dados, isto só monta a árvore comum).
export default function PageShell({ children, homeData, menuBg, hero }) {
  const mainClass = [menuBg && "menu-page", hero && "has-hero"].filter(Boolean).join(" ");

  return (
    <PageChrome dataPopup={homeData?.popupOrderNow}>
      <Header data={homeData} />
      <main className={mainClass || undefined}>{children}</main>
      <Footer data={homeData} />
    </PageChrome>
  );
}
