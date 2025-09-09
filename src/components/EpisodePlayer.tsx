"use client";

import { useEffect, useRef, useState } from "react";

export type EpisodeLite = { id: string; title: string; videoId: string };

export default function EpisodePlayer({
  episodes,
  defaultVideoId,
}: {
  episodes: EpisodeLite[];
  defaultVideoId: string | null;
}) {
  const [current, setCurrent] = useState<string | null>(defaultVideoId);
  const playerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  function handleSelect(videoId: string) {
    if (!videoId) return;
    setCurrent(videoId);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLButtonElement>(
      'button[data-active="true"]'
    );
    active?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [current]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[75vh]">
      {/* Left: Player */}
      <div
        ref={playerRef}
        className="lg:col-span-2 flex flex-col h-full bg-black rounded"
      >
        {current ? (
          <iframe
            src={`https://www.youtube.com/embed/${current}`}
            title="Anime Episode Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-600">Select an episode</span>
          </div>
        )}
      </div>

      {/* Right: Scrollable episode list */}
      <div
        ref={listRef}
        className="flex flex-col h-full overflow-y-auto bg-secondary-background rounded p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Episodes</h2>

        <div className="space-y-2">
          {episodes.map((ep) => {
            const isActive = current === ep.videoId;
            const disabled = !ep.videoId;

            return (
              <button
                key={ep.id}
                type="button"
                onClick={() => handleSelect(ep.videoId)}
                disabled={disabled}
                data-active={isActive ? "true" : "false"}
                className={`w-full text-left px-3 py-2 rounded transition
                  ${isActive ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"}
                  ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                `}
                title={ep.title}
              >
                {ep.title || "Untitled Episode"}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
