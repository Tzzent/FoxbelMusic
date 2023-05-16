import { useEffect, useRef, useState } from 'react';
import useSongCtx from '../../hooks/useSongCtx';
import Album from '../Album';
import Button from '../Button';
import Icon from '../Icon';

export default function Footer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    songs,
    currentSong,
    isPlaying,
    togglePlay,
    prevSong,
    nextSong,
    playSong,
  } = useSongCtx();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }

    if (!isPlaying) {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSong, nextSong, prevSong, playSong])

  return (
    <div
      className="
      bg-[#EB5757] 
      text-white 
      fixed 
      bottom-0 
      left-0 
      right-0 
      z-20
      grid
      grid-cols-2
      sm:grid-cols-3
      gap-10
      place-items-center
      "
    >
      <audio
        onEnded={nextSong}
        ref={audioRef}
        src={songs?.[currentSong]?.preview || ''}
        style={{ display: 'none' }}
      ></audio>
      <CurrentSong
        srcAlbum={songs?.[currentSong]?.album?.cover_big}
        nameSong={songs?.[currentSong]?.title}
        nameArtist={songs?.[currentSong]?.artist?.name}
        nameAlbum={songs?.[currentSong]?.album?.title} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        prevSong={prevSong}
        nextSong={nextSong}
      />

      {audioRef && (<Volume audioRef={audioRef} />)}
    </div >
  )
}

interface CurrentSongProps {
  srcAlbum?: string,
  nameSong?: string,
  nameArtist?: string,
  nameAlbum?: string,
}

const CurrentSong = ({
  srcAlbum = '/assets/images/foxbel-music-white-icon.png',
  nameSong = 'Canción',
  nameArtist = 'Artista',
  nameAlbum = 'Álbum',
}: CurrentSongProps) => {
  return (
    <div className="flex items-center gap-4 h-full overflow-hidden place-self-start">
      <div className="w-16 h-full">
        <Album
          imageSrc={srcAlbum}
          overlay={false}
        />
      </div>
      <div className="max-w-[5em] sm:max-w-[10em] truncate">
        <h3 className='font-[700] text-sm truncate'>{nameSong}</h3>
        <p className='text-xs truncate'>{nameArtist} - {nameAlbum}</p>
      </div>
    </div>
  )
}

interface PlayerProps {
  currentSong?: number,
  isPlaying?: boolean,
  togglePlay?: () => void,
  prevSong?: () => void,
  nextSong?: () => void,
}

const Player = ({
  currentSong,
  isPlaying,
  togglePlay,
  prevSong,
  nextSong,
}: PlayerProps) => {
  return (
    <div
      className="
      h-full 
      px-5 
      flex 
      items-center 
      justify-center 
      "
    >
      <Button
        disabled={currentSong == -1 ? true : false}
        onClick={prevSong}
      >
        <Icon icon="backward-step" />
      </Button>
      <Button
        onClick={togglePlay}
        disabled={currentSong == -1 ? true : false}
        className="
        bg-red-300/50 
        rounded-full 
        w-10 
        h-10 
        flex 
        items-center 
        justify-center
        "
      >
        {isPlaying ? <Icon icon="pause" /> : <Icon icon="play" />}
      </Button>
      <Button
        disabled={currentSong == -1 ? true : false}
        onClick={nextSong}
      >
        <Icon icon="forward-step" />
      </Button>
    </div >
  )
}

interface VolumeProps {
  audioRef: React.RefObject<HTMLAudioElement>,
}

const Volume = ({
  audioRef,
}: VolumeProps) => {
  const [volume, setVolume] = useState(0.5);

  const handleVolumeChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(ev.target.value);
    setVolume(value);
    if (audioRef?.current) {
      audioRef.current.volume = value;
    }
  }

  return (
    <div className="h-full hidden sm:flex items-center gap-5 px-5 place-self-end">
      <input
        id="default-range"
        type="range"
        min='0'
        max='1'
        step='0.1'
        value={volume}
        onChange={handleVolumeChange}
        className="
        w-full 
        max-w-[100px] 
        h-2 
        bg-white 
        rounded-lg 
        appearance-none 
        cursor-pointer
        "
      />
      <div>
        {
          volume == 0
            ? <Icon icon="volume-off" className='cursor-pointer' />
            : volume > 0 && volume < 0.5
              ? <Icon icon="volume-low" />
              : <Icon icon="volume-high" />
        }
      </div>
    </div>
  )
}