const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.pt";
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Site";

function buildUrls(locale, pathname, alternatePaths) {
  const paths = {
    pt: alternatePaths?.pt ?? pathname,
    en: alternatePaths?.en ?? pathname,
  };
  return {
    pt: `${BASE_URL}${paths.pt}`,
    en: `${BASE_URL}/en${paths.en}`,
    canonical: locale === "pt"
      ? `${BASE_URL}${paths.pt}`
      : `${BASE_URL}/en${paths.en}`,
  };
}

function buildOgImage(image) {
  if (!image || !image.startsWith("/")) return null;
  return `${BASE_URL}${image}`;
}

export async function Seo({ locale, namespace, pathname, alternatePaths }) {
  const { getTranslations } = await import("next-intl/server");
  const t = await getTranslations({ locale, namespace });

  const { pt, en, canonical } = buildUrls(locale, pathname, alternatePaths);

  let rawImage = null;
  try {
    const val = t("image");
    if (val && val.startsWith("/")) rawImage = val;
  } catch {}
  const ogImage = buildOgImage(rawImage);

  return {
    title: t("title"),
    description: t("description"),

    alternates: {
      canonical,
      languages: { pt, en },
    },

    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "pt" ? "pt_PT" : "en_US",
      type: "website",
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: t("title") }],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export function SeoFromData({
  locale,
  title,
  description,
  pathname,
  image = null,
  type = "website",
  alternatePaths,
}) {
  const { pt, en, canonical } = buildUrls(locale, pathname, alternatePaths);
  const ogImage = buildOgImage(image);

  return {
    title,
    description,

    alternates: {
      canonical,
      languages: { pt, en },
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "pt" ? "pt_PT" : "en_US",
      type,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}
