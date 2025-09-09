import { prisma } from "@/lib/prisma";
import Hero, { AnimeCard } from "./Hero";

export default async function HeroSection() {
  const animes = await prisma.anime.findMany({
    orderBy: { createdAt: "desc" },
    take: 7, // just like your thumbnails grid
    select: {
      id: true,
      title: true,
      thumbnail: true,
      description: true,
    },
  });

  return <Hero animes={animes as AnimeCard[]} />;
}
