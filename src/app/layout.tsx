import { StitchesRegistry } from '@/styles/global'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700', '900'] })

export const metadata: Metadata = {
  title: 'Ignite Agenda',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <StitchesRegistry>{children}</StitchesRegistry>
      </body>
    </html>
  )
}
