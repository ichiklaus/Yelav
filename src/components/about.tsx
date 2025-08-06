import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations();
  const skills = t.raw('about_section.skills') as string[];

  return (
    <section id='about' className='pt-32'>
      <div className='flex flex-col gap-y-4'>
        <h2 className='font-bold text-accent mb-3'>{t('about_section.title')}</h2>
        <p className='mb-2'>{t('about_section.content_1')}</p>
        <p className='mb-2'>{t('about_section.content_2')}</p>
        <ul className='columns-2 list-disc lg:pl-6 ml-6 lg:ml-8 marker:text-accent mb-2'>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
