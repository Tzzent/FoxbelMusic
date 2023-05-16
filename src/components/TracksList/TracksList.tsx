import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSongCtx from '../../hooks/useSongCtx';
import { Track as ITrack } from '../../interfaces/Track';
import { Track_v2 } from '../../interfaces/Track_v2';
import Credit from '../Credit';
import Empty from '../Empty';
import { TrackInfo } from '../TrackInfo';
import Track from './Track';

interface TracksListProps {
  tracks?: ITrack[] | Track_v2[] | null;
}

export default function TracksList({
  tracks,
}: TracksListProps) {
  const [trackInfo, setTrackInfo] = useState<ITrack | null>(null);
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const { id } = useParams();

  const {
    updateSongs,
    playSong,
  } = useSongCtx();

  const showDetail = useCallback(async (trackId: number) => {
    const trackInfo = await (await fetch(`/api/track/${trackId}`)).json();

    if (trackInfo) {
      setTrackInfo(trackInfo);
      return setDetailOpen(true);
    }

    setDetailOpen(false);
  }, []);


  const handlePlayTrack = useCallback((idx: number) => {
    const listId = parseInt(id as string);

    if (tracks) {
      updateSongs(tracks, listId);
    }

    playSong(idx);
  }, [id, tracks, playSong, updateSongs]);


  if (tracks?.length === 0 || !tracks) {
    return (
      <Empty />
    )
  }

  return (
    <div
      className="
      w-full
      text-sm 
      text-gray-500
      "
    >
      <Credit />
      {tracks?.map((track, index) => (
        <Track
          key={index}
          id={track.id}
          showDetail={showDetail}
          index={index}
          artistName={track.artist.name}
          title={track.title}
          md5_image={track.md5_image}
          duration={track.duration}
          handlePlayTrack={handlePlayTrack}
        />
      ))
      }
      <TrackInfo
        isOpen={detailOpen}
        setIsOpen={setDetailOpen}
        trackInfo={trackInfo}
      />
    </div>
  )
}
