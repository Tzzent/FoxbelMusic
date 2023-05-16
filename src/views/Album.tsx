import { useParams } from 'react-router-dom';
import Carousel from '../components/Carousel/Carousel';
import Slide from '../components/Carousel/Slide';
import Container from '../components/Container';
import Icon from '../components/Icon';
import TracksList from '../components/TracksList/TracksList';
import { humanPlaylistTime } from '../helpers/humanReadableTime';
import { humanReadableFans } from '../helpers/humanReadableFans';
import HeadList from '../components/HeadList';
import useSongCtx from '../hooks/useSongCtx';
import { useCallback } from 'react';
import useApi from '../hooks/useApi';
import { Album_v2 } from '../interfaces/Album_v2';

export default function Album() {
  const { id } = useParams();
  const { response: album }: { response: Album_v2 } = useApi(`/album/${id}`);

  const {
    songs,
    updateSongs,
    currentListId,
    togglePlay,
    playSong,
  } = useSongCtx();


  const togglePlaylist = useCallback(() => {
    if (currentListId !== id) {
      album && updateSongs(album?.tracks?.data, album?.id);
      return playSong();
    }

    if (!songs || songs?.length === 0) {
      album && updateSongs(album?.tracks?.data, album?.id);
      return playSong();
    }
    togglePlay();
  }, [
    currentListId,
    id,
    album,
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
            src={album?.cover_big}
            alt={album?.title}
          />
        </Slide>
        <Slide>
          <div className='flex flex-col justify-center items-center w-[10em] h-full'>
            <ul className='flex flex-col gap-2 my-5'>
              <li><Icon icon="music" className='text-sm text-[#e73b4f]' /><span className='ml-2 text-xs'>{album?.nb_tracks} canciones</span></li>
              <li><Icon icon="clock" className='text-sm text-[#50d0e3]' /><span className='ml-2 text-xs'>{humanPlaylistTime(album?.duration)}</span></li>
              <li><Icon icon="people-group" className='text-sm text-[#2658e3]' /><span className='ml-2 text-xs'>{humanReadableFans(album?.fans)} seguidores</span></li>
            </ul>
          </div>
        </Slide>
      </Carousel>
      <HeadList
        togglePlaylist={togglePlaylist}
        title={album?.title}
        type={album?.type}
        link={album?.link}
      />
      <TracksList
        tracks={album?.tracks?.data}
      />
    </Container>
  )
}
