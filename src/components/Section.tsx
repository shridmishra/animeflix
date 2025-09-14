"use client";
import { AnimeCardList } from "@/components/AnimeCard";
import Title from "./ui/title";
import { AnimeCardType } from "@/types/anime";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Assuming you have a utility for className merging

interface SectionProps {
  cards: AnimeCardType[];
  title: string;
  iconSrc: string;
  className?: string;
}

export default function Section({ cards, title, iconSrc, className }: SectionProps) {
  return (
    <div className="relative overflow-hidden">
      <div className={cn("brutal-surface p-6 relative", className)}>
        {/* Header section */}
        <div className="flex gap-4 items-center relative">
          <Image
            src={iconSrc}
            width={40}
            height={40}
            alt={`${title} Icon`}
            className="w-10 h-10 sm:w-[65px] sm:h-[65px]"
          />
          {/* Title container */}
          <div className="flex-1">
            <Title text={title} />
            <div className="flex items-center gap-1 mt-1">
              <svg className="h-2 w-10" viewBox="0 0 40 8" fill="none">
                <path
                  d="M0 4 C10 8, 30 0, 40 4"
                  stroke="var(--main)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <svg className="h-2 w-6" viewBox="0 0 24 8" fill="none">
                <path
                  d="M0 4 C6 8, 18 0, 24 4"
                  stroke="var(--surface)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Cards container */}
        <div className="relative">
          <AnimeCardList cards={cards} />
          
          {/* Bottom accent wave */}
          <div className="flex justify-center mt-4">
            <svg className="h-2 w-12" viewBox="0 0 48 8" fill="none">
              <path
                d="M0 4 C12 8, 36 0, 48 4"
                stroke="var(--main)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>

        {/* Corner decorations - subtle */}
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-foreground rounded-tr-sm"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-foreground rounded-bl-sm"></div>
      </div>
    </div>
  );
}