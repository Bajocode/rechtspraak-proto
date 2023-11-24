import { Configuration, OpenAIApi } from 'openai-edge'
import { Message, OpenAIStream, StreamingTextResponse } from 'ai'
import { getContext } from '@/utils/context'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  try {

    const { messages } = await req.json()

    // Get the last message
    const lastMessage = messages[messages.length - 1]

    // Get the context from the last message
    const context = await getContext(lastMessage.content, '')

    const prompt = [
      {
        role: 'system',
        content: `Je bent een behulpzame jurisprudentie assistent.
      Je beantwoord vragen beantwoord over rechtspraken met behulp van meegestuurde rechtspraak documenten.
      De kenmerken van AI omvatten deskundige kennis, behulpzaamheid, slimheid en welbespraaktheid.
      AI is een goedgemanierd en beleefd individu.
      AI is altijd vriendelijk, aardig en inspirerend, en staat te popelen om levendige en doordachte antwoorden te geven op vragen van de gebruiker.
      AI heeft de som van alle kennis in zijn brein en kan bijna elke vraag over elk onderwerp in een gesprek nauwkeurig beantwoorden.
      START CONTEXT BLOCK
      ${context}
      END OF CONTEXT BLOCK
      De AI-assistent zal rekening houden met elk CONTEXT BLOCK dat wordt gegeven in een gesprek.
      Als de context het antwoord op de vraag niet biedt, zal de AI-assistent zeggen: "Het spijt me, maar ik weet het antwoord op die vraag niet".
      De AI-assistent zal zich niet verontschuldigen voor eerdere reacties, maar zal in plaats daarvan aangeven dat er nieuwe informatie is opgedaan.
      De AI-assistent zal niets verzinnen dat niet direct uit de context is gehaald.
      `,
      },
    ]
    console.log(prompt)
    // Ask OpenAI for a streaming chat completion given the prompt
    // const chatModel = "gpt-3.5-turbo"
    const chatModel = "gpt-4-1106-preview"
    const response = await openai.createChatCompletion({
      model: chatModel,
      stream: true,
      messages: [...prompt, ...messages.filter((message: Message) => message.role === 'user')]
    })
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)
  } catch (e) {
    throw (e)
  }
}