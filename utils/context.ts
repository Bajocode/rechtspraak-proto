import { OpenAIApi, Configuration } from "openai-edge";
import {
  Pinecone,
  RecordMetadata,
  type ScoredPineconeRecord,
} from "@pinecone-database/pinecone";

// The function `getContext` is used to retrieve the context of a given message
export const getContext = async (
  message: string,
  maxTokens = 3000,
  minScore = 0.7
): Promise<string | ScoredPineconeRecord[]> => {
  // Get the embeddings of the input message
  const embedding = await getEmbeddings(message);

  // Retrieve the matches for the embeddings from the specified namespace
  const matches = await getMatchesFromEmbeddings(embedding, 3);
  const formatted = matches.map((match) => formattedMatch(match));
  return formatted.join("\n").substring(0); // maxTokens
  // Filter out the matches that have a score lower than the minimum score
  // const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);
  // return docs.join("\n").substring(0, maxTokens);
  // let docs = matches
  //   ? matches.map((match) => (match.metadata as Metadata).summary)
  //   : [];
  // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result
};

function formattedMatch(match: ScoredPineconeRecord): string {
  const id = match.id;
  const metadata = match.metadata as Metadata;
  const caseType = metadata.type_uitspraak_conclusie;

  return `
  ECLI Nummer: ${metadata.identifier_ecli}
  Document Titel: ${metadata.title}
  Document Samenvatting: ${metadata.summary}
  Source: ${metadata.link}
  ECLI Publicatiedatum: ${metadata.issued_publicatiedatum}
  Document Uitgever: ${metadata.publisher}
  Instantie Verantwoordelijk: ${metadata.creator_instantie}
  ${caseType} Datum: ${metadata.date_uitspraak}
  Zaaknummer: ${metadata.zaaknummer}
  Type: ${metadata.type_uitspraak_conclusie}
  Procedure: ${metadata.procedure}
  Geografisch Gebied: ${metadata.coverage_uitspraakgeo}
  Zittingsplaats: ${metadata.spatial_zittingloc}
  Rechtsgebied: ${metadata.subject_rechtsgebied}
  Geregistreerde Vindplaatsen: ${metadata.hasversion_vindplaatsen}
  Volledige ${caseType}: ${metadata.uitspraak}
  Datum van Document Bezichtiging: ${metadata.last_scraped_at}
  `;
}

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function getEmbeddings(input: string): Promise<number[]> {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: input.replace(/\n/g, " "),
    });

    const result = await response.json();
    return result.data[0].embedding as number[];
  } catch (e) {
    console.log("Error calling OpenAI embedding API: ", e);
    throw new Error(`Error calling OpenAI embedding API: ${e}`);
  }
}

export type Metadata = {
  identifier_ecli: string; // ECLI Nummer
  title: string; // Document Titel
  summary: string; // Document Samenvatting
  link: string; // Source
  issued_publicatiedatum: string; // ECLI Publicatiedatum
  publisher: string; // Document Uitgever
  creator_instantie: string; // Instantie Verantwoordelijk voor de {case_type}
  date_uitspraak: string; // {case_type} Datum
  zaaknummer: string; // Zaaknummer
  type_uitspraak_conclusie: string; // Type
  procedure: string; // Procedure
  coverage_uitspraakgeo: string; // Geografisch Gebied {case_type}
  spatial_zittingloc: string; // Zittingsplaats
  subject_rechtsgebied: string; // Rechtsgebied
  hasversion_vindplaatsen: string; // Geregistreerde Vindplaatsen van {case_type}
  uitspraak: string; // Volledige {case_type}
  last_scraped_at: string; // Datum van Document Bezichtiging
};

// The function `getMatchesFromEmbeddings` is used to retrieve matches for the given embeddings
const getMatchesFromEmbeddings = async (
  embeddings: number[],
  topK: number
): Promise<ScoredPineconeRecord<Metadata>[]> => {
  // Obtain a client for Pinecone
  const pinecone = new Pinecone();

  const indexName: string = process.env.PINECONE_INDEX || "";
  if (indexName === "") {
    throw new Error("PINECONE_INDEX environment variable not set");
  }

  // Retrieve the list of indexes to check if expected index exists
  const indexes = await pinecone.listIndexes();
  if (indexes.filter((i) => i.name === indexName).length !== 1) {
    throw new Error(`Index ${indexName} does not exist`);
  }

  // Get the Pinecone index
  const index = pinecone!.Index<Metadata>(indexName);

  // Get the namespace
  const pineconeNamespace = index.namespace("");

  try {
    // Query the index with the defined request
    const queryResult = await pineconeNamespace.query({
      vector: embeddings,
      topK,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (e) {
    // Log the error and throw it
    console.log("Error querying embeddings: ", e);
    throw new Error(`Error querying embeddings: ${e}`);
  }
};

export { getMatchesFromEmbeddings };
