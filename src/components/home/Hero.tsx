"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoSunny,
  IoFlame,
  IoPlay,
  IoHeart,
  IoVideocam,
  IoList,

} from "react-icons/io5";

export type AnimeCard = {
  id: string;
  title: string;
  thumbnail: string | null;
  rating?: string;
  genre?: string;
  description?: string | null;
};

export default function Hero({ animes }: { animes: AnimeCard[] }) {
  const [mainAnime, setMainAnime] = useState<AnimeCard>(animes[0]);
  const [imageLoading, setImageLoading] = useState(false);

  const handleAnimeSelect = (anime: AnimeCard) => {
    setImageLoading(true);
    setTimeout(() => {
      setMainAnime(anime);
      setImageLoading(false);
    }, 150);
  };

  return (
    <div className="relative w-full overflow-hidden mb-12 ">
      <div className="brutal-surface p-6 relative">
        <div className="flex flex-col items-start space-y-8">
          {/* Featured header - Aligned to left corner */}
          <div className="brutal-surface-3 brutal-hover px-4 py-2">
            <div className="flex items-center gap-4">

              <span className="font-semibold text-xl tracking-tight">FEATURED ANIME</span>

            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col xl:flex-row w-full max-w-7xl gap-8">
            {/* Main image */}
            <div className="relative xl:w-2/3">
              <div className="brutal-main brutal-hover h-[500px]">
                <div className="relative w-full h-full overflow-hidden rounded-md border-2 border-border">
                  <Image
                    src={mainAnime.thumbnail || "/placeholder.jpg"}
                    alt={mainAnime.title}
                    fill
                    className={`object-cover transition-all duration-500 ${imageLoading ? "scale-105 blur-sm brightness-75" : "scale-100 blur-0 brightness-100"
                      }`}
                    sizes="(max-width: 1280px) 100vw, 65vw"
                    onLoadingComplete={() => setImageLoading(false)}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  {/* Anime-themed floating elements */}
                  <div className="absolute top-6 right-6 brutal-surface-3 px-4 py-2 transform rotate-4">
                    <div className="flex items-center gap-2">
                      <IoFlame className="text-lg" />
                      <span className="text-sm font-bold">TRENDING</span>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">

                    <div className="brutal-surface px-3 py-1">
                      <span className="text-xs font-bold">NOW STREAMING</span>
                    </div>
                  </div>
                  {/* Play button */}
                  <Link href={`/anime/${mainAnime.id}`} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <div className="brutal-surface-3 brutal-hover w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110">
                      <IoPlay className="text-3xl  ml-1" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Details section */}
            <div className="xl:w-1/3 flex flex-col space-y-6">
              {/* Title */}
              <div className="brutal-surface brutal-hover p-6">
                <div className="flex items-center gap-2 mb-3">
                  <IoVideocam className="text-2xl" />
                  <div className="h-1 flex-1 bg-main rounded-full"></div>
                </div>
                <h1 className="text-xl font-semibold mb-3 break-words">{mainAnime.title}</h1>
              </div>

              {/* Stats */}
              <div className="flex gap-4">
                {mainAnime.rating && (
                  <div className="brutal-main brutal-hover px-6 py-4 flex-1">
                    <div className="text-center">
                      <div className="flex justify-center items-center gap-2 mb-2">
                        <IoSunny className="text-lg" />
                        <span className="font-bold text-sm text-main-foreground">RATING</span>
                      </div>
                      <div className="text-2xl font-bold">{mainAnime.rating}</div>
                    </div>
                  </div>
                )}
                {mainAnime.genre && (
                  <div className="brutal brutal-hover px-6 py-4 flex-1">
                    <div className="text-center">
                      <div className="flex justify-center items-center gap-2 mb-2">
                        <IoList className="text-lg" />
                        <span className="font-bold text-sm">GENRE</span>
                      </div>
                      <div className="text-lg font-bold truncate">{mainAnime.genre}</div>
                    </div>
                  </div>
                )}
              </div>

             
              {/* Action buttons */}
              <div className="flex gap-4 justify-center items-center">
                <Link
                  href={`/anime/${mainAnime.id}`}
                  className="brutal-surface-3 brutal-hover px-8 py-4 flex-1 font-bold transition-all duration-200 hover:bg-accent-red hover:text-main-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <div className="flex items-center justify-center gap-2">
                    <IoPlay className="text-lg" />
                    <span>WATCH NOW</span>
                  </div>
                </Link>
                <button
                  className="brutal-surface brutal-hover px-6 py-4 font-bold text-2xl transition-all duration-200 hover:bg-accent-pink hover:text-main-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <IoHeart />
                </button>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="w-full max-w-7xl relative">
            <div className="absolute -top-24 right-0">
              <Image src="/icons/Cat-Anime-Girl-PNG-Clipart.png" width={120} height={120} alt="pika" />
            </div>
            

            <div className="brutal-surface p-8 py-4">
              <div className="flex items-center gap-6 mb-8">
                <div className="brutal-main px-6 py-3">
                  <div className="flex items-center gap-2">
                    <IoVideocam className="text-xl" />
                    <span className="font-bold text-lg">SELECT  ANIME</span>
                  </div>
                </div>
                <div className="flex-1 h-1 bg-border"></div>
                <div className="brutal-surface-3 px-4 py-2 text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <span>{animes.length}</span>
                    <IoVideocam className="text-lg" />
                    <span>AVAILABLE</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {animes.map((anime) => {
                  const isSelected = anime.id === mainAnime.id;

                  return (
                    <div
                      key={anime.id}
                      className={`cursor-pointer brutal-hover transition-all duration-200 ${isSelected
                        ? `brutal-surface-3 scale-105 z-10 shadow-lg`
                        : `brutal-surface hover:scale-105`
                        }`}
                      onClick={() => handleAnimeSelect(anime)}
                    >
                      <div className="p-4">
                        <div className="relative aspect-video overflow-hidden rounded-sm border border-border">
                          <Image
                            src={anime.thumbnail || "/placeholder.jpg"}
                            alt={anime.title}
                            fill
                            className="object-cover transition-transform duration-200 hover:scale-110"
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                          />
                          {/* Selection indicator */}
                          {isSelected && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <div className="w-10 h-10 bg-surface-3 rounded-full flex items-center justify-center ">
                                <IoPlay className="text-xl  ml-1" />
                              </div>
                            </div>
                          )}

                        </div>
                        {/* Title */}
                        <div className="mt-4 text-center">
                          <span
                            className={`text-sm font-semibold truncate block ${isSelected ? "text-main-foreground" : "text-foreground"
                              }`}
                          >
                            {anime.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}