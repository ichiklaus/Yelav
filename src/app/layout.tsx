import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@components/Header';
import Footer from './components/Footer';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
