import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@components/app/components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Yeraldo Nicolás Moreira | Web Developer',
  description: 'Yeraldo Nicolás Moreira is a Web Developer with a degree in Computer Systems Engineering who enjoys creating amazing web products and delivering great user experiences',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <Header />
        {children}  
        <Footer />
      </body>
    </html>
  )
}
