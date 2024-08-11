'use client'

import { StitchesRegistry } from '@/styles/global'
import { Roboto } from 'next/font/google'
import { SessionProvider, SessionProviderProps } from 'next-auth/react'
import { ToastContextProvider } from '@/shared/contexts/ToastContext'
import '../lib/dayjs'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { DefaultSeo } from 'next-seo'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
export default function RootLayoutBody({
  children,
  session,
}: SessionProviderProps) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: 'pt_BR',
            url: 'https://www.ignite-agenda.pedroandrad1.com.br',
            siteName: 'Ignite Agenda',
          }}
        />
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            <StitchesRegistry>
              <ToastContextProvider>{children}</ToastContextProvider>
            </StitchesRegistry>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
