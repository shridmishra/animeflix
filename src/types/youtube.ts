/** ---------- YouTube API Response Types ---------- */

export type Thumb = { 
  url: string; 
  
};

export type SnippetThumbnails = {
  default?: Thumb;
  medium?: Thumb;
  high?: Thumb;
  standard?: Thumb;
  maxres?: Thumb;
};

export type PlaylistSnippet = {
  title: string;
  description: string;
  thumbnails?: SnippetThumbnails;
};

export type Playlist = {
  id: string;
  snippet: PlaylistSnippet;
};

export type PlaylistsListResponse = {
  items: Playlist[];
  nextPageToken?: string;
};

export type PlaylistItemSnippet = {
  title: string;
  description: string;
  resourceId: { kind: string; videoId: string };
  thumbnails?: SnippetThumbnails;
};

export type PlaylistItem = {
  snippet: PlaylistItemSnippet;
};

export type PlaylistItemsListResponse = {
  items: PlaylistItem[];
  nextPageToken?: string;
};

/** ---------- Cleaned Types (for AnimeFlix app) ---------- */

export type PlaylistDetails = {
  title: string;
  description: string;
  thumbnail: string;
};

export type VideoItem = {
  title: string;
  description: string;
  videoId: string;
  thumbnail: string;
};
