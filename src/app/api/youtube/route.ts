// src/app/api/youtube/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  fetchPlaylistDetails,
  fetchPlaylistVideos,
  extractPlaylistId,
  
} from "@/utils/youtube";

import { prisma } from "../../../lib/prisma";
import { VideoItem } from "@/types/youtube";

// Ensure we are NOT on the Edge runtime (Prisma needs Node.js)
export const runtime = "nodejs";

// Optional: disable caching entirely for POST ingestion
export const dynamic = "force-dynamic";

type BodyShape = {
  playlistUrl?: string; // could be URL or raw ID
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BodyShape;

    if (!body?.playlistUrl || body.playlistUrl.trim().length === 0) {
      return NextResponse.json(
        { error: "playlistUrl (URL or ID) is required" },
        { status: 400 }
      );
    }

    const playlistId = extractPlaylistId(body.playlistUrl);

    // 1) Get playlist meta
    const details = await fetchPlaylistDetails(playlistId);

    // 2) Upsert Anime
    const anime = await prisma.anime.upsert({
      where: { playlistId },
      update: {
        title: details.title,
        description: details.description,
        thumbnail: details.thumbnail,
      },
      create: {
        title: details.title,
        description: details.description,
        thumbnail: details.thumbnail,
        playlistId,
      },
      select: { id: true, title: true, playlistId: true },
    });

    // 3) Fetch episodes
    const videos: VideoItem[] = await fetchPlaylistVideos(playlistId);

    // 4) Upsert each episode
    // (You could use createMany({ skipDuplicates: true }) for speed,
    // but upsert ensures updates if titles/descriptions change.)
    for (const v of videos) {
      await prisma.episode.upsert({
        where: { videoId: v.videoId },
        update: {
          title: v.title,
          description: v.description,
          thumbnail: v.thumbnail,
          animeId: anime.id,
        },
        create: {
          title: v.title,
          description: v.description,
          videoId: v.videoId,
          thumbnail: v.thumbnail,
          animeId: anime.id,
        },
      });
    }

    return NextResponse.json(
      {
        message: "Anime imported successfully",
        anime,
        episodeCount: videos.length,
      },
      { status: 201 }
    );
  } catch (err) {
    // Strongly type and serialize the error safely
    const message =
      err instanceof Error ? err.message : "Unknown error during ingestion";
    console.error("[/api/youtube] Ingestion failed:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
