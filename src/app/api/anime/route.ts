import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const animes = await prisma.anime.findMany({
      include: { episodes: true }, 
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ animes });
  } catch (error) {
    console.error("Error fetching animes:", error);
    return NextResponse.json({ error: "Failed to fetch animes" }, { status: 500 });
  }
}
