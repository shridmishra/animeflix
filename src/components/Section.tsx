"use client";
import { AnimeCardList } from "@/components/AnimeCard";
import Title from "./ui/title";
import Star8 from "./ui/star";
import { AnimeCardType } from "@/types/anime";

export default function Section({ cards }: { cards: AnimeCardType[] }) {
  return (
    <div className="flex flex-col brutal p-4">
      <div className="flex gap-2 items-center mb-3">
        <Star8 className="h-6 w-6 text-yellow-400" />
        <Title text="Latest Animes" />
      </div>

      <AnimeCardList cards={cards} />
    </div>
  );
}
