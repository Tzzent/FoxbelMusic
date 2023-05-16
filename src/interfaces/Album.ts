import { Artist } from './Artist';

export interface Album {
  id: number,
  title: string,
  link: string,
  cover: string,
  cover_small: string,
  cover_medium: string,
  cover_big: string,
  cover_xl: string,
  md5_image: string,
  nb_tracks: number,
  release_date: string,
  record_type: string,
  available: boolean,
  tracklist: string,
  explicit_lyrics: boolean,
  time_add: number,
  artist: Artist,
  type: string,
}

