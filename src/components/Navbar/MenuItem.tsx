import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface MenuItemProps {
  onClick: () => void,
  icon?: IconProp,
  label: string,
  className?: string,
}

export default function MenuItem({
  onClick,
  icon,
  label,
  className,
}: MenuItemProps) {
  return (
    <div
      className={`
      cursor-pointer
      hover:bg-gray-100
      px-4
      py-[5px]
      ${className}
      `}
    >
      <button
        onClick={onClick}
        className="flex gap-3 items-center"
      >
        {icon && (<FontAwesomeIcon icon={icon} />)}
        {label}
      </button>
    </div>
  )
}
