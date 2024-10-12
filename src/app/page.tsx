'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
// import Image from 'next/image';

import data from './data.json';

// import Header from '@components/app/header';
import Hero from '@components/app/components/hero';
import About from '@components/app/components/about';
import Experience from '@components/app/components/experience';
import Portfolio from '@components/app/components/portfolio';
// import { useEffect, useState } from 'react';

export default function Home() {
  // const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001,
  // });

  // const [scroll, setScroll] = useState(false);
  // useEffect(() => {
  //   window.addEventListener('scroll', () => {
  //     setScroll(window.scrollY > 50);
  //   });
  // }, []);

  return (
    <div className='app-container bg-body-black py-10'>
      {/* <header
        id='header'
        className={`py-4 px-4 sticky top-0 bg-body-black z-50 ${scroll ? 'shadow-md shadow-light-lilac/5 py-6' : ''}`}
      >
        <motion.div
          className='progress-bar fixed -z-50 top-0 left-0 right-0 h-2 bg-accent origin-top-left'
          style={{ scaleX }}
        />
        <Header />
      </header> */}
      <main className='main'>
        <Hero />
        <section className='flex flex-col gap-20 w-full xl:w-2/3 mx-auto'>
          <About />
          <Experience experience={data.experience} />
          <Portfolio projects={data.personal_projects} />
        </section>
      </main>
    </div>
  );
}
