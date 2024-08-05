import dotenv from "dotenv";
dotenv.config();

import { envsafe, str } from "envsafe";
import { Hamming } from "@hamming/hamming-sdk";

const env = envsafe({
  HAMMING_API_KEY: str(),
  OPENAI_API_KEY: str(),
});

const hamming = new Hamming({
  apiKey: env.HAMMING_API_KEY,
  openaiApiKey: env.OPENAI_API_KEY,
});

async function fetchPrompts() {
  // Gets all prompts
  const prompts = await hamming.prompts.list();
  console.log(prompts);

  // Gets the latest version of the prompt by slug (default label is production)
  const latestPrompt = await hamming.prompts.get("this-is-the-prompt-slug");
  console.log(latestPrompt);

  // Gets the production version of the prompt
  const productionPrompt = await hamming.prompts.get(
    "this-is-the-prompt-slug",
    "production"
  );
  console.log(productionPrompt);

  // Gets a particular version of the prompt
  const versionPrompt = await hamming.prompts.get(
    "this-is-the-prompt-slug",
    undefined,
    "75c817a240b1"
  );
  console.log(versionPrompt);
}

async function runPrompt() {
  const prompt1 = await hamming.prompts.get("get-weather");

  // This runs the prompt on your server using your OpenAI key
  // The second argument are variables you can inject into the prompt template
  const result = await hamming.openai.createChatCompletion(prompt1, {
    location: "San Francisco",
  });

  console.log("Role:", result.choices[0].message.role);
  console.log("Content:", result.choices[0].message.content);
  console.log("Tool Calls:", result.choices[0].message.tool_calls);

  const prompt2 = await hamming.prompts.get("basic-prompt");
  const result2 = await hamming.openai.createChatCompletionStream(prompt2);

  let content = "";
  for await (const chunk of result2) {
    content += chunk.choices[0].delta.content;
  }

  console.log(content);
}

async function main() {
  await fetchPrompts();
  await runPrompt();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
