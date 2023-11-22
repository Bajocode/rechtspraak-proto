'use client';

import { Message, useChat } from 'ai/react';
import { useRef } from 'react';
import { Button } from './ui/button';
import { Icons } from './icons';

const roleToColorMap: Record<Message['role'], string> = {
  system: 'whitespace-pre-wrap red',
  user: 'whitespace-pre-wrap text-primary text-right',
  function: 'whitespace-pre-wrap blue',
  assistant: 'whitespace-pre-wrap text-primary text-right',
};

const roleToTitleMap: Record<Message['role'], string> = {
  system: 'Systeem',
  user: 'Gebruiker',
  function: 'Functie',
  assistant: 'Assistent',
};

const roleToDirectionMap: Record<Message['role'], string> = {
  system: 'text-left',
  user: 'text-right',
  function: 'text-center',
  assistant: 'text-left',
};

export default function ChatStream() {
  const { messages, input, handleSubmit, handleInputChange } = useChat();

  // When status changes to accepting messages, focus the input:
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex-col w-full max-w-xl py-12 mx-auto">
      <div className="max-h-72 rounded-lg p-6 overflow-y-scroll ">
        {messages.map((m: Message) => (
          <div key={m.id} className={roleToDirectionMap[m.role]}>
            <strong className={roleToColorMap[m.role]}>{`${roleToTitleMap[m.role]}`}</strong>
            <br />
            {m.content}
            <br />
            <br />
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="py-6">
        <input
          ref={inputRef}
          className="bottom-0 w-full p-2 mb-8 rounded-lg border focus:outline-primary focus:outline-1 dark:bg-slate-900 bg-slate-50"
          value={input}
          placeholder="U had een vraag over jurisprudentie?"
          onChange={handleInputChange}
        />
        <Button> 
          <Icons.send/>
        </Button>
      </form>
    </div>
  );
}
