import { Link } from 'react-router-dom';
import { Artist } from '../interfaces/Artist';
import Icon from './Icon';

interface AlbumProps {
  albumId?: number,
  imageSrc?: string,
  title?: string,
  artist?: Artist,
  overlay?: boolean,
  className?: string,
}

export default function Album({
  albumId,
  imageSrc,
  title,
  artist,
  overlay = true,
  className,
}: AlbumProps) {
  if (!imageSrc && !title && !artist) {
    return <div>Loading...</div>
  }

  return (
    <div
      className={`
      flex
      flex-col
      overflow-hidden
      relative
      w-full
      h-full
      ${className}
      `}
    >
      <div
        className="
        relative 
        cursor-pointer 
        group 
        "
      >
        <img
          src={imageSrc}
          className="w-full h-full object-cover"
        />
        {overlay &&
          (<div
            className="
            absolute
            top-0
            hidden
            group-hover:flex
            justify-center
            items-center
            w-full
            h-full
            hover:bg-gray-900
            hover:bg-opacity-50
            "
          >
            <Icon
              icon="ellipsis-vertical"
              className="absolute top-3 right-3 text-xl"
            />
            <Link to={`/albums/${albumId}`}>
              <Icon
                icon="play"
                className="text-6xl"
              />
            </Link>
          </div>)}
      </div>
      {(title || artist) &&
        (<div className="mt-2">
          <h2
            className="
            text-slate-800
            font-[700]
            truncate
            text-sm
            "
          >
            {title}
          </h2>
          <h4
            className="
            text-slate-400 
            truncate 
            text-xs
            "
          >
            {artist?.name}
          </h4>
        </div>)}
    </div>
  )
}