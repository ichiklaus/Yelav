import { useTranslations } from 'next-intl';
import Social from './social';

export default function Hero() {
  const t = useTranslations();

  return (
    <section
      id='home'
      style={{ marginTop: '-14rem', marginBottom: '14rem' }}
      className='hero h-lvh w-full xl:w-2/3 mx-auto flex flex-col justify-center'
    >
      <header className='text-white'>
        <div className='ml-2 mb-2'>
          <small className='text-xl'>
            {t('hero_section.greeting')} <span className='text-accent'>{t('hero_section.name')}</span>
          </small>
        </div>
        <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold'>
          {t('hero_section.title_prefix')}{' '}
          <span className='text-accent'>{t('hero_section.title_main')}</span>{' '}
          <span className='text-accent'>{t('hero_section.title_suffix')}</span>
        </h1>
      </header>
      <section className='mt-8'>
        <Social />
      </section>
    </section>
  );
}
