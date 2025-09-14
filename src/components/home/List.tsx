import { prisma } from "@/lib/prisma";
import { AnimeCardType } from "@/types/anime";
import AnimeSections from "./AnimeSections";

export default async function AnimeSectionsContainer() {
  // Fetch all available animes (6 records)
  const allAnimes = await prisma.anime.findMany({
    select: { id: true, title: true, thumbnail: true },
  });

  // Create three different shuffles of all animes
  const shuffleArray = (array: unknown[]) => [...array].sort(() => Math.random() - 0.5);

  const latestAnimes = shuffleArray(allAnimes);
  const popularAnimes = shuffleArray(allAnimes);
  const randomFavorites = shuffleArray(allAnimes);

  return (
    <div className="mb-8">
       <AnimeSections
      latestAnimes={latestAnimes as AnimeCardType[]}
      popularAnimes={popularAnimes as AnimeCardType[]}
      randomFavorites={randomFavorites as AnimeCardType[]}
    />
    </div>
   
  );
}