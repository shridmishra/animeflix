"use client";

import { useEffect, useRef, useState } from "react";
import { IoAtCircle, IoPlay } from "react-icons/io5";

export type EpisodeLite = { id: string; title: string; videoId: string };

export default function EpisodePlayer({
  episodes,
  defaultVideoId,
}: {
  episodes: EpisodeLite[];
  defaultVideoId: string | null;
}) {
  const [current, setCurrent] = useState<string | null>(defaultVideoId);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  function handleSelect(videoId: string) {
    if (!videoId) return;
    setCurrent(videoId);
    setIsPlaying(false);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLButtonElement>(
      'button[data-active="true"]'
    );
    active?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [current]);

  const currentEpisode = episodes.find((ep) => ep.videoId === current);
  const currentIndex = episodes.findIndex((ep) => ep.videoId === current);

  const goToPrevious = () => {
    if (currentIndex > 0) handleSelect(episodes[currentIndex - 1].videoId);
  };

  const goToNext = () => {
    if (currentIndex < episodes.length - 1)
      handleSelect(episodes[currentIndex + 1].videoId);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[85vh]">
      {/* Player + controls */}
      <div className="xl:col-span-8 flex flex-col h-full gap-3">
        {/* Player */}
        <div className="relative w-full h-[50vh] rounded-md overflow-hidden border-2 border-border bg-black flex-shrink-0">
          {current ? (
            <iframe
              src={`https://www.youtube.com/embed/${current}?rel=0&modestbranding=1&showinfo=0`}
              title="Anime Episode Player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
              onLoad={() => setIsPlaying(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-6 bg-surface">
              <div className="brutal-surface p-6 ">
                <div className="text-7xl mb-4 text-center">📺</div>
                <div className="text-center">
                  <div className="font-bold text-lg mb-2">NO EPISODE SELECTED</div>
                  <div className="text-sm opacity-80">
                    Choose an episode to start watching
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading overlay */}
          {current && !isPlaying && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
              <div className="brutal-surface p-4 flex items-center gap-3">
                <IoAtCircle className="w-6 h-6 animate-bounce" />
                <span className="font-bold text-base">LOADING EPISODE...</span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        {currentEpisode && (
          <div className="brutal-surface brutal-hover p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-shrink-0">
            <div className="flex-1">
              <div className="brutal-surface px-3 py-1 inline-block mb-2">
                <div className="flex items-center gap-2">
                  <IoPlay />
                  <span className="text-sm font-bold">NOW PLAYING</span>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1 line-clamp-2">
                {currentEpisode.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <span>
                  Episode {currentIndex + 1} of {episodes.length}
                </span>
                <div className="w-2 h-2 bg-current rounded-full"></div>
                <span>{episodes.length - currentIndex - 1} episodes remaining</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevious}
                disabled={currentIndex <= 0}
                className={`brutal-surface brutal-hover px-3 py-1 font-bold text-sm ${currentIndex <= 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                ← PREV
              </button>
              <div className="brutal-surface px-3 py-1 text-sm font-bold">
                {currentIndex + 1}/{episodes.length}
              </div>
              <button
                onClick={goToNext}
                disabled={currentIndex >= episodes.length - 1}
                className={`brutal-surface brutal-hover px-3 py-1 font-bold text-sm ${currentIndex >= episodes.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                  }`}
              >
                NEXT →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Episode list */}
      <div className="xl:col-span-4 flex flex-col h-[72vh]">
        <div className="brutal-surface p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm flex items-center gap-1">
              📋 EPISODES
            </h2>
            <span className="text-xs font-bold">{episodes.length} 📀</span>
          </div>

          {/* Scrollable list */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-main w-full px-3 pt-2" // increased spacing and padding
          >
            {episodes.map((ep, index) => {
              const isActive = current === ep.videoId;
              const disabled = !ep.videoId;
              return (
                <button
                  key={ep.id}
                  type="button"
                  onClick={() => handleSelect(ep.videoId)}
                  disabled={disabled}
                  data-active={isActive ? "true" : "false"}
                  className={`w-full text-left brutal-hover p-5 relative transition-all duration-200 ${isActive
                      ? "brutal-surface ring-1 ring-main" // removed scale/rotate
                      : "brutal-surface hover:scale-102 hover:rotate-0"
                    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {/* Badge */}
                  <div
                    className={`absolute -top-1 -left-2 w-8 h-8 rounded-full border-2 border-border flex items-center justify-center text-xs font-bold ${isActive ? "bg-main text-white" : "bg-surface text-foreground"
                      }`}
                  >
                    {index + 1}
                  </div>

                  <div className="ml-12"> {/* increased left margin for breathing space */}
                    <div className="font-semibold text-sm line-clamp-2">
                      {ep.title || "Untitled Episode"}
                    </div>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${disabled
                            ? "bg-surface-2"
                            : isActive
                              ? "bg-main animate-pulse"
                              : "bg-foreground/40"
                          }`}
                      ></div>
                      <span className="opacity-70">
                        {disabled ? "Unavailable" : isActive ? "Playing" : "Play"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
