'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { routing } from '@i18n/routing';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';

const locales = routing.locales;

export default function LanguageSwitcher({
  className = '',
}: {
  className?: string;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const switchLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    const segments = pathname.split('/');
    segments[1] = newLocale;

    const newPath = segments.join('/');

    setIsOpen(false);
    startTransition(() => {
      router.replace(newPath);
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left ${className}`}
    >
      <button
        onClick={toggleDropdown}
        type='button'
        disabled={isPending}
        className='inline-flex items-center px-4 py-2 bg-white dark:bg-body-black dark:text-white text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none'
      >
        <FontAwesomeIcon icon={faGlobe} className='mr-1' />
        {currentLocale.toUpperCase()}
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className='ml-2 h-3 w-3'
        />
      </button>

      {isOpen && (
        <div className='absolute right-0 z-10 mt-2 w-32 origin-top-right top-full rounded-md bg-white dark:bg-body-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <ul className='py-1 text-sm text-gray-700 dark:text-gray-200 p-0 m-0'>
            {locales.map((locale) => (
              <li
                key={locale}
                onClick={() => switchLocale(locale)}
                className={`flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-accent dark:hover:bg-accent ${
                  locale === currentLocale ? 'font-semibold' : ''
                }`}
              >
                <span>{locale.toUpperCase()}</span>
                {locale === currentLocale && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className='ml-2 text-accent'
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
