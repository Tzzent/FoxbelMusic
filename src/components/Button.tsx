interface ButtonProps {
  label?: string,
  color?: string,
  onClick?: () => void,
  outline?: boolean,
  className?: string,
  disabled?: boolean,
  children?: React.ReactNode,
}

export default function Button({
  label,
  color,
  onClick,
  disabled = false,
  outline,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: outline ? 'transparent' : color,
        color: outline ? color : 'white',
        border: outline ? `1px solid ${color}` : 'none',
      }}
      className={`
      px-5
      py-2
      rounded-3xl
      hover:scale-110
      flex
      items-center
      gap-2
      disabled:opacity-50
      disabled:cursor-not-allowed
      ${className}
      `}
    >
      {children}
      {label}
    </button>
  )
}
