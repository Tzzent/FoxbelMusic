import { NavLink } from 'react-router-dom';

export interface SideItemProps {
  label: string,
  to: string,
}

export default function SideItem({
  label,
  to,
}: SideItemProps) {
  return (
    <li
      className="
      cursor-pointer
      my-4 
      text-sm
      hover:text-[#EB5757]
      "
    >
      <NavLink
        to={to}
        className={({ isActive }) => (
          (isActive)
            ? `
            before:content-[""] 
            before:absolute 
            text-[#E86060] 
            before:w-1 
            before:h-6 
            before:bg-[#E86060] 
            before:left-0
            `
            : ``
        )}
      >
        {label}
      </NavLink>
    </li >
  )
}
