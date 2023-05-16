interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({
  children,
}: ContainerProps) {
  return (
    <div
      className={`
      lg:ml-80
      `}
    >
      {children}
    </div>
  )
}