"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Anime } from "../../generated/prisma";
import Link from "next/link";

interface Props {
  allAnime: Anime[];
  setAllAnime: React.Dispatch<React.SetStateAction<Anime[]>>;
}

export function AnimeGrid({ allAnime, setAllAnime }: Props) {
  const [loadingAnime, setLoadingAnime] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchAllAnime() {
    setLoadingAnime(true);
    setError(null);

    try {
      const res = await fetch("/api/anime");
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to fetch anime list");
      }

      const data = (await res.json()) as { animes: Anime[] };
      setAllAnime(data.animes);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoadingAnime(false);
    }
  }

  useEffect(() => {
    fetchAllAnime();
  },[])

  return (
    <div className="space-y-4 border p-4 rounded bg-secondary-background">
      <h2 className="text-xl font-semibold">All Anime</h2>
      <button
        onClick={fetchAllAnime}
        disabled={loadingAnime}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {loadingAnime ? "Loading..." : "Refresh List"}
      </button>

      {error && <p className="text-red-500 mt-2">❌ {error}</p>}

      {allAnime.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {allAnime.map((anime) => (
            <Link key={anime.id} href={`/anime/${anime.id}`}>
            
            <div  className="border rounded shadow p-3 bg-background brutal">
              <h3 className="font-semibold text-lg">{anime.title}</h3>
              {anime.thumbnail ? (
                <Image
                  src={anime.thumbnail}
                  alt={anime.title}
                  width={320}
                  height={180}
                  className="rounded mt-2"
                />
              ) : (
                <div className="w-full h-40 bg-gray-300 flex items-center justify-center mt-2 rounded">
                  <span className="text-gray-600 text-sm">No Thumbnail</span>
                </div>
              )}
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">{anime.description}</p>
            </div>
                        </Link>

          ))}
        </div>
      ) : (
        !loadingAnime && <p className="text-gray-500 mt-2">No anime found.</p>
      )}
    </div>
  );
}
