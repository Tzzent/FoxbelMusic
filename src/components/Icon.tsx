import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-common-types';

interface IconProps {
  icon: IconName,
  className?: string,
  onClick?: () => void,
  style?: React.CSSProperties,
}

export default function Icon({
  icon,
  className,
  onClick,
  style,
}: IconProps) {
  return (
    <FontAwesomeIcon
      onClick={onClick}
      icon={icon}
      style={style}
      className={`
      cursor-pointer
      hover:scale-125
      ${className ? className : 'text-white'}
      `}
    />
  )
}
