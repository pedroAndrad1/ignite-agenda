'use client'

import { getCssText, globalCss } from '@pedroandrad1/react'
import { useServerInsertedHTML } from 'next/navigation'
import { useState } from 'react'

const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },
})

export function StitchesRegistry({ children }: { children: React.ReactNode }) {
  const [isRendered, setIsRendered] = useState(false)

  useServerInsertedHTML(() => {
    if (!isRendered) {
      setIsRendered(true)
      return (
        <style
          id="stitches"
          dangerouslySetInnerHTML={{
            __html: `${getCssText()} 
            ${globalStyles()}`,
          }}
        />
      )
    }
  })

  return <>{children}</>
}
