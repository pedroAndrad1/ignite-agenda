'use client'

import { StitchesRegistry } from '@/styles/global'
import { Roboto } from 'next/font/google'
import { SessionProvider, SessionProviderProps } from 'next-auth/react'
import { ToastContextProvider } from '@/shared/contexts/ToastContext'
import '../lib/dayjs'
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
            <ToastContextProvider>{children}</ToastContextProvider>
          </StitchesRegistry>
        </SessionProvider>
      </body>
    </html>
  )
}
