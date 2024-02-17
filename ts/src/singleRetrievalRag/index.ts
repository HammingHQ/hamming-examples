import dotenv from "dotenv";
dotenv.config();

import { envsafe, str } from "envsafe";
import { Hamming, ScoreType } from "hamming-sdk";

import { qaDemoLookup } from "./lookups";

const env = envsafe({
  HAMMING_API_KEY: str(),
  SAMPLE_DATASET_ID: str(),
});

const hamming = new Hamming({
  apiKey: env.HAMMING_API_KEY,
});

const trace = hamming.tracing;

async function simulateRetrievalLatency() {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000 + 1000)
  );
}

async function doRag(question: string) {
  let aiOutput: string;
  let contexts: any[] = [];

  await simulateRetrievalLatency();

  if (question in qaDemoLookup) {
    const entry = qaDemoLookup[question];
    aiOutput = entry.aiOutput;
    contexts = entry.contexts;
  } else {
    aiOutput =
      "I'm sorry, as an AI model I'm not able to find the information you're looking for.";
  }

  return { aiOutput, contexts };
}

// This is a very simple RAG example with a single retrieval and single generation step
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
        modelName: "GPT-4 Turbo",
        cutoffThreshold: 0.7,
      },
    },
    async ({ query }) => {
      console.log(`Running query: ${query}`);

      if (!query) {
        console.error(
          "Please verify that the SAMPLE_DATASET_ID in your .env file points to a valid dataset ID."
        );
      }

      const { aiOutput, contexts } = await doRag(query);

      trace.logRetrieval({
        query,
        results: contexts,
        metadata: {
          engine: "pinecone",
        },
      });

      return { response: aiOutput };
    }
  );
}

scoreMyRag().catch((e) => {
  console.error(e);
  process.exit(1);
});
