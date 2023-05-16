export interface User {
  id: number,
  name: string,
  link?: string,
  picture?: string,
  picture_small?: string,
  picture_medium?: string,
  picture_big?: string,
  picture_xl?: string,
  country?: string,
  tracklist?: string,
  type?: string

  accessToken?: string,
}