import { Metadata } from "next";
import { CardsChat } from "./cards-chat";
import { TypeformButton } from "./typeform-button";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function Hero() {
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0  pb-18">
        <div className="mx-auto flex w-full flex-col justify-center space-y-8 sm:w-[380px]">
          <h1 className="xs:text-2xl sm:text-3xl md:text-4xl lg:text-6xl lg:text font-bold">
            Vind snel relevante jurisprudentie.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-md lg:text-l font-light">
            Gelimiteerde plekken beschikbaar. RechtspraakPro is momenteel
            invite-only. Je email wordt nooit gebruikt voor spam.
          </p>
          <div className="flex flex-col">
            <TypeformButton />
          </div>
        </div>

        <div className="relative  flex-col p-10  lg:flex lg:border-l">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <CardsChat />
          </div>
        </div>
      </div>
    </>
  );
}
