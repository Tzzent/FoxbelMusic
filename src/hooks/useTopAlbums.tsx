import {
  useCallback,
  useEffect,
  useState
} from 'react';
import { Artist } from '../interfaces/Artist';
import { TopAlbum } from '../interfaces/TopAlbum';

export default function useTopAlbums() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TopAlbum[]>([]);

  const fetchTopAlbums = useCallback(async () => {
    setLoading(true);

    const topArtists: { data: Artist[] } = await (await fetch(`/api/chart/0/artists`)).json();

    const topAlbums = topArtists.data.map(async (tArtist) => {
      const album = await (await fetch(`/api/artist/${tArtist.id}/albums&limit=1`)).json()
      return { ...album.data[0], artist: tArtist };
    })

    setData(await Promise.all(topAlbums));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTopAlbums();
  }, [fetchTopAlbums])

  return {
    loading,
    data,
  }
}