import { useParams } from 'react-router-dom';
import Carousel from '../components/Carousel/Carousel';
import Slide from '../components/Carousel/Slide';
import Container from '../components/Container';
import Icon from '../components/Icon';
import TracksList from '../components/TracksList/TracksList';
import HeadList from '../components/HeadList';
import useSongCtx from '../hooks/useSongCtx';
import { useCallback } from 'react';
import { humanReadableFans } from '../helpers/humanReadableFans';
import useApi from '../hooks/useApi';
import { Artist as IArtist } from '../interfaces/Artist';
import { Track } from '../interfaces/Track';

export default function Artist() {
  const { id } = useParams();
  const { response: tracks }: { response: { data: Track[], total: number } } = useApi(`/artist/${id}/top?limit=100`);
  const { response: artist }: { response: IArtist } = useApi(`/artist/${id}`);

  const {
    songs,
    updateSongs,
    currentListId,
    togglePlay,
    playSong,
  } = useSongCtx();

  const togglePlaylist = useCallback(() => {
    if (currentListId !== id) {
      tracks && updateSongs(tracks?.data, id);
      return playSong();
    }

    if (!songs || songs?.length === 0) {
      tracks && updateSongs(tracks?.data, id);
      return playSong();
    }
    togglePlay();
  }, [
    currentListId,
    id,
    tracks,
    playSong,
    songs,
    togglePlay,
    updateSongs,
  ]);

  return (
    <Container>
      <Carousel>
        <Slide>
          <img
            src={artist?.picture_big}
            alt={artist?.name}
          />
        </Slide>
        <Slide>
          <div className='flex flex-col justify-center items-center w-[10em] h-full'>
            <ul className='flex flex-col gap-2 my-5'>
              <li><Icon icon="music" className='text-sm text-[#ff001e]' /><span className='ml-2 text-xs'>{tracks?.total} canciones</span></li>
              <li><Icon icon="people-group" className='text-sm text-[#0447ff]' /><span className='ml-2 text-xs'>{humanReadableFans(artist?.nb_fan)} seguidores</span></li>
            </ul>
          </div>
        </Slide>
      </Carousel>
      <HeadList
        togglePlaylist={togglePlaylist}
        title={artist?.name}
        type={artist?.type}
        link={artist?.link}
      />
      <TracksList
        tracks={tracks?.data}
      />
    </Container>
  )
}
