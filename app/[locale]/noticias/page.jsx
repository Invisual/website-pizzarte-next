
import { setRequestLocale } from "next-intl/server";
import { getAllPosts } from "../../../lib/mdx";
import { Seo } from "../../../components/Seo";
import Link from "next/link";
import MenuConfigClient from "../../../lib/MenuConfigClient";
import { getCachedMessages } from "../../../lib/cache";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return Seo({
    locale,
    namespace: "home.noticias.seo",
    pathname: locale === "pt" ? "/noticias" : "/news",
    alternatePaths: { pt: "/noticias", en: "/news" },
  });
}

export default async function BlogPage({ params }) {
  const { locale } = await params;

  setRequestLocale(locale);

  const messages = await getCachedMessages(locale);

  const posts = await getAllPosts(locale);



  return (

    <>
      <MenuConfigClient />
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(235,233,227,1) 0%, rgba(230,230,230,1) 100%)",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      >

        {posts.map((post) => (
          <div key={post.frontmatter.slug}>
            <Link href={`/noticias/${post.frontmatter.slug}`}>
              <img src={post.frontmatter.image} />
              {post.frontmatter.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
