import {
  useState,
  useRef,
  Children,
  UIEvent,
} from 'react';
import Icon from '../Icon';

interface CarouselProps {
  children: React.ReactNode,
}

export default function Carousel({
  children,
}: CarouselProps) {
  const childrenCount = Children.count(children);
  const [currentIdx, setCurrentIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (ev: UIEvent<HTMLDivElement>) => {
    const container = ev.target as HTMLDivElement;
    const slideWidth = container?.offsetWidth;
    const newSlide = Math.floor(container.scrollLeft / slideWidth);

    setCurrentIdx(newSlide);
  };

  const handleIndicatorClick = (i: number) => {
    const container = containerRef.current;
    const containerWidth = container?.offsetWidth;

    if (containerWidth) {
      const slideWidth = containerWidth / childrenCount;
      container.scrollTo({ left: i * slideWidth * 2, behavior: 'smooth' });
      setCurrentIdx(i);
    }
  };

  const indicators = [];

  for (let i = 0; i < childrenCount; i++) {
    indicators.push(
      <div
        onClick={() => handleIndicatorClick(i)}
        key={i}
        className="cursor-pointer"
      >
        <Icon
          icon="circle"
          style={currentIdx === i ? { color: '#EF5466' } : { color: '#808080' }}
        />
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="
        scr 
        max-w-[10em]
        max-h-[10em]
        m-auto 
        relative 
        flex  
        snap-x 
        snap-mandatory 
        overflow-x-auto 
        shadow-md
        "
      >
        {children}
      </div>
      <div className="flex justify-center gap-3 mt-3 text-xs">
        {indicators}
      </div>
    </>
  )
}
