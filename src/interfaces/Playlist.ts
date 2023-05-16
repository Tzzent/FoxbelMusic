import { User } from './User';

export interface Playlist {
  id: number,
  title: string,
  duration: number,
  public: boolean,
  is_loved_track: boolean,
  collaborative: boolean,
  nb_tracks: number,
  fans: number,
  link: string,
  picture: string,
  picture_small: string,
  picture_medium: string,
  picture_big: string,
  picture_xl: string,
  checksum: string,
  tracklist: string,
  creation_date: string,
  md5_image: string,
  picture_type: string,
  time_add: number,
  time_mod: number,
  creator: User,
  type: string,
}