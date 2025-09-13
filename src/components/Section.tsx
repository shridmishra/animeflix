"use client";
import { AnimeCardList } from "@/components/AnimeCard";
import Title from "./ui/title";
import { AnimeCardType } from "@/types/anime";

export default function Section({ cards }: { cards: AnimeCardType[] }) {
  return (
    <div className="relative overflow-hidden">
      {/* Background accent elements - subtle */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-main/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-surface/10 rounded-full blur-lg"></div>
      
      <div className="brutal-surface p-6 relative">
        {/* Header section */}
        <div className="flex gap-4 items-center mb-6 relative">
          {/* Minimal star / indicator */}
          <div className="relative w-6 h-6 bg-main rounded-full"></div>
          
          {/* Title container */}
          <div className="flex-1">
            <Title text="Latest Animes" />
            <div className="flex items-center gap-1 mt-1">
              <div className="h-1 w-10 bg-main rounded-full"></div>
              <div className="h-1 w-6 bg-surface rounded-full"></div>
            </div>
          </div>
        
        </div>

        {/* Cards container */}
        <div className="relative">
       
          
          <AnimeCardList cards={cards} />
          
          {/* Bottom accent line */}
          <div className="flex justify-center mt-4">
            <div className="h-1 w-12 bg-main rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Corner decorations - subtle */}
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-main rounded-tr-sm"></div>
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-main rounded-bl-sm"></div>
      </div>
    </div>
  );
}
