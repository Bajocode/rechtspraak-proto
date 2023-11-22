import Link from 'next/link'

import { cn } from "@/lib/utils"
import { buttonVariants } from '@/components/ui/button'
import { TypeformButton } from '@/components/typeform-button'
import Pricing from '@/components/pricing'
import { TextareaForm } from '@/components/textarea-form'
import Chat from '@/components/chat-assistant'
import ChatStream from '@/components/chat-stream'
import ChatAssistant from '@/components/chat-assistant'

export default function Home() {
  return (
    <>
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
    <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
      <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
        RechtspraakPro 
      </h1>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        Vind snel relevante jurisprudentie.
      </p>
      <div className="space-x-4">
        <TypeformButton />
      </div>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xs sm:leading-8 italic py-6">
      <strong>Gelimiteerde plekken beschikbaar</strong>. RechtspraakPro is momenteel invite-only. 
      </p>
    </div>
  </section>
  <section id="features"
  className="container space-y-6 bg-slate-50 py-8  md:py-12 lg:py-24 dark:bg-slate-900">
    <Pricing />
  </section>
  
  <section id="chat" className="container md:py-12 lg:py-24">
    <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4">
      <h2 className="font-heading text-3xl sm:text-3xl md:text-5xl font-extrabold">
      Probeer het uit!
      </h2>
      <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
        Zoek op ECLI, casenaam, blabla.
      </p>
      <ChatAssistant />
    </div>
  </section>

  {/* <section
  id="features"
  className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
>
  <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
    <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-6xl">
      Features
    </h2>
    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
      Stop met eindeloos speuren. Vind snel relevantie middels Ai.
    </p>
  </div>
  <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
    
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
        <div className="space-y-2">
          <h3 className="font-bold">Zaak Dingen</h3>
          <p className="text-sm text-muted-foreground">
            Omschrijf je zaak in het kort.
          </p>
        </div>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="h-12 w-12 fill-current"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
        <div className="space-y-2">
          <h3 className="font-bold">Ai</h3>
          <p className="text-sm text-muted-foreground">
            Ai doorzoekt rechtspraak.
          </p>
        </div>
      </div>
    </div>
    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        <svg viewBox="0 0 24 24" className="h-12 w-12 fill-current">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
        </svg>
        <div className="space-y-2">
          <h3 className="font-bold">Relevantie</h3>
          <p className="text-sm text-muted-foreground">
            Vindt direct relevante uitspraken.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div className="mx-auto text-center md:max-w-[58rem]">
    <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
      Meld je nu aan voor de wachtlijst!
    </p>
  </div>
</section> */}
</>
  )
}
