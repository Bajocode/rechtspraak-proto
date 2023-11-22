'use client';

import { Message, experimental_useAssistant as useAssistant } from 'ai/react';
import { useEffect, useRef } from 'react';
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

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: '/api/assistant',
    });

  // When status changes to accepting messages, focus the input:
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (status === 'awaiting_message') {
      inputRef.current?.focus();
    }
  }, [status]);

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
      <form onSubmit={submitMessage} className="py-6">
        <input
          ref={inputRef}
          disabled={status !== 'awaiting_message'}
          className={status === "in_progress" ? "bottom-0 w-full p-2 mb-8 rounded-lg border focus:outline-primary focus:outline-1 animate-pulse dark:bg-slate-900 bg-slate-50" : "bottom-0 w-full p-2 mb-8 rounded-lg border focus:outline-primary focus:outline-1 dark:bg-slate-900 bg-slate-50"}
          value={input}
          placeholder={status === "in_progress" ? "Even geduld..." : "U had een vraag over jurisprudentie?"}
          onChange={handleInputChange}
        />
        <Button disabled={status === "in_progress"}> 
          <Icons.send/>
        </Button>
      </form>
    </div>
  );
}
