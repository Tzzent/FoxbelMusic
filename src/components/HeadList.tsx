import { useParams } from 'react-router-dom';
import useSongCtx from '../hooks/useSongCtx';
import Button from './Button';
import Equalizer from './Equalizer';
import Icon from './Icon';

interface HeadListProps {
  togglePlaylist?: () => void,
  type?: string,
  title?: string,
  link?: string,
}

export default function HeadList({
  togglePlaylist,
  type,
  title,
  link,
}: HeadListProps) {
  const { id } = useParams();
  const {
    isPlaying,
    currentListId,
  } = useSongCtx();

  return (
    <div className="flex flex-col items-center justify-center gap-3 my-5">
      <span className="text-xs text-gray-400 uppercase">{type}</span>
      <h2 className="text-xl font-[700]">{title}</h2>
      <div
        className="
        grid 
        grid-cols-3
        items-center
        gap-5
        place-items-center
        "
      >
        <a
          href={link}
          target="_blank"
          className="
          shadow-2xl
          w-8
          h-8
          ">
          <img
            src="/assets/images/deezer-svgrepo-com.svg"
            className="w-full h-full rounded-full"
          />
        </a>
        <Button
          onClick={togglePlaylist}
          label="ESCUCHAR"
          color="#E86060"
          className="text-xs sm:text-base"
        >
          {(isPlaying && currentListId == id)
            ? (<Equalizer color="white" />)
            : (<Icon icon="play" />)}
        </Button>
        <Icon
          icon="share-nodes"
          className="
          text-red-900
          text-xl
          "
        />
      </div>
    </div >
  )
}