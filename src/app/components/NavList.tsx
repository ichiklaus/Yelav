import React, { useEffect, useRef, useState } from 'react';

import './NavList.css';
import { motion } from 'framer-motion';

interface HamburgerProps {
  isOpen: boolean;
}

function Hamburger({ isOpen }: HamburgerProps) {
  return (
    <>
      <div className='hamburger'>
        <div
          className='burger'
          style={{ transform: isOpen ? `rotate(45deg)` : `rotate(0)` }}
        ></div>
        <div
          className='burger'
          style={{
            transform: isOpen ? `translateX(100%)` : `translateX(0)`,
            opacity: isOpen ? 0 : 1,
          }}
        ></div>
        <div
          className='burger'
          style={{
            transform: isOpen ? `rotate(-45deg)` : `rotate(0)`,
          }}
        ></div>
      </div>
    </>
  );
}

export default function NavList() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setHamburgerOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <nav className='md:py-2 nav-container relative'>
        <ul
          className={`list-inside flex gap-x-8
        ${
          hamburgerOpen
            ? 'transition-in visible ul-menu bg-light-lilac/10 backdrop-blur-2xl'
            : 'hidden'
        } flex flex-row gap-x-3 pl-8 ul-menu navlist md:py-4 md:flex`}
        >
          <li>
            <motion.a
              href='/#home'
              className=''
              whileHover={{
                color: '#B488FF',
              }}
            >
              Home
            </motion.a>
          </li>
          <li>
            <motion.a
              href='/#about'
              className=''
              whileHover={{
                color: '#B488FF',
              }}
            >
              About
            </motion.a>
          </li>
          <li>
            <motion.a
              href='/#experience'
              className=''
              whileHover={{
                color: '#B488FF',
              }}
            >
              Experience
            </motion.a>
          </li>
          <li>
            <motion.a
              href='/#projects'
              className=''
              whileHover={{
                color: '#B488FF',
              }}
            >
              Projects
            </motion.a>
          </li>
        </ul>
      </nav>
      <div className='hamburger-wrapper' onClick={toggleHamburger}>
        <Hamburger isOpen={hamburgerOpen} />
      </div>
    </div>
  );
}
