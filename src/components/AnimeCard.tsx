"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AnimeCardType } from "@/types/anime";
import { LoadingPopup } from "./LoadingPopup"; 
import { cn } from "@/lib/utils";

interface Props {
  cards: AnimeCardType[];
  className?: string;
}

export function AnimeCardList({ cards, className }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect if the device supports touch
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Array of brutal color classes to cycle through
  const brutalColors = [
    "brutal-pink",
    "brutal-cyan",
    "brutal-yellow",
    "brutal-orange",
    "brutal-green",
    "brutal-red",
    "brutal-blue",
    "brutal-violet",
  ];

  // Handle card click for loading popup and navigation
  const handleCardClick = (index: number, event: React.MouseEvent | React.TouchEvent) => {
    if (isTouchDevice && hovered !== index) {
      // On mobile, first tap toggles hover state, prevent navigation
      event.preventDefault();
      setHovered(index);
      // Reset hover after 3 seconds
      setTimeout(() => {
        setHovered(null);
      }, 3000);
    } else if (isTouchDevice && hovered === index) {
      // Second tap on mobile triggers navigation
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      // Desktop: trigger loading and navigation
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <section className={cn("w-full overflow-x-clip relative", className)}>
      {/* Loading Popup */}
      <LoadingPopup isVisible={isLoading} />

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hidden px-4 py-6 sm:px-6 sm:py-8">
        {cards.map((anime, index) => {
          const isHovered = hovered === index;
          const colorClass = brutalColors[index % brutalColors.length];

          return (
            <Link
              key={anime.id}
              href={`/anime/${anime.id}`}
              className={cn(
                `relative min-w-[200px] sm:min-w-[280px] md:min-w-[320px] aspect-[2/3] snap-start overflow-hidden brutal-hover ${colorClass} p-2 transform-gpu transition-all duration-300`,
                isHovered ? "scale-105 z-20 rotate-0" : "scale-100 rotate-0"
              )}
              onMouseEnter={() => !isTouchDevice && setHovered(index)}
              onMouseLeave={() => !isTouchDevice && setHovered(null)}
              onClick={(e) => handleCardClick(index, e)}
            >
              {/* Inner container for the image */}
              <div className="relative w-full h-full overflow-hidden rounded-sm border-2 border-border bg-black">
                {/* Thumbnail */}
                {anime.thumbnail ? (
                  <Image
                    src={anime.thumbnail}
                    alt={anime.title}
                    fill
                    className={cn(
                      "object-cover transition-all duration-300",
                      isHovered ? "scale-110 brightness-110 contrast-110" : "scale-100"
                    )}
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface-3 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 rounded-full bg-accent-violet flex items-center justify-center border-2 border-border">
                        <span className="text-xl sm:text-2xl">📺</span>
                      </div>
                      <span className="text-foreground font-semibold text-xs sm:text-sm">No Thumbnail</span>
                    </div>
                  </div>
                )}

                {/* Overlay title with enhanced styling - shows on hover or tap */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-end transition-all duration-300",
                    isHovered
                      ? "opacity-100 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                      : "opacity-0"
                  )}
                >
                  <div className="p-3 sm:p-4 w-full">
                    <div
                      className={cn(
                        "transform transition-all duration-300",
                        isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                      )}
                    >
                      <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white drop-shadow-lg mb-2 line-clamp-2">
                        {anime.title}
                      </h3>

                      {/* Additional hover info */}
                      <div
                        className="flex items-center gap-2 transition-all duration-500 delay-100 translate-y-0 opacity-100"
                      >
                        <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-sm border border-white/30">
                          <span className="text-xs font-semibold text-white">WATCH NOW</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scanline effect for extra anime feel */}
                <div
                  className={cn(
                    "absolute inset-0 pointer-events-none transition-opacity duration-300",
                    isHovered ? "opacity-20" : "opacity-0"
                  )}
                  style={{
                    background: `repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      rgba(255,255,255,0.1) 2px,
                      rgba(255,255,255,0.1) 4px
                    )`,
                  }}
                ></div>
              </div>

              {/* Floating number badge */}
              <div
                className={cn(
                  "absolute -top-2 -left-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-main border-2 border-border shadow-shadow flex items-center justify-center transform transition-all duration-300",
                  isHovered ? "scale-125 -rotate-12" : "scale-100 rotate-0"
                )}
              >
                <span className="text-xs sm:text-sm font-bold text-white">{index + 1}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}