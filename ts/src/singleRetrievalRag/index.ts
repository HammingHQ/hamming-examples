import { Hamming, ScoreType } from 'hamming-sdk';
import { qaDemoLookup } from './lookups';

const hamming = new Hamming({
  apiKey: process.env.HAMMING_API_KEY!,
});

const trace = hamming.tracing;

async function doRag(question: string) {
  let aiOutput: string;
  let contexts: any[] = [];
  if (question in qaDemoLookup) {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 1000)
    );
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
  // Run the experiment and log results
  await hamming.experiments.run(
    {
      name: 'Name of your test',
      dataset: '<YOUR DATASET ID>', //TODO: Replace with your dataset ID
      scoring: [ScoreType.FactsCompare],
      metadata: {
        goal: 'Test if higher chunks are better',
        chunkSize: 10,
        modelName: 'GPT-3.5 Turbo',
      },
    },
    async ({ question }) => {
      console.log(`Query: ${question}`);

      const { aiOutput, contexts } = await doRag(question);

      trace.logRetrieval({
        query: question,
        results: contexts,
        metadata: {
          engine: 'pinecone',
        },
      });

      return { aiOutput };
    }
  );
}

scoreMyRag();
