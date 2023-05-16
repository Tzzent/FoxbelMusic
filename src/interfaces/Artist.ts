export interface Artist {
  id: number,
  link: string,
  name: string,
  picture: string,
  picture_big: string,
  picture_medium: string,
  picture_small: string,
  picture_xl: string,
  position: number,
  radio: boolean,
  tracklist: string,
  type: string,

  nb_fan?: number,
}