"use client";

import { useState } from "react";
import type { Anime } from "../../generated/prisma";
import type { ImportPlaylistResponse } from "@/types/api";

interface Props {
  setAllAnime: React.Dispatch<React.SetStateAction<Anime[]>>;
}

export function ImportPlaylist({ setAllAnime }: Props) {
  const [playlistUrl, setPlaylistUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImport() {
    if (!playlistUrl.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playlistUrl }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to import");
      }

      const data = (await res.json()) as ImportPlaylistResponse;

      if (data.anime) {
        setAllAnime((prev) => [data.anime!, ...prev]);
      }
      setPlaylistUrl("");
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 border p-4 rounded bg-secondary-background">
      <h2 className="text-xl font-semibold">Import Playlist</h2>
      <input
        type="text"
        placeholder="Paste YouTube playlist URL..."
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
        className="w-full border rounded p-2 bg-background"
      />
      <button
        onClick={handleImport}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Importing..." : "Import"}
      </button>
      {error && <p className="text-red-500 mt-2">❌ {error}</p>}
    </div>
  );
}
