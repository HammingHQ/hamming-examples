# Installation and Running Examples

## Install dependencies

```bash
$ npm install
```

## Setup your API Key

Navigate to https://app.hamming.ai/settings to create an API Key, and add it to your *.env* file:

```bash
HAMMING_API_KEY="<YOUR_API_KEY>"
```

## Running Examples

### Example 1: RAG with single retrieval and single generation
For this example, check out the [source code](./src/singleRetrievalRag/).

1. Create a dataset using the *hamming-sdk*, and copy the *Dataset ID* that was generated.
```bash
$ npm run createSampleDataset

Creating a new sample dataset..
Created dataset with 4 items
Dataset ID: llrtx7eeg0010zb35e8czdrez
```

2. Add the generated *Dataset ID* to your *.env* file:

```bash
HAMMING_API_KEY="<YOUR_API_KEY>"
SAMPLE_DATASET_ID="<GENERATED_DATASET_ID>"
```


3. Run the experiment
```
$ npm run singleRetrievalRag

Running Single Retreival RAG..
Running query: Where or how do I send in my booking confirmations?
Running query: What are the uses of drones in agriculture?
Running query: What is the boiling point of water?
Running query: What are the main functions of the roots of a plant?
See experiment results at: https://app.hamming.ai/experiments/alrt8nl88001czb35b4h2pe4r
```

4. Navigate to the experiment link logged in the console to see results.
