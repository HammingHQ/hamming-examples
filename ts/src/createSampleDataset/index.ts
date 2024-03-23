import dotenv from "dotenv";
dotenv.config();

import { Hamming } from "@hamming/hamming-sdk";

import sampleData from "./sample-data";

if (!process.env.HAMMING_API_KEY) {
  throw new Error("HAMMING_API_KEY is not set");
}

const hamming = new Hamming({
  apiKey: process.env.HAMMING_API_KEY,
});

async function createSampleDataset() {
  console.log("Creating a new sample dataset..");
  const dataset = await hamming.datasets.create({
    name: "Example Dataset",
    description: "A sample dataset to test Hamming",
    items: sampleData,
  });
  console.log(`Created dataset with ${sampleData.length} items`);
  console.log("Dataset ID: " + dataset.id);
  console.log("Dataset URL: " + "https://app.hamming.ai/datasets/" + dataset.id);
}

createSampleDataset().catch((e) => {
  console.error(e);
  process.exit(1);
});
