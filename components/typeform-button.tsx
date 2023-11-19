"use client"

import { cn } from '@/lib/utils'
import { PopupButton } from '@typeform/embed-react'
import { buttonVariants } from './ui/button'

export function TypeformButton() {
  return (
    <PopupButton id="KOWb1lvV" className={cn(buttonVariants({ size: "lg" }))}>
      Meld je nu aan!
    </PopupButton>
  )
}