import Image from 'next/image';
import { useState } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: {
    src: string;
    alt: string;
  };
  afterImage: {
    src: string;
    alt: string;
  };
  aspectRatio?: '1/1' | '1/2' | '4/3' | '3/2' | '16/9' | '16/10'; // Use only valid CSS aspect-ratio values
  maxWidth?: string;
}

export default function BeforeAfterSlider({
  afterImage,
  beforeImage,
  aspectRatio = '1/2',
  maxWidth = '380px',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMove = (x: number, container: HTMLDivElement) => {
    const rect = container.getBoundingClientRect();
    const relativeX = Math.max(0, Math.min(x - rect.left, rect.width));
    const percent = (relativeX / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(percent, 100)));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.currentTarget);
  };

  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX, e.currentTarget);
  };

  return (
    <div
      onMouseUp={handleMouseUp}
      onTouchEnd={handleTouchEnd}
      className='w-full relative'
    >
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={`relative w-full m-auto overflow-hidden select-none`}
        style={{
          maxWidth,
          aspectRatio,
        }}
      >
        <div
          className='absolute top-0 left-0 right-0 bottom-0'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.095)', zIndex: 1 }}
        />
        <Image alt={beforeImage.alt} fill priority src={beforeImage.src} />
        <div
          className='absolute top-0 left-0 right-0 bottom-0 overflow-hidden select-none'
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <Image alt={afterImage.alt} fill priority src={afterImage.src} />
        </div>

        <div
          className='absolute top-0 bottom-0 w-1 bg-body-black cursor-ew-resize z-10'
          style={{ left: `calc(${sliderPosition}% - 1px)` }}
        >
          <div className='bg-body-black absolute rounded-full w-3 h-3 -left-1 top-[calc(50%-6px)]'></div>
        </div>
      </div>
    </div>
  );
}
