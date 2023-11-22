"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./ui/mode-toggle"

export function Nav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <span className="hidden font-bold sm:inline-block">
          RechtspraakPro
        </span>
      </Link>
        <nav className="hidden gap-6 md:flex">
        </nav>
    </div>
  )
}
