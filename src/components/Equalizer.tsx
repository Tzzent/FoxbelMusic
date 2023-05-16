interface EqualizerProps {
  color?: string,
  width?: string,
  maxHeight?: string,
}

export default function Equalizer({
  color,
  width,
  maxHeight,
}: EqualizerProps) {
  return (
    <div style={{ width, maxHeight }} className='flex gap-[2.1px] justify-center h-4 overflow-hidden'>
      <div className="w-1">
        <div style={{ backgroundColor: color || 'black' }} className={`h-full equalizer-bar`}></div>
      </div>
      <div className="w-1">
        <div style={{ backgroundColor: color || 'black' }} className={`h-full equalizer-bar1`}></div>
      </div>
      <div className="w-1">
        <div style={{ backgroundColor: color || 'black' }} className={`h-full equalizer-bar2`}></div>
      </div>
    </div>
  );
}