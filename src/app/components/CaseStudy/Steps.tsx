import CustomImage from '@components/UI/CustomImage';
import { Lightbox } from '@components/UI/Lightbox';
import { addLeadingZero } from '@components/utils';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CaseStudyDynamicContentSteps } from '@libs/interfaces';
import React from 'react';
import { useState } from 'react';
import BeforeAfterSlider from '@components/UI/BeforeAfterSlider';
import Fade from '@components/Animations/Fade';

interface Props {
  steps: CaseStudyDynamicContentSteps[] | undefined;
}

export default function Steps({ steps }: Props) {
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
    <>
      {steps && steps.length > 1 && (
        <section aria-label='Dynamic Case Study Content Steps'>
          {
            <ul className='list-none ms-0'>
              {steps.map((step, index) => (
                <li key={`step-${index}`} className='mb-28'>
                  <section className='flex lg:flex-row flex-col-reverse gap-y-10 gap-x-16 items-center'>
                    <article className='flex-1 w-full gap-6 flex justify-center relative'>
                      {step.image_urls && step.image_urls.length > 0 ? (
                        step.image_urls.length === 2 ? (
                          <Fade direction='BTT'>
                            <BeforeAfterSlider
                              maxWidth='400px'
                              beforeImage={{
                                src: step.image_urls[0].url,
                                alt: step.image_urls[0].alt,
                              }}
                              afterImage={{
                                src: step.image_urls[1].url,
                                alt: step.image_urls[1].alt,
                              }}
                            />
                          </Fade>
                        ) : step.image_urls && step.image_urls.length === 1 ? (
                          <CustomImage
                            width='70%'
                            alt={step.image_urls[0].alt}
                            url={step.image_urls[0].url}
                            viewImgFullScreen={() => {
                              if (step.image_urls)
                                viewImgFullScreen(step.image_urls[0].url);
                            }}
                          />
                        ) : (
                          step.image_urls.map((image, imageIndex) => (
                            <React.Fragment key={`step-img_url-${imageIndex}`}>
                              <CustomImage
                                width='70%'
                                alt={image.alt}
                                url={image.url}
                                viewImgFullScreen={() => {
                                  viewImgFullScreen(image.url);
                                }}
                              />
                              {step.showFinalVersion &&
                                step.image_urls &&
                                imageIndex < step.image_urls.length - 1 && (
                                  <FontAwesomeIcon
                                    icon={faArrowRightLong}
                                    className='self-center text-2xl text-accent h-8'
                                  />
                                )}
                            </React.Fragment>
                          ))
                        )
                      ) : null}
                    </article>
                    <article className='flex-1 w-full'>
                      <Fade direction='BTT'>
                        <h3 className='flex gap-4 mb-4 lg:mb-10 text-2xl lg:text-3xl'>
                          <span className='block'>
                            {addLeadingZero(index + 1)}.
                          </span>
                          <span className='block'>{step.title}</span>
                        </h3>
                        <p>
                          {typeof step.description === 'string' &&
                            step.description}
                        </p>
                      </Fade>
                    </article>
                  </section>
                </li>
              ))}
            </ul>
          }
        </section>
      )}

      <Lightbox imageUrl={currentImg} isOpen={boxOpen} onClose={boxOnClose} />
    </>
  );
}
