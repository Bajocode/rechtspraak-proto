import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { TypeformButton } from "@/components/typeform-button";
import Pricing from "@/components/pricing";
import { TextareaForm } from "@/components/textarea-form";
import Chat from "@/components/chat-assistant";
import ChatStream from "@/components/chat-stream";
import ChatAssistant from "@/components/chat-assistant";
import { CardsChat } from "@/components/cards-chat";
import Hero from "@/components/hero";
import FeaturePanel from "@/components/feature-panel";

export default function Home() {
  return (
    <>
      <section>
        <Hero />
      </section>

      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-slate-900 md:py-12 lg:py-24"
      >
        <FeaturePanel />
      </section>

      <section
        id="features"
        className="container space-y-6  py-8  md:py-12 lg:py-24 "
      >
        <Pricing />
      </section>

      {/* <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32  bg-slate-50 py-8 dark:bg-slate-900">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            RechtspraakPro 
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Stop met eindeloos speuren.
          </p>
          <div className="space-x-4">
            <TypeformButton />
          </div>
        </div>
      </section>   */}
    </>
  );
}
