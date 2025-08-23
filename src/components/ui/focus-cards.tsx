"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: { title: string; src: string };
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
     
        "relative rounded-lg bg-gray-100 dark:bg-neutral-900 overflow-hidden min-w-[250px] md:min-w-[320px] aspect-video transition-all duration-300 ease-out scrollbar-hidden",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-lg md:text-xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: { title: string; src: string }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="w-full overflow-x-clip">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hidden -mx-4 px-4">
        {cards.map((card, index) => (
          <Card
            key={card.title}
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>
    </section>
  );
}
