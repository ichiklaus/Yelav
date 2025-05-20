import { CaseStudyContent } from '@libs/interfaces';
import Fade from '@components/Animations/Fade';
import { splitLine } from '@components/utils';

interface Props {
  data: CaseStudyContent[];
}

export default function Content({ data }: Props) {
  return (
    <section className='w-full xl:w-2/3 mx-auto flex flex-col justify-center'>
      <div className='text-left lg:px-10'>
        {data.map((item, index) => (
          <Fade key={`content-${index}`} direction='BTT'>
            <article className='mb-20' id={item.name}>
              <h2 className='mb-3 font-bold text-accent'>
                {item.title}
              </h2>
              <section>{splitLine(item.description)}</section>
            </article>
          </Fade>
        ))}
      </div>
    </section>
  );
}
