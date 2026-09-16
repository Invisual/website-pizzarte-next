import { getLocale } from "next-intl/server";
import NotFoundContent from "../../components/layout/NotFoundContent";

export const metadata = {
  robots: { index: false, follow: false },
};

// Trata os notFound() chamados dentro de uma rota já resolvida (ex:
// /menu/uma-categoria-que-nao-existe em app/[locale]/menu/[slug]/page.jsx).
// Corre dentro da árvore normal (html/body/providers de
// app/[locale]/layout.jsx), por isso consegue saber o locale via
// getLocale() — ao contrário de app/global-not-found.jsx (ver esse
// ficheiro), que é verdadeiramente global e não tem acesso a nada disto.
export default async function NotFound() {
  const locale = await getLocale();
  return <NotFoundContent locale={locale} />;
}
