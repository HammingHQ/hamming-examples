import dotenv from "dotenv";
import { envsafe, str } from "envsafe";
import { Hamming } from "@hamming/hamming-sdk";

dotenv.config();

export const env = envsafe({
  HAMMING_API_KEY: str(),
});

const hamming = new Hamming({
  apiKey: env.HAMMING_API_KEY,
});

async function run() {
  hamming.monitoring.start();
  const trace = hamming.tracing;

  const question = "What is the capital of France?";
  console.log("Question: ", question);

  //runItem is a function that takes a function where you want to put your RAG logic
  //logRetrieval is a function that logs the retrieval
  //logGeneration is a function that logs the generation
  const resp = await hamming.monitoring.runItem(async (item) => {
    //This helps us display the question more cleanly on the monitoring page
    item.setInput({ question });
    // item.setMetadata({ category: "geography" }); //this is optional

    // Simulate some work
    await new Promise((resolve) => setTimeout(resolve, 1000));

    trace.logRetrieval({
      query: question,
      results: [
        {
          pageContent: "Paris is the capital of France",
          metadata: {},
        },
      ],
      metadata: {
        engine: "pinecone",
      },
    });

    trace.logGeneration({
      input: question,
      output: "Paris",
      metadata: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        stream: false,
        max_tokens: 1000,
        n: 1,
        seed: 42,
        temperature: 0.7,
        usage: {
          completion_tokens: 100,
          prompt_tokens: 10,
          total_tokens: 110,
        },
        duration_ms: 510,
        error: false,
      },
    });

    //This helps us display the final answer more cleanly on the monitoring page
    item.setOutput({ answer: "Paris" });

    return { answer: "Paris" };
  });

  console.log("AI response: ", resp);

  hamming.monitoring.stop();
}

run();
