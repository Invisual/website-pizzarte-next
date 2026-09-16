import { getAllPosts } from "../lib/mdx";
import ptProjetos from "../messages/pt/projetos.json";
import enProjetos from "../messages/en/projetos.json";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";

const STATIC_ROUTES = [
  {
    pt: { path: "/", priority: 1.0, changeFrequency: "monthly" },
    en: { path: "/" },
  },
  {
    pt: { path: "/noticias", priority: 0.8, changeFrequency: "daily" },
    en: { path: "/news" },
  },
  {
    pt: { path: "/servicos", priority: 0.8, changeFrequency: "monthly" },
    en: { path: "/services" },
  },
];

function makeEntry({ ptPath, enPath, priority = 0.6, changeFrequency = "monthly", date }) {
  return {
    url: `${BASE_URL}${ptPath}`,
    lastModified: date ? new Date(date) : new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        pt: `${BASE_URL}${ptPath}`,
        en: `${BASE_URL}/en${enPath}`,
      },
    },
  };
}

export default async function sitemap() {
  const ptPosts = await getAllPosts("pt");
  const enPosts = await getAllPosts("en");

  const staticEntries = STATIC_ROUTES.map(({ pt, en }) =>
    makeEntry({
      ptPath: pt.path,
      enPath: en.path,
      priority: pt.priority,
      changeFrequency: pt.changeFrequency,
    })
  );

  const postEntries = ptPosts.map((post) => {
    const enPost = enPosts.find(
      (p) => p.frontmatter.id === post.frontmatter.id
    );
    return makeEntry({
      ptPath: `/noticias/${post.slug}`,
      enPath: enPost ? `/news/${enPost.slug}` : `/news/${post.slug}`,
      priority: 0.6,
      changeFrequency: "yearly",
      date: post.frontmatter.date,
    });
  });

  const ptServices = ptProjetos.projetos.all;
  const enServices = enProjetos.projetos.all;

  const serviceEntries = ptServices.flatMap((service) => {
    const enService = enServices.find((s) => s.id === service.id);
    const enSlug = enService?.slug ?? service.slug;

    const entries = [
      makeEntry({
        ptPath: `/servicos/${service.slug}`,
        enPath: `/services/${enSlug}`,
        priority: 0.7,
        changeFrequency: "monthly",
      }),
    ];

    service.subpages?.forEach((sub) => {
      const enSub = enService?.subpages?.find((s) => s.id === sub.id);
      const enSubSlug = enSub?.slug ?? sub.slug;
      entries.push(
        makeEntry({
          ptPath: `/servicos/${service.slug}/${sub.slug}`,
          enPath: `/services/${enSlug}/${enSubSlug}`,
          priority: 0.6,
          changeFrequency: "monthly",
        })
      );
    });

    return entries;
  });

  return [...staticEntries, ...postEntries, ...serviceEntries];
}
