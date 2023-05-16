interface SlideProps {
  children: React.ReactNode,
}

export default function Slide({
  children,
}: SlideProps) {
  return (
    <div
      className="
      snap-center 
      shrink-0 
      w-full
      "
    >
      {children}
    </div>
  )
}
