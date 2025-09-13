import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z, ZodError } from "zod";

const deleteSchema = z.object({
  ids: z
    .array(z.string()) // string IDs (CUIDs)
    .min(1, "At least one ID is required")
    .refine((ids) => ids.length <= 100, {
      message: "Cannot delete more than 100 anime at once",
    }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Deleting IDs:", body.ids);

    const { ids } = deleteSchema.parse(body);

    // Delete episodes linked to the anime first
    await prisma.episode.deleteMany({
      where: { animeId: { in: ids } },
    });

    // Now delete the anime
    const result = await prisma.anime.deleteMany({
      where: { id: { in: ids } },
    });

    if (result.count === 0)
      return NextResponse.json(
        { success: false, error: "No anime found with provided IDs" },
        { status: 404 }
      );

    return NextResponse.json({ success: true, deletedCount: result.count });
  } catch (err) {
    console.error("Delete anime error:", err);
    if (err instanceof ZodError) {
      const errorDetails = err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));
      return NextResponse.json(
        { success: false, error: "Invalid input", details: errorDetails },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Failed" },
      { status: 500 }
    );
  }
}
