import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export const metadata = {
  title: "Pricing",
}

export default function Pricing() {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem]">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl font-semibold">
          Transparante prijzen
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        Ontgrendel alle functies, inclusief onbeperkte zoekopdrachten.
        </p>
      </div>
      <div className="grid w-full items-start gap-10 rounded-lg border bg-background p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">
            Wat zit er allemaal in het Pro pakket
          </h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Omschrijf je zaak in het kort
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Stop met eindeloos speuren
            </li>

            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Ai doorzoekt rechtspraak
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Vindt snel relevantie middels Ai
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Vindt direct relevante uitspraken
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Meld je nu aan voor de wachtlijst
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-7xl font-bold">€19</h4>
            <p className="text-sm font-medium text-muted-foreground">
              Per Maand
            </p>
          </div>
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Aan de Slag
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          Probeer het gratis uit.{" "}
          <strong>Bla bla.</strong>
        </p>
      </div>
    </section>
  )
}
