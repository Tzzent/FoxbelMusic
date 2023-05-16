import { Playlist } from './Playlist';
import { Track_v2 } from './Track_v2';

export interface Playlist_v2 extends Omit<Playlist, 'time_add' | 'time_mod'> {
  description: string,
  share: string,
  tracks: {
    data: Track_v2[],
  }
}
