import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getSlugById } from "../../../../lib/mdx";

import { markdownToHtml } from "../../../../lib/markdown";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import MenuConfigClient from "../../../../lib/MenuConfigClient";
import { SeoFromData } from "../../../../components/Seo";
import { getCachedMessages } from "../../../../lib/cache";
import { buildNewsArticleSchema, buildBreadcrumbSchema } from "../../../../lib/jsonld";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);

  if (!post) return { title: "Not found" };

  const otherLocale = locale === "pt" ? "en" : "pt";
  const otherSlug =
    post.frontmatter.id != null
      ? getSlugById(otherLocale, post.frontmatter.id)
      : null;

  const ptSlug = locale === "pt" ? slug : (otherSlug ?? slug);
  const enSlug = locale === "en" ? slug : (otherSlug ?? slug);

  return SeoFromData({
    locale,
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt || post.frontmatter.title,
    pathname: locale === "pt" ? `/noticias/${slug}` : `/news/${slug}`,
    image: post.frontmatter.image || null,
    type: "article",
    alternatePaths: {
      pt: `/noticias/${ptSlug}`,
      en: `/news/${enSlug}`,
    },
  });
}

export default async function BlogPost({ params }) {
  const { locale = "pt", slug } = await params;

  setRequestLocale(locale);

  const messages = await getCachedMessages(locale);

  const post = await getPostBySlug(locale, slug);

  if (!post) notFound();

  const htmlContent = await markdownToHtml(post.content);

  const allPosts = await getAllPosts(locale);

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);

  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const postId = post.frontmatter.id;
  const otherLocale = locale === "pt" ? "en" : "pt";
  const otherSlug = postId ? getSlugById(otherLocale, postId) : null;

  const newsUrl = `${BASE_URL}${locale === "pt" ? "/noticias" : "/en/news"}`;
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: locale === "pt" ? "Início" : "Home", item: BASE_URL },
    { name: locale === "pt" ? "Notícias" : "News", item: newsUrl },
    { name: post.frontmatter.title, item: `${newsUrl}/${slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildNewsArticleSchema(post, slug, locale)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <MenuConfigClient
        uris={{
          pt: locale === "pt" ? `/noticias/${slug}` : otherSlug ? `/noticias/${otherSlug}` : null,
          en: locale === "en" ? `/news/${slug}` : otherSlug ? `/news/${otherSlug}` : null,
        }}
      />
      <div>


        <article>
          <h1>{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>

          {post.frontmatter.image && (
            <img
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
            />
          )}



          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </article>

      </div>
    </>
  );
}
