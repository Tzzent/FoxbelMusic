import { MouseEvent } from 'react';
import { humanTrackTime } from '../../helpers/humanReadableTime';
import Avatar from '../Avatar';
import Icon from '../Icon';

interface TrackProps {
  index: number,
  id: number,
  title: string,
  artistName: string,
  md5_image: string,
  duration: number,
  handlePlayTrack: (idx: number) => void,
  showDetail: (trackId: number) => void,
}

export default function Track({
  index = 0,
  id,
  showDetail,
  title,
  artistName,
  md5_image,
  duration,
  handlePlayTrack,
}: TrackProps) {

  const showTrackDetail = (ev: MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    showDetail(id);
  }

  const labelTrack = (
    <div className="flex flex-col">
      <span className='max-w-[25vw] truncate'>{title}</span>
      <span className='max-w-[25vw] truncate text-[#828282] text-[.8em]'>{artistName}</span>
    </div>
  )

  return (
    <div
      onClick={() => handlePlayTrack(index)}
      className="
      hover:bg-gray-100
      group
      border-t
      px-5 
      flex 
      justify-between 
      items-center 
      cursor-pointer
      "
    >
      <div
        className="
        flex 
        items-center 
        gap-2 
        py-4 
        font-medium 
        text-gray-900 
        whitespace-nowrap
        "
      >
        <Avatar
          id={index}
          imageSrc={`https://e-cdns-images.dzcdn.net/images/cover/${md5_image}/500x500-000000-80-0-0.jpg`}
          name={title}
          className="max-w-[2.5em] max-h-[2.5em]"
          label={labelTrack}
          labelPosition="right"
        />
      </div>
      <div className="flex items-center gap-5">
        <span>
          {humanTrackTime(duration)}
        </span>
        <div
          onClick={showTrackDetail}
          className="
          w-8 
          h-8 
          flex 
          items-center 
          justify-center
          "
        >
          <Icon icon="ellipsis-v" className="text-red-950" />
        </div>
      </div>
    </div>
  )
}
