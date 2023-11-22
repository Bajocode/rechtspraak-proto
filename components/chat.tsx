'use client';

import { Message, experimental_useAssistant as useAssistant } from 'ai/react';
import { useEffect, useRef } from 'react';

const roleToColorMap: Record<Message['role'], string> = {
  system: 'whitespace-pre-wrap red',
  user: 'whitespace-pre-wrap black',
  function: 'whitespace-pre-wrap blue',
  assistant: 'whitespace-pre-wrap text-primary',
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
    <div className="flex flex-col w-full max-w-md py-24 mx-auto">
      {error != null && (
        <div className="relative bg-red-500 text-white px-6 py-4 rounded-md">
          <span className="block sm:inline">
            Error: {(error as any).toString()}
          </span>
        </div>
      )}

      {messages.map((m: Message) => (
        <div
          key={m.id}
          className={roleToColorMap[m.role]}
          // style={{ color: roleToColorMap[m.role] }}
        >
          {/* <strong>{`${m.role}: `}</strong> */}
          {m.content}
          <br />
          <br />
        </div>
      ))}

      {status === 'in_progress' && (
        <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      )}
    
      <form onSubmit={submitMessage}>
        <input
          ref={inputRef}
          disabled={status !== 'awaiting_message'}
          className="bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Vraag iets over een jurisprudentie"
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
