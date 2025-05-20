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
    <section className='w-full xl:w-2/3 mx-auto flex flex-col justify-center'>
      <div className='text-left lg:px-10'>
        {data.map((item, index) => (
          <div key={`dynamic-content-${index}`}>
            <Fade direction='BTT'>
              <article className='mb-20' id={item.name}>
                <h2 className='mb-3 font-bold text-accent'>
                  {item.title}
                </h2>
                <section>
                  {typeof item.description === 'string'
                    ? splitLine(item.description)
                    : item.description.map((descriptionItem) => {
                        if (typeof descriptionItem == 'object') {
                          let a = descriptionItem as DescriptionExtended;
                          return Object.values(a).map((value) => {
                            let s = value as DescriptionExtendedItem;
                            return (
                              <>
                                {renderContentType({
                                  type: s.type,
                                  content: s.content,
                                })}
                              </>
                            );
                          });
                        }
                      })}
                </section>
                <section>
                  {item.image_urls?.map((img, index) => (
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
              </article>
            </Fade>

            <section className='steps-section'>
              <ExternalLinks links={item.links} />

              <Steps steps={item.steps} />
            </section>
          </div>
        ))}
        <Lightbox imageUrl={currentImg} isOpen={boxOpen} onClose={boxOnClose} />
      </div>
    </section>
  );
}
