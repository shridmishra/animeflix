"use client";

import { useState } from "react";
import type { Anime } from "../../generated/prisma";
import { ImportPlaylist } from "@/components/admin/ImportPlaylist";
import { AnimeGrid } from "@/components/admin/AnimeGrid"

export default function AdminPage() {
  const [allAnime, setAllAnime] = useState<Anime[]>([]);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold ">📥 Admin Dashboard</h1>

      <ImportPlaylist setAllAnime={setAllAnime} />

      <AnimeGrid allAnime={allAnime} setAllAnime={setAllAnime} />
    </div>
  );
}
