import OpenAI from 'openai';
import { Message, OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const systemMessage: Message = {
    role: 'system',
    content: 'Je bent een behulpzame jurisprudentie assistent die  vragen beantwoord over rechtspraken, en met behulp van uitspraak documenten informatie kan opzoeken op onderwerp, zaaknummer, ECLI, maar ook vragen over recht en uitspraken in het algemeen'
  }
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [systemMessage, ...messages],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}