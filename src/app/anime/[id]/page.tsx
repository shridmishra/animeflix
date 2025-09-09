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
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="">
        <h1 className="text-xl lg:text-4xl font-semibold">{anime.title}</h1>
        <p className="text-gray-700 mt-2">{anime.description}</p>
      </div>

      <EpisodePlayer episodes={episodes} defaultVideoId={defaultVideoId} />
    </div>
  );
}
