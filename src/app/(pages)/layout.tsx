'use client'

import { useToast } from '@/shared/contexts/ToastContext'
import { Toast } from '@pedroandrad1/react'
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { open, onOpenChange, title, description } = useToast()
  return (
    <>
      <Toast
        open={open}
        onOpenChange={onOpenChange}
        title={title}
        description={description}
      />
      <Suspense>{children}</Suspense>
    </>
  )
}
