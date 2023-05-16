import Icon from './Icon';
import Overlay from './Overlay';

interface AvatarProps {
  id: number,
  clickOverlay?: (id: number) => void,
  withOverlay?: boolean,
  imageSrc: string,
  name: string,
  className?: string,
  label?: React.ReactNode,
  labelPosition?: 'top' | 'bottom' | 'left' | 'right',
}

export default function Avatar({
  id,
  clickOverlay = () => { null },
  withOverlay = true,
  imageSrc,
  name,
  className,
  label,
  labelPosition = 'bottom',
}: AvatarProps) {

  return (
    <div
      className={`
      flex items-center gap-5
      ${(labelPosition === 'top') && 'flex-col-reverse'}
      ${(labelPosition === 'bottom') && 'flex-col'}
      ${(labelPosition === 'left') && 'flex-row-reverse'}
      ${(labelPosition === 'right') && 'flex-row'}
      `}
    >
      <div
        className={`
        relative
        min-w-[2em]
        min-h-[2em]
        w-full
        h-full
        rounded-full
        overflow-hidden
        group
        cursor-pointer
        ${className}
        `}
      >
        {(withOverlay) &&
          <div className="hidden group-hover:block">
            <Overlay clickOverlay={() => clickOverlay(id)}>
              <Icon icon="play" className="text-white text-4xl" />
            </Overlay>
          </div>}
        <img
          src={imageSrc}
          alt={name}
          className="
            w-full
            h-full
            object-cover
          "
        />
      </div>
      <h1 className="truncate max-w-[9em]">
        {label}
      </h1>
    </div>
  )
}
