import { ToastProvider } from '@pedroandrad1/react'
import { createContext, useState, ReactNode, useContext } from 'react'

interface ToastContextData {
  open: boolean
  onOpenChange: (value: boolean) => void
  title: string
  description: string
  toast: (descricao: string, titulo?: string) => void
}

interface ToastContextProviderProps {
  children: ReactNode
}

export const ToastContext = createContext({} as ToastContextData)

export function ToastContextProvider({ children }: ToastContextProviderProps) {
  const [open, onOpenChange] = useState(false)
  const [title, setTitle] = useState('Ops...')
  const [description, setDescription] = useState('ytesta')

  const toast = (descricao: string, titulo?: string) => {
    setTitle(titulo ?? 'Ops...')
    setDescription(descricao)
    onOpenChange(true)
  }

  return (
    <ToastProvider>
      <ToastContext.Provider
        value={{ open, onOpenChange, description, title, toast }}
      >
        {children}
      </ToastContext.Provider>
    </ToastProvider>
  )
}

export const useToast = () => {
  return useContext(ToastContext)
}
