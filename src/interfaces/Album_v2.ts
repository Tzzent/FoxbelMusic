import { Album } from './Album';
import { Contributor } from './Contributor';
import { Genre } from './Genre';
import { Track_v2 } from './Track_v2';

export interface Album_v2 extends Album {
  upc: string,
  share: string,
  genre_id: number,
  genres: {
    data: Genre[],
  },
  label: string,
  duration: number,
  fans: number,
  explicit_content_lyrics: number,
  explicit_content_cover: number,
  contributors: Contributor[],
  tracks: {
    data: Track_v2[],
  },
  type: string,
}
