import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { MouseEvent } from 'react';

interface PortfolioProps {
  projects: Array<{
    index: number;
    title: string;
    role: string;
    content: string;
    stack: string[];
    links: { repo: string; site: string };
    img: string[];
  }>;
}

export default function Portfolio({ projects }: PortfolioProps) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section id='projects' className='pt-32 -mt-32'>
      <AnimatePresence>
        <header>
          <h2 className='text-4xl font-bold text-accent mb-6'>
            Personal Projects
          </h2>
        </header>
        <section className='flex flex-col gap-y-16 the-section'>
          {projects.map((project) => (
            <article
              key={project.index}
              className='relative bg-light-lilac/5 group port-article px-6 py-4 flex flex-col lg:flex-row gap-2 border border-transparent hover:border-white/10 rounded-lg transition-colors delay-100 ease-linear hover:bg-light-lilac/5 motion-reduce:transition-none '
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

              <div
                className='content the-main-content w-full'
              >
                {/* <figure className='progress'>
                  <motion.div className='image-item' style={{ pathLength: scrollYProgress }}>
                    <Image
                      src={project.img[0]}
                      alt=''
                      width={900}
                      height={900}
                    />
                  </motion.div>
                </figure> */}

                <section className='content-description'>
                  <div className='mb-4'>
                    <p className='text-accent text-2xl'>
                      {project.index < 10 ? `0${project.index}` : project.index}
                    </p>
                  </div>
                  <div>
                    <header>
                      <h3 className='text-2xl font-bold text-accent mb-2'>
                        {project.title}
                      </h3>
                    </header>
                    <section className='flex flex-col gap-3'>
                      <p>{project.role}</p>
                      <p className='mb-6 lg:mb-2'>{project.content}</p>
                      <ul className='flex gap-5 flex-col md:flex-row mb-6 lg:mb-2'>
                        {project.stack.map((item, index) => (
                          <motion.li
                          className='rounded-2xl border border-white/10 border-solid px-4 py-2 w-fit'
                            whileHover={{
                              color: '#B488FF',
                            }}
                            key={index}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                      <ul className='inline-flex flex-row justify-end gap-4 ml-2'>
                        <li key='repo-link'>
                          <motion.a
                            className='text-2xl mb-2 font-bold group relative z-10'
                            whileHover={{
                              color: '#B488FF',
                            }}
                            href={project.links.repo}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <FontAwesomeIcon icon={faGithub} />
                          </motion.a>
                        </li>
                        <li key='live-site-link'>
                          <motion.a
                            className='text-2xl mb-2 font-bold group relative z-10'
                            whileHover={{
                              color: '#B488FF',
                            }}
                            href={project.links.site}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                          </motion.a>
                        </li>
                      </ul>
                    </section>
                  </div>
                </section>
              </div>
            </article>
          ))}
        </section>
      </AnimatePresence>
    </section>
  );
}

// export default Portfolio;
