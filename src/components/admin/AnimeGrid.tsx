"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { Anime } from "../../generated/prisma";
import { Trash2 } from "lucide-react";

interface Props {
  allAnime: Anime[];
  setAllAnime: React.Dispatch<React.SetStateAction<Anime[]>>;
}

export function AnimeGrid({ allAnime, setAllAnime }: Props) {
  const [loadingAnime, setLoadingAnime] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<Set<string>>(new Set());
  const [processingDelete, setProcessingDelete] = useState(false);
  const isMounted = useRef(true);

  // Fetch all anime
  const fetchAllAnime = useCallback(async () => {
    if (loadingAnime) return; // prevent concurrent fetches
    setLoadingAnime(true);
    setError(null);

    try {
      const res = await fetch("/api/anime");
      if (!res.ok) throw new Error("Failed to fetch anime list");

      const data = (await res.json()) as { animes: Anime[] };
      if (isMounted.current) setAllAnime(data.animes);
    } catch (err) {
      if (isMounted.current)
        setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      if (isMounted.current) setLoadingAnime(false);
    }
  }, [setAllAnime]); // only stable deps

  // Handle delete
  const handleDelete = useCallback(async () => {
    if (selectedForDelete.size === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedForDelete.size} anime?`)) return;

    setProcessingDelete(true);
    setError(null);

    try {
      const res = await fetch("/api/anime/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selectedForDelete) }), // string IDs
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Failed to delete");

      setAllAnime((prev) => prev.filter((a) => !selectedForDelete.has(a.id)));
      setSelectedForDelete(new Set());
      setDeleteMode(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setProcessingDelete(false);
    }
  }, [selectedForDelete, setAllAnime]);

  // Fetch anime on mount
  useEffect(() => {
    isMounted.current = true;
    fetchAllAnime();
    return () => {
      isMounted.current = false;
    };
  }, [fetchAllAnime]);

  return (
    <div className="space-y-4 border p-4 rounded bg-secondary-background">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">All Anime</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setDeleteMode(!deleteMode)}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              deleteMode ? "bg-red-600 text-white" : "bg-gray-200 text-black"
            }`}
            aria-label={deleteMode ? "Cancel delete mode" : "Enter delete mode"}
          >
            <Trash2 size={16} />
            {deleteMode ? "Cancel" : "Delete"}
          </button>

          {deleteMode && (
            <button
              onClick={handleDelete}
              disabled={selectedForDelete.size === 0 || processingDelete}
              className="bg-red-600 text-white px-3 py-1 rounded disabled:bg-gray-400"
              aria-label={`Confirm deletion of ${selectedForDelete.size} anime`}
            >
              {processingDelete ? "Deleting..." : `Confirm Delete (${selectedForDelete.size})`}
            </button>
          )}
        </div>
      </div>

      {/* Refresh */}
      <button
        onClick={fetchAllAnime}
        disabled={loadingAnime || processingDelete}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        aria-label="Refresh anime list"
      >
        {loadingAnime ? "Loading..." : "Refresh List"}
      </button>

      {/* Error */}
      {error && <p className="text-red-500 mt-2 break-words">{error}</p>}

      {/* Anime List */}
      {loadingAnime ? (
        <p className="text-gray-500 mt-2">Loading anime...</p>
      ) : allAnime.length > 0 ? (
        <div className="flex flex-col gap-3 mt-4">
          {allAnime.map((anime) => (
            <div
              key={anime.id}
              className="flex items-center gap-3 border rounded p-2 hover:bg-gray-50 relative"
            >
              {/* Thumbnail */}
              {anime.thumbnail ? (
                <img
                  src={anime.thumbnail}
                  alt={anime.title}
                  className="w-20 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-20 h-12 bg-gray-300 flex items-center justify-center rounded">
                  <span className="text-gray-600 text-sm">No Image</span>
                </div>
              )}

              {/* Title */}
              <span className="font-semibold">{anime.title}</span>

              {/* Delete Checkbox */}
              {deleteMode && (
                <label className="absolute top-2 right-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedForDelete.has(anime.id)}
                    onChange={() =>
                      setSelectedForDelete((prev) => {
                        const copy = new Set(prev);
                        if (copy.has(anime.id)) copy.delete(anime.id);
                        else copy.add(anime.id);
                        return copy;
                      })
                    }
                    aria-label={`Select ${anime.title} for deletion`}
                  />
                  <span className="sr-only">Select {anime.title} for deletion</span>
                </label>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No anime found.</p>
      )}
    </div>
  );
}
