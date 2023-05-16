import { useCallback } from 'react';
import useSongCtx from '../../hooks/useSongCtx';
import { Album_v2 } from '../../interfaces/Album_v2';
import { Track_v2 } from '../../interfaces/Track_v2';
import DropModal from '../Modals/DropModal';

interface ListResultProps {
  parentRef: React.RefObject<HTMLDivElement>,
  isOpen: boolean,
  onHide: () => void,
  result: Track_v2[],
}

export default function ListResult({
  parentRef,
  onHide,
  isOpen,
  result,
}: ListResultProps) {
  const {
    updateSongs,
    playSong,
  } = useSongCtx();


  const handleOnClick = useCallback(async (albumId: number, trackId: number) => {
    const response = await (await fetch(`/api/album/${albumId}`)).json() as Album_v2;
    const index = response?.tracks?.data?.findIndex((track) => track.id === trackId);

    if (response?.tracks?.data && index !== -1) {
      updateSongs(response?.tracks?.data, albumId);
      playSong(index);
    }
    onHide();
  }, [
    playSong,
    updateSongs,
    onHide,
  ]);


  return (
    <DropModal
      parentRef={parentRef}
      isOpen={isOpen}
      onHide={onHide}
      className="
      top-16
      w-full
      overflow-y-auto
      max-h-48
      sm:max-h-max
      "
    >
      {result?.map((res) => (
        <button
          key={res.id}
          onClick={() => handleOnClick(res?.album?.id, res?.id)}
          className="
          px-3
          py-2 
          w-full 
          text-left 
          hover:bg-red-200
          "
        >
          <p className="truncate">
            {res.title} - {res.artist.name}
          </p>
        </button>
      ))}
    </DropModal>
  )
}
