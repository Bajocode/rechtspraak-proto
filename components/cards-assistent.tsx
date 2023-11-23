"use client";

import * as React from "react";
import { Check, Plus, Send } from "lucide-react";
import { Message, experimental_useAssistant as useAssistant } from 'ai/react';

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type } from "os";

const eclis = [
  {
    ecliId: "ECLI:NL:RBZWB:2023:7",
    title: "ECLI:NL:RBZWB:2023:7, Rechtbank Zeeland-West-Brabant, 02-01-2023, 02-226419-21",
    summary: "Vrijspraak aanranding. De aangifte vindt onvoldoende steun in andere bewijsmiddelen.",
    updated: "updated",
    link: "https://uitspraken.rechtspraak.nl/#!/details?id=ECLI:NL:RBZWB:2023:7"
  },
  {
    ecliId: "ECLI:NL:RBZWB:2023:9",
    title: "ECLI:NL:RBZWB:2023:9, Rechtbank Zeeland-West-Brabant, 02-01-2023, 02/147750-21",
    summary: "Bewezenverklaring artikel 6 en 5 WVW. Overschrijding toegestane maximumsnelheid. Verweer betrouwbaarheid snelheidsberekening door de politie. Voorrang. Letsel tijdelijke verhindering in de uitoefening normale bezigheden. Taakstraf 80 uur en voorwaardelijke ontzegging rijbevoegdheid van 3 maanden met proeftijd 2 jaar. Eendaadse samenloop. Vorderingen benadeelde partijen niet-ontvankelijk. Onvold...",
    updated: "2023-01-02T12:00:06Z",
    link: "https://uitspraken.rechtspraak.nl/#!/details?id=ECLI:NL:RBZWB:2023:9"
  },
  {
    ecliId: "ECLI:NL:RBDHA:2023:27",
    title: "ECLI:NL:RBZWB:2023:7, Rechtbank Zeeland-West-Brabant, 02-01-2023, 02-226419-2ECLI:NL:RBDHA:2023:27, Rechtbank Den Haag, 03-01-2023, SGR 21/61331",
    summary: "Ontvankelijkheid bezwaarschrift tegen afwijzing WIA-uitkering. Het UWV had het bezwaarschrift tegen de afwijzing van de WIA-uitkering ontvankelijk moeten verklaren, en daarna inhoudelijk moeten beoordelen, omdat het primaire besluit op een rechtsgevolg was gericht. Beroep gegrond.",
    updated: "2023-01-03T10:02:52Z",
    link: "https://uitspraken.rechtspraak.nl/#!/details?id=ECLI:NL:RBDHA:2023:27"
  },
  {
    ecliId: "ECLI:NL:RBZWB:2023:11",
    title: "ECLI:NL:RBZWB:2023:11, Rechtbank Zeeland-West-Brabant, 03-01-2023, 02/007378-22",
    summary: "Verdachte wordt veroordeeld voor twee mishandelingen en stalking van zijn ex-echtgenote.Gezien zijn proceshouding en strafblad komt de rechtbank, naast een taakstraf van 120 uur, tot een voorwaardelijke gevangenisstraf van vier maanden met een proeftijd van 3 jaar, met daaraan o.a. gekoppeld een direct uitvoerbaar contact -en locatieverbod.",
    updated: "2023-01-03T12:41:00Z",
    link: "https://uitspraken.rechtspraak.nl/#!/details?id=ECLI:NL:RBZWB:2023:11"
  },
]

const users = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    avatar: "/avatars/01.png",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/avatars/03.png",
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    avatar: "/avatars/05.png",
  },
  {
    name: "Jackson Lee",
    email: "lee@example.com",
    avatar: "/avatars/02.png",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    avatar: "/avatars/04.png",
  },
] as const;

type User = (typeof users)[number];
type ECLI = (typeof eclis)[number];

export function CardsAssistent() {
  const [open, setOpen] = React.useState(false);
  // const [selectedUsers, setSelectedUsers] = React.useState<User[]>([]);
  const [selectedEcli, setSelectedEcli] = React.useState<ECLI[]>([]);
  // const { messages, input, handleSubmit, handleInputChange } = useChat();
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: '/api/assistant',
    });


  // const [messages, setMessages] = React.useState([
  //   {
  //     role: "agent",
  //     content: "Hi, how can I help you today?",
  //   },
  //   {
  //     role: "user",
  //     content: "Hey, I'm having trouble with my account.",
  //   },
  //   {
  //     role: "agent",
  //     content: "What seems to be the problem?",
  //   },
  //   {
  //     role: "user",
  //     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  //   },
  // ])

  // const [input, setInput] = React.useState("")
  const inputLength = input.trim().length;
  const scrollableContainerRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const scrollableContainer = scrollableContainerRef.current;
    if (scrollableContainer) {
      const scrollHeight = scrollableContainer.scrollHeight;
      const height = scrollableContainer.clientHeight;
      const maxScrollTop = scrollHeight - height;
      scrollableContainer.scrollTo({ top: maxScrollTop, behavior: "smooth" });
    }
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  return (
    <>
      <Card className="max-w-[400px] space-y-6 border-0 dark:border shadow-lg">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/jurre-avatar.png" alt="Image" />
              <AvatarFallback>BL</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Rechtspraak Ai</p>
              <p className="text-sm text-muted-foreground">
                Jurisprudentie Assistent NL
              </p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="ml-auto rounded-full"
                  onClick={() => setOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">New message</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent
          ref={scrollableContainerRef}
          className="flex-1 overflow-y-auto h-[100px] lg:h-[300px] h space-y-4"
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            // onSubmit={(event) => {
            //   event.preventDefault()
            //   if (inputLength === 0) return
            //   setMessages([
            //     ...messages,
            //     {
            //       role: "user",
            //       content: input,
            //     },
            //   ])
            //   setInput("")
            // }}
            onSubmit={submitMessage}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Vraag maar raak!..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={handleInputChange}
              ref={inputRef}

              // onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none">
          <DialogHeader className="px-4 pb-4 pt-5">
            <DialogTitle>Rechtspraak Databank</DialogTitle>
            <DialogDescription>
              Combineer case IDs en leg nieuwe verbanden!
            </DialogDescription>
          </DialogHeader>
          <Command className="overflow-hidden rounded-t-none border-t">
            <CommandInput placeholder="Zoek op case..." />
            <CommandList>
              <CommandEmpty>No users found.</CommandEmpty>
              <CommandGroup className="p-2">
                {eclis.map((ecli) => (
                  <CommandItem
                    key={ecli.ecliId}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (selectedEcli.includes(ecli)) {
                        return setSelectedEcli(
                          selectedEcli.filter(
                            (selectedEcli) => selectedEcli !== ecli
                          )
                        );
                      }
                      return setSelectedEcli(
                        [...eclis].filter((e) => {
                          [...selectedEcli, ecli].includes(e) }
                        )
                      );
                    }}
                  >
                    {/* <Avatar>
                      <AvatarImage src={user.avatar} alt="Image" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar> */}
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">
                        {ecli.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {ecli.summary}
                      </p>
                    </div>
                    {selectedEcli.includes(ecli) ? (
                      <Check className="ml-auto flex h-5 w-5 text-primary" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
              {/* <CommandGroup className="p-2">
                {users.map((user) => (
                  <CommandItem
                    key={user.email}
                    className="flex items-center px-2"
                    onSelect={() => {
                      if (selectedUsers.includes(user)) {
                        return setSelectedUsers(
                          selectedUsers.filter(
                            (selectedUser) => selectedUser !== user
                          )
                        );
                      }

                      return setSelectedUsers(
                        [...users].filter((u) =>
                          [...selectedUsers, user].includes(u)
                        )
                      );
                    }}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt="Image" />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                    {selectedUsers.includes(user) ? (
                      <Check className="ml-auto flex h-5 w-5 text-primary" />
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup> */}
            </CommandList>
          </Command>
          <DialogFooter className="flex items-center border-t p-4 sm:justify-between">
            {selectedEcli.length > 0 ? (
              <div className="flex -space-x-2 overflow-hidden">
                {selectedEcli.map((ecli) => (
                  // <Avatar
                  //   key={ecli.id}
                  //   className="inline-block border-2 border-background"
                  // >
                  //   <AvatarImage src={ecli.avatar} />
                  //   <AvatarFallback>{user.name[0]}</AvatarFallback>
                  // </Avatar>
                  <p key={ecli.ecliId}>{ecli.ecliId}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Selecteer cases om toe te voegen aan de zoekopdracht.
              </p>
            )}
            <Button
              disabled={selectedEcli.length < 1}
              onClick={() => {
                setOpen(false);
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
