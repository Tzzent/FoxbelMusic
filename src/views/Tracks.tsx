import Container from '../components/Container';
import TracksList from '../components/TracksList/TracksList';
import useApi from '../hooks/useApi';
import { Track } from '../interfaces/Track';

export default function Tracks() {
  const { response }: { response: { data: Track[] } } = useApi('/chart/0/tracks');

  return (
    <Container>
      <TracksList tracks={response.data} />
    </Container>
  )
}
