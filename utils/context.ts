import { OpenAIApi, Configuration } from "openai-edge";
import {
  Pinecone,
  RecordMetadata,
  type ScoredPineconeRecord,
} from "@pinecone-database/pinecone";

// The function `getContext` is used to retrieve the context of a given message
export const getContext = async (
  message: string,
  getOnlyText = true,
  namespace: string,
  maxTokens = 3000,
  minScore = 0.7
): Promise<string | ScoredPineconeRecord[]> => {
  // Get the embeddings of the input message
  const embedding = await getEmbeddings(message);

  // Retrieve the matches for the embeddings from the specified namespace
  const matches = await getMatchesFromEmbeddings(embedding, 20, namespace);
  const formatted =  matches.map((match) => formattedMatch(match))
  return formatted.join("\n").substring(0); // maxTokens 
  // Filter out the matches that have a score lower than the minimum score
  // const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);
  // return docs.join("\n").substring(0, maxTokens);
  // let docs = matches
  //   ? matches.map((match) => (match.metadata as Metadata).summary)
  //   : [];
  // Join all the chunks of text together, truncate to the maximum number of tokens, and return the result

};

// {
//   id: 'ECLI:NL:RBZWB:2023:2684',
//   score: 0.813431084,
//   values: [],
//   sparseValues: undefined,
//   metadata: {
  //   link: 'https://uitsprake...
  //   summary: 'HUUR',
  //   title: 'ECLI:NL:RBZWB:202...
  //   updated: '2023-04-25T06:00:24Z'
// }

function formattedMatch(match: ScoredPineconeRecord): string {
  const id = match.id
  const metadata = match.metadata as Metadata
  const title = metadata.title
  const summary = metadata.summary
  const updated = metadata.updated
  const link = metadata.link

  return `
  Titel: ${title}
  Samenvatting: ${summary}
  Link: ${link}
  Case update datum: ${updated}
  `
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
  title: string;
  updated: string;
  link: string;
  summary: string;
};

// The function `getMatchesFromEmbeddings` is used to retrieve matches for the given embeddings
const getMatchesFromEmbeddings = async (
  embeddings: number[],
  topK: number,
  namespace: string
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
  const pineconeNamespace = index.namespace(namespace ?? "");

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
