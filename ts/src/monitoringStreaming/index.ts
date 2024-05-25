import { Hamming } from "@hamming/hamming-sdk";
import dotenv from "dotenv";
import { envsafe, str } from "envsafe";
import OpenAI from "openai";

dotenv.config();

export const env = envsafe({
  HAMMING_API_KEY: str(),
  OPENAI_API_KEY: str(),
});

const hamming = new Hamming({
  apiKey: env.HAMMING_API_KEY,
});

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function run() {
  hamming.monitoring.start();

  const question = "What are the top 10 places to see in Paris?";

  //startItem is a function that takes a function where you want to put your RAG logic
  //logRetrieval is a function that logs the retrieval
  //logGeneration is a function that logs the generation
  const item = hamming.monitoring.startItem();

  //This helps us display the question more cleanly on the monitoring page
  item.setInput({ question });
  item.setMetadata({ sdk: "TypeScript" }); //this is optional

  const resp = await openai.chat.completions.create({
    stream: true,
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
  });

  let finalAnswer = "";
  for await (const chunk of resp) {
    finalAnswer += chunk.choices[0].delta.content ?? "";
  }

  item.tracing.logGeneration({
    input: question,
    output: finalAnswer,
    metadata: {
      provider: "openai",
      model: "gpt-3.5-turbo",
      stream: true,
      error: false,
    },
  });

  //This helps us display the final answer more cleanly on the monitoring page
  item.setOutput({ answer: finalAnswer });
  item.end();

  console.log("AI response: ", finalAnswer);

  hamming.monitoring.stop();
}

run();
