import { prisma } from "@/lib/prisma";
import { AnimeCardType } from "@/types/anime";
import Image from "next/image";
import Link from "next/link";

const Page = async () => {
  // Fetch all animes (6 records) with all required fields
  const allAnimes = await prisma.anime.findMany({
    select: {
      id: true,
      title: true,
      thumbnail: true,
      description: true,
      playlistId: true,
      createdAt: true,
    },
  });

  // Optionally shuffle the animes
  const shuffledAnimes = [...allAnimes].sort(() => Math.random() - 0.5);

  return (
    <div className="bg-grid min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        <h1 className="text-xl lg:text-4xl font-heading font-semibold text-foreground brutal-surface-3 p-4 rounded-md border-2 border-border shadow-shadow text-center">
          ALL ANIMES
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shuffledAnimes.map((anime: AnimeCardType) => (
            <Link
              key={anime.id}
              href={`/anime/${anime.id}`}
              className="brutal-surface brutal-hover p-4 rounded-md border-2 border-border shadow-shadow flex flex-col items-center no-underline"
            >
              <Image
                src={anime.thumbnail}
                width={200}
                height={300}
                alt={anime.title}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-heading font-medium text-foreground text-center">
                {anime.title}
              </h2>
            
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;