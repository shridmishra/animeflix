export interface AnimeCardType {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string;
  playlistId: string;
  createdAt: Date;
}