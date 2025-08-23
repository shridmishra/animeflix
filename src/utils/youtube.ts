import axios, { AxiosResponse } from "axios";
import {
  SnippetThumbnails,
  PlaylistsListResponse,
  PlaylistItemsListResponse,
  PlaylistDetails,
  VideoItem,
} from "@/types/youtube"; 


const YT_API = "https://www.googleapis.com/youtube/v3";

/** ---------- Helpers ---------- */
function pickBestThumb(thumbnails?: SnippetThumbnails): string {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    ""
  );
}

/** ---------- Fetch playlist metadata ---------- */
export async function fetchPlaylistDetails(
  playlistId: string
): Promise<PlaylistDetails> {
  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error("Missing YOUTUBE_API_KEY in environment");
  }

  const res: AxiosResponse<PlaylistsListResponse> = await axios.get(
    `${YT_API}/playlists`,
    {
      params: {
        part: "snippet",
        id: playlistId,
        key: process.env.YOUTUBE_API_KEY,
      },
    }
  );

  const playlist = res.data.items?.[0];
  if (!playlist) throw new Error("Playlist not found");

  return {
    title: playlist.snippet.title,
    description: playlist.snippet.description,
    thumbnail: pickBestThumb(playlist.snippet.thumbnails),
  };
}

/** ---------- Fetch all videos in a playlist ---------- */
export async function fetchPlaylistVideos(
  playlistId: string
): Promise<VideoItem[]> {
  if (!process.env.YOUTUBE_API_KEY) {
    throw new Error("Missing YOUTUBE_API_KEY in environment");
  }

  const videos: VideoItem[] = [];
  let nextPageToken: string | undefined = undefined;

  do {
    const res: AxiosResponse<PlaylistItemsListResponse> = await axios.get(
      `${YT_API}/playlistItems`,
      {
        params: {
          part: "snippet",
          playlistId,
          maxResults: 50,
          pageToken: nextPageToken,
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    const pageItems = res.data.items ?? [];
    for (const item of pageItems) {
      const s = item.snippet;
      if (
        !s?.resourceId?.videoId ||
        !s.title ||
        s.title.toLowerCase().includes("deleted")
      ) {
        continue;
      }
      videos.push({
        title: s.title,
        description: s.description ?? "",
        videoId: s.resourceId.videoId,
        thumbnail: pickBestThumb(s.thumbnails),
      });
    }

    nextPageToken = res.data.nextPageToken;
  } while (nextPageToken);

  return videos;
}

/** ---------- Extract playlist ID ---------- */
export function extractPlaylistId(input: string): string {
  const match = input.match(/[?&]list=([^#\&\?]+)/);
  return match ? match[1] : input.trim();
}
