import dotenv from "dotenv";
dotenv.config();

import { envsafe, str } from "envsafe";
import { Document, Hamming, ScoreType } from "@hamming/hamming-sdk";

import { qaDemoLookup } from "./lookups";
import OpenAI from "openai";

const env = envsafe({
  HAMMING_API_KEY: str(),
  SAMPLE_DATASET_ID: str(),
  OPENAI_API_KEY: str(),
});

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

const hamming = new Hamming({
  apiKey: env.HAMMING_API_KEY,
});

const trace = hamming.tracing;

const PROMPT = (question: string, contexts: Document[]) => `
You're an expert at answering user questions.

You're given a question and a list of documents to use as context.

You're tasked with generating an answer to the question using the context provided.

Question: ${question}
Contexts: ${contexts.map((c) => c.pageContent).join("\n")}
`

const model = 'gpt-3.5-turbo'

//Simulating a pinecone / vectorDB retrieval
async function retrieveDocumentsFromVectorStore(question: string) {
  let contexts: Document[] = [];

  // Simulate a vectorDB retrieval
  if (question in qaDemoLookup) {
    const entry = qaDemoLookup[question];
    contexts = entry.contexts;
  }

  return contexts;
}

async function doRag(question: string) {
  const contexts = await retrieveDocumentsFromVectorStore(question);

  const prompt = PROMPT(question, contexts);

  const resp = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const response = resp.choices[0].message.content ?? "Unknown";

  return { llmOutput: response, contexts };
}

// Simple RAG example with a single retrieval and single generation step
async function scoreMyRag() {
  console.log("Running Single Retrieval RAG..");
  await hamming.experiments.run(
    {
      name: "Example experiment",
      dataset: env.SAMPLE_DATASET_ID,
      scoring: [ScoreType.AccuracyAI, ScoreType.FactsCompare],
      metadata: {
        goal: "Test if higher chunks are better",
        chunkSize: 10,
        cutoffThreshold: 0.7,
      },
    },
    //Each input row from the dataset is passed in as an object to the callback function
    //The goal is to run the RAG model on the query and return the response
    //We'll then run scores on the response to see if it matches the expected output
    async (input) => {
      const { query } = input;
      console.log(`Running query: ${query}`);

      if (!query) {
        console.error(
          "Please verify that the SAMPLE_DATASET_ID in your .env file points to a valid dataset ID."
        );
      }

      //This is where you insert your RAG model and return the outputs so we can score them on the server side
      const { llmOutput, contexts } = await doRag(query);

      //This makes it easier to view the documents that were retrieved in the experiment details page
      trace.logRetrieval({
        query,
        results: contexts,
        metadata: {
          engine: "pinecone",
        },
      });

      //This makes it easier to view the LLM response in the experiment details page
      trace.logGeneration({
        input: query,
        output: llmOutput ?? "",
        metadata: {
          model,
        },
      });

      //Return the response to the server; this is critical for us to score the response
      return { response: llmOutput };
    }
  );
}

scoreMyRag().catch((e) => {
  console.error(e);
  process.exit(1);
});
