"use client";
import { FocusCards } from "@/components/ui/focus-cards";
import Title from "./ui/title";
import Star8 from "./ui/star";

export type AnimeCard = {
  id: string;
  title: string;
  thumbnail: string | null;
};

export default function Section({ cards }: { cards: AnimeCard[] }) {
  return (
    <div className="flex flex-col brutal p-4">
      <div className="flex gap-2 items-center mb-3">
        <Star8 className="h-6 w-6 text-yellow-400" />
        <Title text="Latest Animes" />
      </div>

      <FocusCards
        cards={cards.map((anime) => ({
          title: anime.title,
          src: anime.thumbnail || "/placeholder.jpg", // fallback if no thumbnail
        }))}
      />
    </div>
  );
}
