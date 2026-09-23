import { getPathname } from "./navigation";
import { MENU_CATEGORY_SLUGS } from "./routing";

// messages/{locale}/home.json guarda sempre o link CANÓNICO (igual ao PT:
// "/pizzarte", "/menu", "/galeria", "/contactos", "/menu/entradas") — era
// assim também no Gatsby, que resolvia o link final por locale em runtime
// via gatsby-plugin-translate-urls' translateUrl(). Aqui o equivalente é
// esta função, usada pelo Header (nav principal + submenu de categorias).
export function translateNavLink(link, locale) {
  if (link.startsWith("/menu/")) {
    const slug = link.slice("/menu/".length);
    const menuPath = getPathname({ href: "/menu", locale });
    const translatedSlug = MENU_CATEGORY_SLUGS[locale]?.[slug] || slug;
    return `${menuPath}/${translatedSlug}`;
  }

  // Chaves estáticas registadas em i18n/routing.jsx pathnames.
  if (
    [
      "/",
      "/menu",
      "/pizzarte",
      "/galeria",
      "/contactos",
      "/termos-e-condicoes",
      "/politica-de-privacidade",
      "/informacao-ao-consumidor",
    ].includes(link)
  ) {
    return getPathname({ href: link, locale });
  }

  // Link não mapeado (ex: âncora, externo) — devolve tal como veio.
  return link;
}
