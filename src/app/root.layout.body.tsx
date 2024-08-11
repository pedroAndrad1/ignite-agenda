'use client'

import { StitchesRegistry } from '@/styles/global'
import { Roboto } from 'next/font/google'
import { SessionProvider, SessionProviderProps } from 'next-auth/react'
import { ToastContextProvider } from '@/shared/contexts/ToastContext'
import '../lib/dayjs'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { TooltipProvider } from '@pedroandrad1/react'
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] })
export default function RootLayoutBody({
  children,
  session,
}: SessionProviderProps) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
            <StitchesRegistry>
              <ToastContextProvider>
                <TooltipProvider delayDuration={200}>
                  {children}
                </TooltipProvider>
              </ToastContextProvider>
            </StitchesRegistry>
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
