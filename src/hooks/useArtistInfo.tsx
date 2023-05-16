import {
  useCallback,
  useEffect,
  useState
} from 'react';
import getArtistInfo from '../actions/getArtistInfo';
import { ArtistInfo } from '../interfaces/ArtistInfo';

export default function useArtistInfo(query: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ArtistInfo | null>();

  const fetchArtistInfo = useCallback(async () => {
    setLoading(true);
    const response = await getArtistInfo(query);
    setData(response);
    setLoading(false);
  }, [query]);

  useEffect(() => {
    fetchArtistInfo();
  }, [fetchArtistInfo])

  return {
    loading,
    data,
  }
}