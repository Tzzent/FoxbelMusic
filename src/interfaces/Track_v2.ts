import { Track } from './Track';

export interface Track_v2 extends Omit<Track,
  'isrc' | 'share' | 'track_position' |
  'disk_number' | 'release_date' | 'bpm' |
  'gain' | 'available_countries' | 'contributors'> {
  time_add: number,
}