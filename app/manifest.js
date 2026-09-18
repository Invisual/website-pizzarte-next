const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Pizzarte";

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: "Pizzarte — pizzaria em Aveiro desde 1989.",
    start_url: "/",
    display: "standalone",
    background_color: "#FF0000",
    theme_color: "#FF0000",
    icons: [
      {
        src: "/icons/logo-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/logo-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
