import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cacheLife, cacheTag } from "next/cache";

export async function getAllPosts(locale) {
  "use cache";
  cacheLife("days");
  cacheTag("mdx-posts", `posts-${locale}`);

  const dir = path.join(process.cwd(), "content/blog", locale);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir);

  const posts = files.map((file) => {
    const filePath = path.join(dir, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(source);

    return {
      slug: data.slug,
      frontmatter: data,
      content,
    };
  });

  return posts;
}

export async function getPostBySlug(locale, slug) {
  "use cache";
  cacheLife("weeks");
  cacheTag("mdx-posts", `post-${locale}-${slug}`);

  const dir = path.join(process.cwd(), "content/blog", locale);
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(source);

    if (data.slug === slug) {
      return {
        slug: data.slug,
        frontmatter: data,
        content,
      };
    }
  }

  return null;
}

export function getSlugById(locale, id) {
  const dir = path.join(process.cwd(), "content/blog", locale);
  if (!fs.existsSync(dir)) return null;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const source = fs.readFileSync(filePath, "utf8");
    const { data } = matter(source);

    if (data.id === id) {
      return data.slug;
    }
  }

  return null;
}