"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AnimeCardType } from "@/types/anime";

interface Props {
  cards: AnimeCardType[];
}

export function AnimeCardList({ cards }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="w-full overflow-x-clip">
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hidden -mx-4 px-4">
        {cards.map((anime, index) => {
          const isHovered = hovered === index;

          return (
            <Link
              key={anime.id}
              href={`/anime/${anime.id}`}
              className={`relative min-w-[250px] md:min-w-[320px] aspect-video snap-center rounded-md overflow-hidden transition-transform duration-300 ${
                isHovered ? "scale-105 z-10" : "scale-100"
              }`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Thumbnail */}
              {anime.thumbnail ? (
                <Image
                  src={anime.thumbnail}
                  alt={anime.title}
                  fill
                  className="object-cover rounded-md"
                />
              ) : (
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center rounded-md">
                  <span className="text-gray-600 text-sm">No Thumbnail</span>
                </div>
              )}

              {/* Overlay title */}
              <div
                className={`absolute inset-0 flex items-end p-3 bg-black/50 text-white transition-opacity duration-200 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <h3 className="text-lg md:text-xl font-semibold">{anime.title}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
