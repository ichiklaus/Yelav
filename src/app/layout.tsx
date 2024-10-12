import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@components/app/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Nicolás',
  description: 'Nicolás is a Frontend Web Developer with a degree in Information Systems Engineering who enjoys creating amazing web products and delivering great user experiences',
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
      </body>
    </html>
  )
}
