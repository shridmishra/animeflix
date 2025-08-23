// src/app/api/youtube/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  fetchPlaylistDetails,
  fetchPlaylistVideos,
  extractPlaylistId,
} from "@/utils/youtube";
import { VideoItem } from "@/types/youtube";

export const runtime = "nodejs"; // ensure Node runtime for Prisma
export const dynamic = "force-dynamic";

type BodyShape = {
  playlistUrl?: string; // accepts full URL or raw playlist ID
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

    // 1) Fetch playlist metadata (title/description/thumbnail if present)
    const details = await fetchPlaylistDetails(playlistId);

    // 2) Fetch ALL videos in playlist (pagination handled in helper)
    const videos: VideoItem[] = await fetchPlaylistVideos(playlistId);

    // 3) If playlist thumbnail is missing, use first video's thumbnail (if available)
    const finalThumbnail = details.thumbnail || videos[0]?.thumbnail || "";

    // 4) Upsert Anime using the resolved thumbnail
    const anime = await prisma.anime.upsert({
      where: { playlistId },
      update: {
        title: details.title,
        description: details.description,
        thumbnail: finalThumbnail,
      },
      create: {
        title: details.title,
        description: details.description,
        thumbnail: finalThumbnail,
        playlistId,
      },
      select: { id: true, title: true, playlistId: true, thumbnail: true },
    });

    // 5) Upsert episodes (keeps existing ones, updates changed metadata)
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
      { message: "Anime imported successfully", anime, episodeCount: videos.length },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error during ingestion";
    console.error("[/api/youtube] Ingestion failed:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
