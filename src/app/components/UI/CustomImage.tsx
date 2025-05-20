import Image from 'next/image';

export default function CustomImage({
  url,
  alt,
  width = '50%',
  height = 'auto',
  className = '',
  viewImgFullScreen,
}: {
  url: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
  viewImgFullScreen: (url: string) => void;
}) {
  return (
    <figure
      className={'shadow-md rounded-lg custom-image-figure-wrapper' + className}
    >
      <img
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%', height: '100%' }}
        src={url}
        alt={alt}
        onClick={() => {
          viewImgFullScreen(url);
        }}
      />
    </figure>
  );
}
