import Social from './Social';
// import { motion, useScroll, AnimatePresence } from 'framer-motion';

export default function Hero() {
  return (
    <section id='home' style={{marginTop: "-14rem", marginBottom: "14rem"}} className='hero h-lvh w-full xl:w-2/3 mx-auto flex flex-col justify-center'>
      <header className='text-white'>
        <div className='ml-2 mb-2'>
          <small className='text-xl'>
            Hello, I&apos;m <span className='text-accent'>Nicolás</span>
          </small>
        </div>
        <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold'>
          A <span className='text-accent'>Web</span>{' '}
          <span className='text-accent'>Developer</span> 
          {/* at 
          <motion.a
            className='text-5xl md:text-7xl lg:text-8xl font-bold'
            whileHover={{
              color: '#B488FF',
            }}
            href='https://www.alphacrewstudio.com'
            target='_blank'
            rel='noopener noreferrer'
          > AlphaCrew Studio
          </motion.a> and 
          <motion.a
            className='text-5xl md:text-7xl lg:text-8xl font-bold'
            whileHover={{
              color: '#B488FF',
            }}
            href='https://www.mrfound3r.io'
            target='_blank'
            rel='noopener noreferrer'
          > Mr.Found3r
          </motion.a> */}
        </h1>
      </header>
      <section className='mt-8'>
        <Social />
      </section>
    </section>
  );
}
