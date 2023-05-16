import { useNavigate } from 'react-router-dom';
import useArtistInfo from '../../hooks/useArtistInfo';
import { TopAlbum } from '../../interfaces/TopAlbum';
import Album from '../Album';
import Button from '../Button';
import Icon from '../Icon';

interface AdProps {
  topAlbum: TopAlbum;
}

export default function Ad({
  topAlbum,
}: AdProps) {
  const navigate = useNavigate();
  const { data } = useArtistInfo(topAlbum?.artist?.name);

  return (
    <div
      style={{
        background: `
        linear-gradient(180deg, rgba(167, 0, 0, 0.7), rgba(0, 0, 0, 0.8)),
        url(${data?.thumbnail}) right
        `,
      }}
      className="
      flex
      flex-col
      md:flex-row
      relative
      bg-[#A70000B2]
      "
    >
      <div
        className="
        w-full
        h-full
        bg-[#D7D5D5]
        absolute
        opacity-50
        "
      ><span className="sr-only">This is an overlay</span>
      </div>
      <Album
        albumId={topAlbum?.id}
        imageSrc={topAlbum?.cover_big}
        className="max-w-xs max-h-xs m-auto text-white"
      />
      <div
        className="
        text-white
        p-5
        z-10
        flex
        flex-col
        justify-between
        gap-5
        w-full
        "
      >
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-lg">
            {topAlbum?.artist?.name} | {topAlbum?.title}
          </h1>
          <div className="flex gap-5">
            <h4>Lo mejor de {topAlbum?.artist?.name}</h4>
            <h4 className="text-[#662323] font-semibold">{topAlbum?.fans} seguidores</h4>
          </div>
          <p className="text-sm">{data?.bio}</p>
        </div>
        <div className="flex items-center gap-5">
          <Button
            onClick={() => navigate(`/albums/${topAlbum?.id}`)}
            label="Reproducir"
            color="#E86060"
          />
          <Button
            label="Seguir"
            color="#E86060"
            outline
          />
          <Icon
            icon="ellipsis-h"
            className="text-2xl"
          />
        </div>
      </div>
    </div>
  )
}
