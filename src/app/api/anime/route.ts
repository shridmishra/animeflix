import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const animes = await prisma.anime.findMany({
      include: { episodes: true },
      orderBy: { createdAt: "desc" },
    });

    const cleaned = animes.map(anime => ({
      ...anime,
      title: anime.title.includes("[Anime Series in Hindi]")
        ? anime.title.replace(/\s*\[Anime Series in Hindi\]\s*/gi, "")
        : anime.title, // leave unchanged if not present
    }));

    return NextResponse.json({ animes: cleaned });
  } catch (error) {
    console.error("Error fetching animes:", error);
    return NextResponse.json({ error: "Failed to fetch animes" }, { status: 500 });
  }
}
