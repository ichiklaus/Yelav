'use client';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import data from './data.json';

import Hero from '@components/hero';
import About from '@components/about';
import Experience from '@components/experience';
import Portfolio from '@components/portfolio';
// import SectionNavigator from '@components/SectionNavigator';

export default function Home() {
  return (
    <div className='app-container bg-body-black py-10'>
      <main id='main' className='main'>
        {/* <SectionNavigator
          sectionIds={['home', 'content']}
          showNavButtons={false}
          transitionType='scale'
        /> */}
        <Hero />
        <section
          id='content'
          className='flex flex-col gap-20 w-full xl:w-2/3 mx-auto'
        >
          <About />
          <Experience experience={data.experience} />
          <Portfolio
            projects={data.personal_projects.sort(function (a, b) {
              return a.index - b.index;
            })}
          />
        </section>
      </main>
    </div>
  );
}
