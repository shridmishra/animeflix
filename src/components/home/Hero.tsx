"use client";

import React, { useState } from "react";
import Image from "next/image";

export type AnimeCard = {
  id: string;
  title: string;
  thumbnail: string | null;
  rating?: string; // optional, you can later add rating in DB
  genre?: string;  // optional
  description?: string | null;
};

export default function Hero({ animes }: { animes: AnimeCard[] }) {
  const [mainAnime, setMainAnime] = useState<AnimeCard>(animes[0]);

  return (
    <div className="w-full h-full brutal mb-12 py-8">
      <div className="flex flex-col items-center space-y-8">
        {/* Main Image and Details */}
        <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8">
          <div className="relative w-full lg:w-2/3 h-96">
            <Image
              src={mainAnime.thumbnail || "/placeholder.jpg"}
              alt={mainAnime.title}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Anime Details */}
          <div className="lg:w-1/3 flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">{mainAnime.title}</h2>
            {mainAnime.rating && (
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Rating:</span> {mainAnime.rating}
              </p>
            )}
            {mainAnime.genre && (
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Genre:</span> {mainAnime.genre}
              </p>
            )}
            <p className="text-gray-700">{mainAnime.description}</p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4 max-w-9xl">
          {animes.map((anime) => (
            <div
              key={anime.id}
              className="cursor-pointer rounded-lg overflow-hidden hover:opacity-80"
              onClick={() => setMainAnime(anime)}
            >
              <Image
                src={anime.thumbnail || "/placeholder.jpg"}
                alt={anime.title}
                width={150}
                height={80}
                className="object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
