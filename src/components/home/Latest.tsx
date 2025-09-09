import { prisma } from "@/lib/prisma";
import Section, { AnimeCard } from "../Section";

export default async function LatestAnimesSection() {
  const animes = await prisma.anime.findMany({
    orderBy: { createdAt: "desc" },
    take: 10, // only show 10 latest
    select: { id: true, title: true, thumbnail: true },
  });

  return <Section cards={animes as AnimeCard[]} />;
}
