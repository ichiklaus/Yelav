import React, { useEffect, useRef, useState } from 'react';

import './NavList.css';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { NavItem } from '@interfaces/index';
import LanguageSwitcher from './UI/LanguageSwitcher';

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
  const t = useTranslations();

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

  const navItems = t.raw('header.nav') as NavItem[];

  return (
    <div ref={containerRef} className='flex justify-between pe-4 lg:pe-0'>
      <nav className='md:py-2 nav-container relative flex justify-end xl:justify-between items-center'>
        <ul
          className={`list-inside flex gap-x-8
        ${
          hamburgerOpen
            ? 'transition-in visible ul-menu bg-light-lilac/10 backdrop-blur-2xl'
            : 'hidden'
        } flex flex-row gap-x-3 pl-8 ul-menu navlist md:py-4 md:flex`}
        >
          {navItems.map((nav, index) => (
            <li key={`navitem-${index}`}>
              <motion.a
                href={nav.link}
                className=''
                whileHover={{
                  color: '#B488FF',
                }}
              >
                {nav.label}
              </motion.a>
            </li>
          ))}
        </ul>

        <LanguageSwitcher className='hidden xl:inline-block' />
      </nav>
      <div
        className='relative lg:static w-fit py-2 lg:py-0 flex gap-8 items-center'
      >
        <LanguageSwitcher className='xl:hidden inline-flex' />

        <div className='hamburger-wrapper' onClick={toggleHamburger}>
          <Hamburger isOpen={hamburgerOpen} />
        </div>
      </div>
    </div>
  );
}
