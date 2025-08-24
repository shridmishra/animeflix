"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Anime {
  src: string;
  title: string;
  rating: string;
  genre: string;
  description: string;
}

const Hero: React.FC = () => {
  const animes: Anime[] = [
    {
      src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png",
      title: "Forest Adventure",
      rating: "8.5/10",
      genre: "Adventure, Fantasy",
      description:
        "A thrilling adventure in the mystical forest, full of magic and wonders.",
    },
    {
      src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png",
      title: "Ocean Quest",
      rating: "9.0/10",
      genre: "Action, Drama",
      description: "An epic journey across the ocean with unexpected challenges.",
    },
    {
      src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide3.png",
      title: "Sky Legends",
      rating: "8.2/10",
      genre: "Fantasy, Action",
      description: "Heroes take flight in the skies to save their world from doom.",
    },
    {
      src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide4.png",
      title: "Mystic Tales",
      rating: "8.8/10",
      genre: "Mystery, Adventure",
      description: "Uncover secrets hidden in ancient mystic lands.",
    },
     {
      src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png",
      title: "Forest Adventure",
      rating: "8.5/10",
      genre: "Adventure, Fantasy",
      description:
        "A thrilling adventure in the mystical forest, full of magic and wonders.",
    },
    {
      src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png",
      title: "Ocean Quest",
      rating: "9.0/10",
      genre: "Action, Drama",
      description: "An epic journey across the ocean with unexpected challenges.",
    },
    {
      src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide1.png",
      title: "Forest Adventure",
      rating: "8.5/10",
      genre: "Adventure, Fantasy",
      description:
        "A thrilling adventure in the mystical forest, full of magic and wonders.",
    },
    {
      src: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/gallery/slide2.png",
      title: "Ocean Quest",
      rating: "9.0/10",
      genre: "Action, Drama",
      description: "An epic journey across the ocean with unexpected challenges.",
    },
    
    
  ];

  const [mainAnime, setMainAnime] = useState(animes[0]);

  return (
    <div className="w-full h-full brutal mb-12 py-8">
      <div className="flex flex-col items-center space-y-8">
        {/* Main Image and Details */}
        <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8">
          <div className="relative w-full lg:w-2/3 h-96">
            <Image
              src={mainAnime.src}
              alt={mainAnime.title}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* Anime Details */}
          <div className="lg:w-1/3 flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">{mainAnime.title}</h2>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Rating:</span> {mainAnime.rating}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Genre:</span> {mainAnime.genre}
            </p>
            <p className="text-gray-700">{mainAnime.description}</p>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-6xl">
          {animes.map((anime, idx) => (
            <div
              key={idx}
              className="cursor-pointer rounded-lg overflow-hidden hover:opacity-80"
              onClick={() => setMainAnime(anime)}
            >
              <Image
                src={anime.src}
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
};

export default Hero;
