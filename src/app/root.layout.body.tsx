'use client'

import { StitchesRegistry } from '@/styles/global'
import { ToastProvider } from '@pedroandrad1/react'
import { Roboto } from 'next/font/google'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
export default function RootLayoutBody({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <StitchesRegistry>
          <ToastProvider>{children}</ToastProvider>
        </StitchesRegistry>
      </body>
    </html>
  )
}
