import Link from 'next/link'

import { cn } from "@/lib/utils"
import { buttonVariants } from '@/components/ui/button'
import { TypeformButton } from '@/components/typeform-button'

export default function Home() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
    <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
      <Link
        href="#"
        className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
        target="_blank"
      >
        Knoppie
      </Link>

      <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
        Phase 2 Template.
      </h1>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        This is a landing page template that is meant to test our traction channels and give a sneak peak to our future users.
      </p>
      <div className="space-x-4">
        <TypeformButton />
        <Link
          href="#"
          target="_blank"
          rel="noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Preorder!
        </Link>
      </div>
    </div>
  </section>
  )
}
