interface OverlayProps {
  clickOverlay: () => void,
  className?: string,
  children?: React.ReactNode,
}

export default function Overlay({
  clickOverlay,
  className,
  children,
}: OverlayProps) {
  return (
    <div
      onClick={clickOverlay}
      className={`
      bg-black
      bg-opacity-50
      absolute
      top-0
      left-0
      right-0
      bottom-0
      w-full
      h-full
      flex 
      justify-center 
      items-center
      z-10
      ${className}
      `}
    >
      <span className="sr-only">
        Overlay
      </span>
      {children}
    </div>
  )
}
