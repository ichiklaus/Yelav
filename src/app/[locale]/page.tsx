'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Hero from '../../components/hero';
import About from '../../components/about';
import Experience from '../../components/experience';
import Portfolio from '../../components/portfolio';

config.autoAddCss = false;

export default function HomePage() {
  return (
    <div className='app-container bg-body-black py-10'>
      <main id='main' className='main'>
        <Hero />
        <section
          id='content'
          className='flex flex-col gap-20 w-full xl:w-2/3 mx-auto'
        >
          <About />
          <Experience />
          <Portfolio />
        </section>
      </main>
    </div>
  );
}
