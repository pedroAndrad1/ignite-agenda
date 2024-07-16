import type { Metadata } from 'next'
import RootLayoutBody from './root.layout.body'

export const metadata: Metadata = {
  title: 'Ignite Agenda',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RootLayoutBody>{children}</RootLayoutBody>
}
