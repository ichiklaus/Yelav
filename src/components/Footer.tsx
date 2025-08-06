import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className='bg-body-black py-10 text-center'>
      <p className='text-xs'>
        © {new Date().getFullYear()} {t.raw('footer.copyright_note')}
      </p>
    </footer>
  );
}
