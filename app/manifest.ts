import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aniweeb",
    short_name: "Aniweeb",
    description: "Free Anime Streaming Platform",
    start_url: "/",
    display: "standalone",
    background_color: "#2EC6FE",
    theme_color: "#8936FF",
    icons: [
      {
        src: "/icons/aniweeb_maskable.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/aniweeb_maskable.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
