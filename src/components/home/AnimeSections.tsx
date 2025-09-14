"use client";
import Section from "../Section";
import { AnimeCardType } from "@/types/anime";

interface AnimeSectionsProps {
  latestAnimes: AnimeCardType[];
  popularAnimes: AnimeCardType[];
  randomFavorites: AnimeCardType[];
}

export default function AnimeSections({
  latestAnimes,
  popularAnimes,
  randomFavorites,
}: AnimeSectionsProps) {
  return (
    <div className="space-y-8 ">
      <Section
        cards={latestAnimes}
        title="Latest Animes"
        iconSrc="/icons/bhoot.png"
        className="brutal-surface brutal-hover"
      />
      <Section
        cards={popularAnimes}
        title="Most Popular Animes"
        iconSrc="/icons/pikaface.png"
        className="brutal-red brutal-hover"
      />
      <Section
        cards={randomFavorites}
        title="Fan Favorites"
        iconSrc="/icons/naruto.png"
        className="brutal-cyan brutal-hover"
      />
    </div>
  );
}