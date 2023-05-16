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
import { Playlist_v2 } from '../interfaces/Playlist_v2';

export default function Playlist() {
  const { id } = useParams();
  const { response: playlist }: { response: Playlist_v2 } = useApi(`/playlist/${id}`);

  const {
    songs,
    updateSongs,
    currentListId,
    togglePlay,
    playSong,
  } = useSongCtx();


  const togglePlaylist = useCallback(() => {
    if (currentListId != id) {
      playlist && updateSongs(playlist?.tracks?.data, playlist?.id);
      return playSong();
    }

    if (!songs || songs?.length === 0) {
      playlist && updateSongs(playlist?.tracks?.data, playlist?.id);
      return playSong();
    }

    togglePlay();
  }, [
    currentListId,
    id,
    playlist,
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
            src={playlist?.picture_medium}
            alt={playlist?.title}
          />
        </Slide>
        <Slide>
          <div className='flex flex-col justify-center items-center w-[10em] h-full'>
            <ul className='flex flex-col gap-2 my-5'>
              <li><Icon icon="music" className='text-sm text-[#c72135]' /><span className='ml-2 text-xs'>{playlist?.nb_tracks} canciones</span></li>
              <li><Icon icon="clock" className='text-sm text-[#3fd2e9]' /><span className='ml-2 text-xs'>{humanPlaylistTime(playlist?.duration)}</span></li>
              <li><Icon icon="people-group" className='text-sm text-[#2a5de7]' /><span className='ml-2 text-xs'>{humanReadableFans(playlist?.fans)} seguidores</span></li>
            </ul>
          </div>
        </Slide>
      </Carousel>
      <HeadList
        togglePlaylist={togglePlaylist}
        title={playlist?.title}
        type={playlist?.type}
        link={playlist?.link}
      />
      <TracksList
        tracks={playlist?.tracks?.data}
      />
    </Container>
  )
}
