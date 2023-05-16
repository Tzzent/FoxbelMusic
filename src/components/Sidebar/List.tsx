import SideItem, { SideItemProps } from './SideItem';

interface ListProps {
  listing: {
    label: string,
    list: SideItemProps[],
  }
}

export default function List({
  listing,
}: ListProps) {
  return (
    <div className="text-white">
      <h2 className="text-lg font-semibold">{listing.label}</h2>
      <ul className="ml-2">
        {listing.list.map((item, index) => (
          <SideItem
            key={index}
            label={item.label}
            to={item.to}
          />
        ))}
      </ul>
    </div>
  )
}
