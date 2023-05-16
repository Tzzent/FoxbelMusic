import { ArtistInfo } from '../interfaces/ArtistInfo';

export default async function getArtistInfo(query: string) {
  let url = 'https://es.wikipedia.org/w/api.php';

  const params: any = {
    action: 'query',
    prop: 'pageimages|extracts',
    generator: 'search',
    exsentences: 1,
    exlimit: 1,
    exintro: 1,
    explaintext: 1,
    piprop: 'thumbnail',
    pilimit: 1,
    gsrlimit: 1,
    gsrsearch: query,
    format: 'json',
    pithumbsize: 500
  };

  url = url + "?origin=*";

  Object.keys(params).forEach((key) => {
    url += "&" + key + "=" + params[key]
  });

  const response = await fetch(url);
  const result = await response.json();

  if (result.query.pages) {
    const pageId = Object.keys(result.query.pages)[0];
    const definition = result.query.pages[pageId].extract;
    const firstSentence = definition.split('.')[0] + '.';
    const cleanDefinition = firstSentence.replace(/\[\d+\]/g, '');
    const artistThumbnail = result.query.pages[pageId].thumbnail?.source;
    const artist = { bio: cleanDefinition, thumbnail: artistThumbnail }
    return artist as ArtistInfo;
  }
  return null;
}