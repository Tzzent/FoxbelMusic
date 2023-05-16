interface EmptyProps {
  title?: string,
  subTitle?: string,
}

export default function Empty({
  title = 'Datos vacios!',
  subTitle = 'Parece que no existen datos en esta seccion.',
}: EmptyProps) {
  return (
    <div
      className="
      h-96
      flex
      justify-center
      items-center
      "
    >
      <div className="text-center">
        <h1
          className="
          font-bold 
          text-lg
          text-red-400
          "
        >
          {title}
        </h1>
        <p className="text-gray-500 text-sm">
          {subTitle}
        </p>
      </div>
    </div>
  )
}
