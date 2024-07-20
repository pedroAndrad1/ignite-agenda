'use client'

import { StitchesRegistry } from '@/styles/global'
import { ToastProvider } from '@pedroandrad1/react'
import { Roboto } from 'next/font/google'
import { SessionProvider, SessionProviderProps } from 'next-auth/react'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
export default function RootLayoutBody({
  children,
  session,
}: SessionProviderProps) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <SessionProvider session={session}>
          <StitchesRegistry>
            <ToastProvider>{children}</ToastProvider>
          </StitchesRegistry>
        </SessionProvider>
      </body>
    </html>
  )
}
