"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

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
        "relative min-w-[250px] md:min-w-[320px] aspect-video snap-center",
        "bg-white dark:bg-neutral-950 border-4 border-black dark:border-neutral-200",
        "rounded-none overflow-hidden transition-transform duration-200 ease-out",
        hovered !== null && hovered !== index && "scale-[0.95] opacity-70"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full grayscale contrast-125"
      />
      <div
        className={cn(
          "absolute inset-0 flex items-end p-4",
          "bg-black/70 text-white uppercase tracking-wider font-extrabold",
          "transition-opacity duration-200",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xl md:text-2xl">{card.title}</div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: { title: string; src: string }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="w-full overflow-x-clip ">
      <div
        className={cn(
          "flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hidden -mx-4 px-4",
          " py-8 "
        )}
      >
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
