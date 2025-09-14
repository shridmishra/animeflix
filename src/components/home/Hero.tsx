"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  IoFlame,
  IoPlay,
  IoHeart,
  IoVideocam,
  IoList,
  IoStar,
} from "react-icons/io5";
import { LoadingPopup } from "../LoadingPopup"; 

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
  const [isLoading, setIsLoading] = useState(false);

  const handleAnimeSelect = (anime: AnimeCard) => {
    setImageLoading(true);
    setIsLoading(true);
    setTimeout(() => {
      setMainAnime(anime);
      setImageLoading(false);
      setIsLoading(false);
    }, 1000); // Increased to 1000ms to match AnimeCardList and ensure popup visibility
  };

  const handleWatchClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading during navigation
  };

  return (
    <div className="relative w-full overflow-hidden mb-6 md:mb-12">
      {/* Loading Popup */}
      <LoadingPopup isVisible={isLoading} />

      <div className="brutal-surface p-3 md:p-6 relative">
        <div className="flex flex-col items-start space-y-4 md:space-y-8">
          {/* Main content - Mobile first approach */}
          <div className="flex flex-col w-full max-w-7xl gap-4 md:gap-6 lg:gap-8">
            {/* Mobile: Stack vertically, Desktop: Side by side */}
            <div className="flex flex-col xl:flex-row w-fullGAP-4 md:gap-6 lg:gap-8">
              {/* Main image */}
              <div className="relative w-full xl:w-2/3">
                <div className="brutal-main brutal-hover h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
                  <div className="relative w-full h-full overflow-hidden rounded-md border-2 border-border">
                    <Image
                      src={mainAnime.thumbnail || "/placeholder.jpg"}
                      alt={mainAnime.title}
                      fill
                      className={`object-cover transition-all duration-500 ${
                        imageLoading ? "scale-105 blur-sm brightness-75" : "scale-100 blur-0 brightness-100"
                      }`}
                      sizes="(max-width: 1280px) 100vw, 65vw"
                      onLoadingComplete={() => setImageLoading(false)}
                      priority
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Anime-themed floating elements - Responsive positioning */}
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 lg:top-6 lg:right-6 brutal-surface-3 px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-2 transform rotate-2 md:rotate-3 lg:rotate-4">
                      <div className="flex items-center gap-1 md:gap-2">
                        <IoFlame className="text-sm md:text-base lg:text-lg text-text" />
                        <span className="text-xs md:text-sm font-bold">HOT</span>
                      </div>
                    </div>

                    <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 lg:bottom-6 lg:left-6 flex items-center gap-2 md:gap-3">
                      <div className="brutal-surface px-2 py-1 md:px-3 md:py-2">
                        <span className="text-xs font-bold flex items-center gap-1">
                          <IoVideocam className="text-lg" />
                          NOW STREAMING
                        </span>
                      </div>
                    </div>

                    {/* Play button - Responsive sizing */}
                    <Link
                      href={`/anime/${mainAnime.id}`}
                      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20"
                      onClick={handleWatchClick}
                    >
                      <div className="brutal-surface-3 brutal-hover w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110">
                        <IoPlay className="text-xl md:text-2xl lg:text-3xl ml-1" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Details section - Mobile optimized */}
              <div className="w-full xl:w-1/3 flex flex-col space-y-3 md:space-y-4 lg:space-y-6 mt-6 lg:mt-0 md:mt-0">
                {/* Title */}
                <div className="brutal-surface brutal-hover p-3 md:p-4 lg:p-6">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <IoVideocam className="text-lg md:text-xl lg:text-2xl text-text" />
                    <div className="h-1 flex-1 bg-foreground/70 rounded-full"></div>
                  </div>
                  <h1 className="text-base md:text-lg lg:text-xl font-semibold mb-2 md:mb-3 break-words leading-tight">
                    {mainAnime.title}
                  </h1>
                  {/* Japanese title placeholder */}
                  <div className="text-xs md:text-lg text-gray-600">
                    Episodes: {mainAnime.id.length}
                  </div>
                </div>

                {/* Stats - Mobile: Stack vertically on very small screens */}
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4">
                  {mainAnime.rating && (
                    <div className="brutal-main brutal-hover px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 flex-1">
                      <div className="text-center">
                        <div className="flex justify-center items-center gap-1 md:gap-2 mb-1 md:mb-2">
                          <IoStar className="text-sm md:text-base lg:text-lg text-yellow-500" />
                        </div>
                        <div className="text-lg md:text-xl lg:text-2xl font-bold flex items-center justify-center gap-1">
                          {mainAnime.rating}
                          <span className="text-sm">⭐</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {mainAnime.genre && (
                    <div className="brutal brutal-hover px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 flex-1">
                      <div className="text-center">
                        <div className="flex justify-center items-center gap-1 md:gap-2 mb-1 md:mb-2">
                          <IoList className="text-sm md:text-base lg:text-lg text-purple-500" />
                          <span className="font-bold text-xs md:text-sm">ジャンル</span>
                        </div>
                        <div className="text-sm md:text-base lg:text-lg font-bold truncate flex items-center justify-center gap-1">
                          {mainAnime.genre}
                          <span className="text-xs">🎭</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action buttons - Mobile optimized */}
                <div className="flex gap-2 md:gap-3 lg:gap-4 justify-center items-center">
                  <Link
                    href={`/anime/${mainAnime.id}`}
                    className="brutal-surface-3 brutal-hover px-4 py-3 md:px-6 md:py-4 lg:px-8 lg:py-4 flex-1 font-bold transition-all duration-200 hover:bg-accent-red hover:text-main-foreground focus:outline-none focus:ring-2 focus:ring-ring text-center"
                    onClick={handleWatchClick}
                  >
                    <div className="flex items-center justify-center gap-1 md:gap-2">
                      <IoPlay className="text-sm md:text-base lg:text-lg" />
                      <span className="text-xs md:text-sm lg:text-base">WATCH NOW</span>
                    </div>
                  </Link>
                  <button className="brutal-surface brutal-hover px-3 py-3 md:px-4 md:py-4 lg:px-6 lg:py-4 font-bold text-lg md:text-xl lg:text-2xl transition-all duration-200 hover:bg-accent-red hover:text-main-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                    <div className="flex items-center gap-1">
                      <IoHeart />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnails section - Mobile optimized */}
            <div className="w-full max-w-7xl relative">
              {/* Cute floating anime character - Hidden on mobile for space */}
              <div className="absolute  -top-7 md:-top-7 lg:-top-25 right-0 md:block">
                <div className="relative">
                  <Image
                    src="/icons/anay.png"
                    width={100}
                    height={100}
                    className="md:w-24 md:h-24 lg:w-32 lg:h-32"
                    alt="kawaii mascot"
                  />
                  <div className="absolute top-6 -right-1 text-xs">💕</div>
                </div>
              </div>

              <div className="brutal-surface p-3 md:p-6 lg:p-8 py-3 md:py-4 mt-12 lg:mt-0 md:mt-12">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
                  <div className="brutal-main px-3 py-2 md:px-4 md:py-2 lg:px-6 lg:py-3">
                    <div className="flex items-center gap-1 md:gap-2">
                      <span className="font-bold text-sm md:text-base lg:text-xl">SELECT ANIME</span>
                      <span className="text-sm"></span>
                    </div>
                  </div>
                  <div className="flex-1 h-1 bg-border hidden sm:block"></div>
                  <div className="brutal-surface-3 px-2 py-1 md:px-3 md:py-2 lg:px-4 lg:py-2 text-xs md:text-sm font-bold">
                    <div className="flex items-center gap-1 md:gap-2">
                      <span>{animes.length}</span>
                      <IoVideocam className="text-sm md:text-base lg:text-lg" />
                    </div>
                  </div>
                </div>

                {/* Responsive grid - Better mobile layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
                  {animes.map((anime) => {
                    const isSelected = anime.id === mainAnime.id;

                    return (
                      <div
                        key={anime.id}
                        className={`cursor-pointer brutal-hover transition-all duration-200 ${
                          isSelected ? `brutal-surface-3 scale-105 z-10 shadow-lg` : `brutal-surface hover:scale-105`
                        }`}
                        onClick={() => handleAnimeSelect(anime)}
                      >
                        <div className="p-2 md:p-3 lg:p-4">
                          <div className="relative aspect-video overflow-hidden rounded-sm border border-border">
                            <Image
                              src={anime.thumbnail || "/placeholder.jpg"}
                              alt={anime.title}
                              fill
                              className="object-cover transition-transform duration-200 hover:scale-110"
                              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                            />
                            {/* Selection indicator with kawaii elements */}
                            {isSelected && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-surface-3 rounded-full flex items-center justify-center border-1">
                                  <IoPlay className="text-sm md:text-lg ml-1" />
                                </div>
                                <div className="absolute -top-1 -right-1 text-xs">✨</div>
                              </div>
                            )}
                          </div>
                          {/* Title with better mobile typography */}
                          <div className="mt-2 md:mt-3 lg:mt-4 text-center">
                            <span
                              className={`text-xs sm:text-sm font-semibold block leading-tight ${
                                isSelected ? "text-main-foreground" : "text-foreground"
                              }`}
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
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
    </div>
  );
}