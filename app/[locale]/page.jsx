import { setRequestLocale } from "next-intl/server";

import { getAllPosts } from "../../lib/mdx";
import { Seo } from "../../components/Seo";
import MenuConfigClient from "../../lib/MenuConfigClient";
import { getCachedMessages } from "../../lib/cache";


export async function generateMetadata({ params }) {
  const { locale } = await params;

  const pathname = locale === "pt" ? "/" : "/";

  return Seo({
    locale,
    namespace: "home.homepage.seo",
    pathname,
  });
}

export default async function HomePage({ params }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const messages = await getCachedMessages(locale);

  const posts = await getAllPosts(locale);

  return (
    <>
      <MenuConfigClient />

      <div>


      </div>

    </>
  );
}