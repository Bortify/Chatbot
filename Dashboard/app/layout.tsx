import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import classNames from 'classnames'

import Toaster from '@/components/Toaster'
import { fontVariables } from '@/components/Typography/Font'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={classNames(inter.className, fontVariables)}>
        {children}
        <Toaster position='top-center' reverseOrder={false} />
      </body>
    </html>
  )
}
