import '../../app/globals.css';

import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@i18n/routing';
import { Inter } from 'next/font/google';
import Footer from '@components/Footer';
import Header from '@components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Yeraldo Nicolás Moreira | Web Developer',
  description:
    'Yeraldo Nicolás Moreira is a Web Developer with a degree in Computer Systems Engineering who enjoys creating amazing web products and delivering great user experiences',
  openGraph: {
    title: 'Yeraldo Nicolás Moreira | Web Developer',
    description:
      'Yeraldo Nicolás Moreira is a Web Developer with a degree in Computer Systems Engineering who enjoys creating amazing web products and delivering great user experiences',
    url: 'https://yelav.me/',
    siteName: 'Yeraldo Nicolás Moreira',
    images: [
      {
        url: 'https://yelav.me/og-image.png', // Replace with your OG image URL
        width: 1200,
        height: 630,
        alt: 'Yeraldo Nicolás Moreira Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yeraldo Nicolás Moreira | Web Developer',
    description:
      'Yeraldo Nicolás Moreira is a Web Developer with a degree in Computer Systems Engineering who enjoys creating amazing web products and delivering great user experiences',
    creator: '@ichiklaus', // Optional
    site: '@ichiklaus', // Optional
    images: ['https://yelav.me/og-image.png'], // Same or different from OG image
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${inter.className}`}>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
