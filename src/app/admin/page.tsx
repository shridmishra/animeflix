"use client";

import { useState } from "react";
import Image from "next/image";
import type { ImportPlaylistResponse } from "@/types/api";
import type { Anime } from "../../generated/prisma";

export default function AdminPage() {
  const [playlistUrl, setPlaylistUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ImportPlaylistResponse["anime"] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [loadingAnime, setLoadingAnime] = useState<boolean>(false);

  // import playlist
  async function handleImport() {
    setLoading(true);
    setError(null);
    setResult(null);

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
      setResult(data.anime);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  }

  // fetch all anime
  async function fetchAllAnime() {
    setLoadingAnime(true);
    setError(null);

    try {
      const res = await fetch("/api/anime");
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Failed to fetch anime list");
      }

      const data = (await res.json()) as { animes: Anime[] };
      setAllAnime(data.animes);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoadingAnime(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold">📥 Admin Dashboard</h1>

      {/* Import Playlist Section */}
      <div className="space-y-4 border p-4 rounded">
        <h2 className="text-xl font-semibold">Import Playlist</h2>
        <input
          type="text"
          placeholder="Paste YouTube playlist URL..."
          value={playlistUrl}
          onChange={(e) => setPlaylistUrl(e.target.value)}
          className="w-full border rounded p-2"
        />

        <button
          onClick={handleImport}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Importing..." : "Import"}
        </button>

        {error && <p className="text-red-500">❌ {error}</p>}

        {result && (
          <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{result.title}</h2>

            {result.thumbnail ? (
              <Image
                src={result.thumbnail}
                alt={result.title}
                width={480}
                height={270}
                className="rounded mt-2"
              />
            ) : (
              <div className="w-48 h-28 bg-gray-300 flex items-center justify-center mt-2 rounded">
                <span className="text-gray-600 text-sm">No Thumbnail</span>
              </div>
            )}

            <p className="mt-2">{result.description}</p>
          </div>
        )}
      </div>

      {/* List All Anime Section */}
      <div className="space-y-4 border p-4 rounded">
        <h2 className="text-xl font-semibold">All Anime</h2>
        <button
          onClick={fetchAllAnime}
          disabled={loadingAnime}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loadingAnime ? "Loading..." : "List All Anime"}
        </button>

        {allAnime.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {allAnime.map((anime) => (
              <div key={anime.id} className="border rounded shadow p-3">
                <h3 className="font-semibold text-lg">{anime.title}</h3>

                {anime.thumbnail ? (
                  <Image
                    src={anime.thumbnail}
                    alt={anime.title}
                    width={320}
                    height={180}
                    className="rounded mt-2"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-300 flex items-center justify-center mt-2 rounded">
                    <span className="text-gray-600 text-sm">No Thumbnail</span>
                  </div>
                )}

                <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                  {anime.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
