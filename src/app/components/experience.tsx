import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { MouseEvent } from 'react';
import moment from 'moment';

interface ExperienceProps {
  experience: Array<{
    key: string;
    company: string;
    link: string;
    role: string;
    period: { start: string; end: string };
    tasks: string[];
    tags: string[];
  }>;
}

function Experience({ experience }: ExperienceProps) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section id='experience' className='pt-32 -mt-32'>
      <AnimatePresence>
        <header>
          <h2 className='font-bold text-accent mb-6'>Experience</h2>
        </header>
        {experience.map((item) => (
          <article
            key={item.key}
            className='experience-box group rounded-lg transition-colors delay-100 ease-linear border border-transparent hover:border-white/10 hover:bg-light-lilac/5 motion-reduce:transition-none relative lg:px-6 lg:py-4 px-4 py-4'
            onMouseMove={handleMouseMove}
          >
            <motion.div
              className='pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100'
              style={{
                background: useMotionTemplate`
                    radial-gradient(
                      650px circle at ${mouseX}px ${mouseY}px,
                      rgba(133, 70, 240, 0.15),
                      transparent 60%
                    )
                  `,
              }}
            />

            <div className='flex flex-col lg:flex-row gap-2'>
              <div className='basis-1/3'>
                <p className='mb-4 text-light-bone'>
                  <span>{moment(item.period.start).format('MMMM YYYY')}</span>
                  <span> – </span>
                  <span>
                    {item.period.end !== ''
                      ? moment(item.period.end).format('MMMM YYYY')
                      : 'Present'}
                  </span>
                </p>
              </div>
              <div className='basis-2/3'>
                <h3 className='mb-4'>
                  <motion.a
                    href={item.link}
                    target='_blank'
                    className='text-xl font-bold group relative z-10'
                    whileHover={{ scale: 1.5 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 10,
                    }}
                  >
                    {item.company}
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className='ml-3 transition-colors delay-100 ease-linear hover:fill-current hover:text-accent'
                    />
                  </motion.a>
                </h3>
                <ul className='flex flex-col gap-4 styled-list lg:pl-6 ml-6 lg:ml-8 marker:text-accent mb-4'>
                  {item.tasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
                <ul className='inline-flex flex-wrap gap-4 mb-4 ml-3 lg:ml-8'>
                  {item.tags.map((tag, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ color: '#B488FF' }}
                      className='rounded-2xl border border-white/10 border-solid px-4 py-2 w-fit'
                    >
                      {tag}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </AnimatePresence>
    </section>
  );
}

export default Experience;
