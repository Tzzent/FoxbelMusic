interface TitleProps {
  label: string,
  color: string,
}

export default function Title({
  label,
  color,
}: TitleProps) {
  return (
    <div>
      <h1
        className={`
        text-[${color}]
        font-semibold
        text-2xl
        mt-5
        mb-3
        `}
      >{label}</h1>
    </div>
  )
}
