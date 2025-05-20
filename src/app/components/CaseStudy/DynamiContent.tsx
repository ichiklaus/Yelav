import { CaseStudyDynamicContent } from '@libs/interfaces';
import Fade from '@components/Animations/Fade';
import { renderContentType, splitLine } from '@components/utils';
import { DescriptionExtended, DescriptionExtendedItem } from '@libs/interfaces';
import { useState } from 'react';
import { Lightbox } from '@components/UI/Lightbox';
import CustomImage from '@components/UI/CustomImage';
import ExternalLinks from './ExternalLinks';
import Steps from './Steps';

interface Props {
  data: CaseStudyDynamicContent[];
}

export default function DynamicContent({ data }: Props) {
  const [currentImg, setCurrentImg] = useState<string>('');
  const [boxOpen, setBoxOpen] = useState<boolean>(false);
  const viewImgFullScreen = (imgUrl: string) => {
    setBoxOpen(true);
    setCurrentImg(imgUrl);
  };

  const boxOnClose = () => {
    setBoxOpen(false);
    setCurrentImg('');
  };

  return (
    <section className='w-full xl:w-2/3 mx-auto flex flex-col justify-center text-left lg:px-10'>
      {data.map((item, index) => (
        <article
          className='mb-20'
          id={item.name}
          key={`dynamic-content-${index}`}
        >
          <Fade direction='BTT'>
            <h2 className='mb-3 font-bold text-accent'>{item.title}</h2>
            <section aria-label={`${item.title} Description`} className='mb-6'>
              {typeof item.description === 'string'
                ? splitLine(item.description)
                : item.description.map((descriptionItem, i) => {
                    if (typeof descriptionItem === 'object') {
                      const a = descriptionItem as DescriptionExtended;
                      return Object.values(a).map((value, j) => {
                        const s = value as DescriptionExtendedItem;
                        return renderContentType({
                          type: s.type,
                          content: s.content,
                        });
                      });
                    }
                    return null;
                  })}
            </section>

            {item.image_urls && item.image_urls?.length > 0 && (
              <section aria-label={`${item.title} Images`} className='mb-6'>
                {item.image_urls.map((img, index) => (
                  <CustomImage
                    key={`image_url-${index}`}
                    alt={img.alt}
                    url={img.url}
                    viewImgFullScreen={() => {
                      viewImgFullScreen(img.url);
                    }}
                  />
                ))}
              </section>
            )}

            <ExternalLinks links={item.links} />
          </Fade>

          <Steps steps={item.steps} />
        </article>
      ))}

      <Lightbox imageUrl={currentImg} isOpen={boxOpen} onClose={boxOnClose} />
    </section>
  );
}
