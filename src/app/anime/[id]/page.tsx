import { prisma } from "@/lib/prisma";
import EpisodePlayer from "@/components/EpisodePlayer";

interface PageProps {
  params: { id: string };
}

export default async function AnimePage({ params }: PageProps) {
  const anime = await prisma.anime.findUnique({
    where: { id: params.id },
    include: { episodes: { orderBy: { createdAt: "asc" } } },
  });

  if (!anime) {
    return <p className="p-6 text-red-500">Anime Not Found</p>;
  }

  const episodes = anime.episodes.map((ep) => ({
    id: ep.id,
    title: ep.title,
    videoId: ep.videoId ?? "",
  }));

  const defaultVideoId = episodes.find((e) => e.videoId)?.videoId ?? null;

  return (
    <>
      

      <EpisodePlayer episodes={episodes} defaultVideoId={defaultVideoId} />
    </>
  );
}
