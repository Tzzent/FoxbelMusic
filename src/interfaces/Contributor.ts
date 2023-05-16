import { Artist } from './Artist';

export interface Contributor extends Artist {
  role: string,
}