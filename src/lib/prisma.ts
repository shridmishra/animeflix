import { PrismaClient, Anime, Episode } from "../generated/prisma";

// Define type for anime with episodes relation (based on schema)
type AnimeWithEpisodes = Anime & { episodes?: Episode[] };

// Global Prisma client caching
interface GlobalWithPrisma {
  prisma?: PrismaClient;
}

const globalForPrisma = globalThis as GlobalWithPrisma;

const prismaClient =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}

// Clean title by removing bracketed content
function cleanTitle(title: string | null | undefined): string | null | undefined {
  if (!title) return title;
  return title.replace(/\s*\[.*?\]\s*/g, "").trim();
}

// Clean anime and episode titles
function cleanAnime<T extends AnimeWithEpisodes | null>(anime: T): T {
  if (!anime) return anime;
  return {
    ...anime,
    title: cleanTitle(anime.title),
    episodes: anime.episodes?.map((ep) => ({
      ...ep,
      title: cleanTitle(ep.title),
    })),
  } as T;
}

// Define the anime delegate type
type AnimeDelegate = typeof prismaClient.anime;

// Proxy handler to clean anime model results
const handler: ProxyHandler<PrismaClient> = {
  get(target: PrismaClient, prop: keyof PrismaClient) {
    if (prop === "anime") {
      const animeDelegate = target.anime;
      return new Proxy(animeDelegate, {
        get(animeTarget: AnimeDelegate, method: keyof AnimeDelegate) {
          // Handle specific read operations with individual typing
          if (method === "findMany") {
            const original = animeTarget.findMany;
            return async (...args: Parameters<typeof original>) => {
              const result = await original(...args);
              return result.map(cleanAnime);
            };
          } else if (method === "findUnique") {
            const original = animeTarget.findUnique;
            return async (...args: Parameters<typeof original>) => {
              const result = await original(...args);
              return cleanAnime(result);
            };
          } else if (method === "findFirst") {
            const original = animeTarget.findFirst;
            return async (...args: Parameters<typeof original>) => {
              const result = await original(...args);
              return cleanAnime(result);
            };
          } else if (method === "findUniqueOrThrow") {
            const original = animeTarget.findUniqueOrThrow;
            return async (...args: Parameters<typeof original>) => {
              const result = await original(...args);
              return cleanAnime(result);
            };
          } else {
            const original = animeTarget[method];
            if (typeof original === "function") {
              return original.bind(animeTarget);
            }
            return original;
          }
        },
      });
    }
    return target[prop];
  },
};

export const prisma = new Proxy(prismaClient, handler);