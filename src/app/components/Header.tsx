'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';

import NavList from './NavList';

export default function Header() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  return (
    <header
      className={`bg-body-black z-50 sticky top-0 ${
      scroll ? 'shadow-md shadow-light-lilac/5 py-4' : 'py-4 lg:py-0'
    }`}
    >
      <div
        className={`lg:py-2 px-4 ${scroll ? 'lg:py-0' : 'lg:py-2'}`}
      >
        <motion.div
          className='progress-bar fixed -z-50 top-0 left-0 right-0 h-2 bg-accent origin-top-left'
          style={{ scaleX }}
        />
      </div>

      <NavList />
    </header>
  );
}
