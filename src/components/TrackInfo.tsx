import { useRef } from 'react';
import { humanTrackTime } from '../helpers/humanReadableTime';
import { Track } from '../interfaces/Track';
import Avatar from './Avatar';
import Icon from './Icon';

interface TrackInfoProps {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  trackInfo: Track | null,
}

export const TrackInfo = ({
  isOpen,
  setIsOpen,
  trackInfo,
}: TrackInfoProps) => {
  const scrollContainer = useRef<HTMLDivElement>(null);


  const scrollLeft = () => {
    if (!scrollContainer.current) {
      return;
    }

    scrollContainer.current.scrollLeft -= 200;
  };

  const scrollRight = () => {
    if (!scrollContainer.current) {
      return
    }

    scrollContainer.current.scrollLeft += 200;
  };

  if (!trackInfo) {
    return null;
  }

  return (
    <>
      <div
        onClick={(ev) => ev.stopPropagation()}
        className={`
        fixed 
        z-30 
        left-0 
        bottom-0 
        w-full 
        h-full 
        bg-white 
        overflow-hidden 
        rounded-t-full 
        shadow-xl 
        shadow-white 
        sm:top-0 
        sm:right-0 
        sm:rounded-lg 
        sm:max-w-xs 
        sm:shadow-none 
        sm:m-auto
        ${isOpen ? 'max-h-[420px]' : 'max-h-[0px] sm:hidden'}
        `}
      >
        <div className='text-center flex flex-col items-center mt-8 relative'>
          <div className="w-[45%]">
            <h1 className='font-[700] truncate'>{trackInfo?.title}</h1>
            <p className='text-[#828282] text-xs truncate'>{trackInfo?.album?.title}</p>
          </div>
          <div
            ref={scrollContainer}
            className={`
            scr
            my-5 
            flex 
            max-w-[80%] 
            h-28 
            gap-5 
            ${trackInfo?.contributors.length > 2 && "overflow-x-scroll"}
            `}
          >
            {trackInfo?.contributors.map((contributor, idx) => (
              <div className="flex flex-col items-center" key={idx}>
                <div className="w-[80px] h-[80px]">
                  <Avatar
                    id={idx}
                    imageSrc={contributor.picture_big}
                    name={contributor.name}
                  />
                </div>
                <h2 className="text-xs max-w-[6em] mt-2 truncate">{contributor.name}</h2>
              </div>
            ))}
            <button
              onClick={scrollLeft}
              className='absolute left-2 bottom-0 top-0 cursor-pointer text-lg'
            >
              {'<'}
            </button>
            <button
              onClick={scrollRight}
              className='absolute right-2 bottom-0 top-0 cursor-pointer text-lg'
            >
              {'>'}
            </button>
          </div>
        </div>

        <hr className='w-full' />

        <ul className='w-full flex flex-col gap-3 p-5 text-sm'>
          <li className="flex justify-between"><b>Compartir:</b><p className="text-[#828282] underline">Copiar <Icon icon="share" /></p></li>
          <li className="flex justify-between"><b>Duracion:</b><p className="text-[#828282]">{humanTrackTime(trackInfo?.duration)}</p></li>
          <li className="flex justify-between"><b>Publicado:</b><p className="text-[#828282]">{trackInfo?.release_date}</p></li>
          <li className="flex justify-between"><b>Bpm:</b><p className="text-[#828282]">{trackInfo?.bpm !== 0 ? trackInfo?.bpm : 'No especificado'}</p></li>
          <li className="flex justify-between"><b>Contenido explícito:</b><p className="text-[#828282]">{trackInfo?.explicit_lyrics ? 'SI' : 'NO'}</p></li>
        </ul>
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className={`
        fixed 
        top-0 
        left-0
        right-0 
        bottom-0 
        z-20 
        bg-gray-700
        opacity-50 
        ${isOpen ? 'block' : 'hidden'}
        `}
      />
    </>
  )
}