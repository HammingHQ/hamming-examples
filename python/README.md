# Installation and Running Examples

## Create a venv (optional)

```bash
$ python3 -m venv venv
```

```bash
$ source venv/bin/activate
```

## Install dependencies

```bash
$ pip install -r requirements.txt
```

## Setup your API Key

Navigate to https://app.hamming.ai/settings to create an API Key, and add it to your _.env_ file:

```bash
HAMMING_API_KEY="<YOUR_API_KEY>"
```

## Running Examples

### Example 1: RAG with single retrieval and single generation

For this example, check out the [source code](./single_retrieval_rag/).

1. Create a dataset using the _hamming_ SDK, and copy the _Dataset ID_ that was generated.

```bash
$ python3 sample_dataset/create.py

Creating dataset..
Created dataset with ID: clsp14ww50759gtvf3lvyudbq
```

2. Add the generated _Dataset ID_ to your _.env_ file:

```bash
HAMMING_API_KEY="<YOUR_API_KEY>"
SAMPLE_DATASET_ID="<GENERATED_DATASET_ID>"
```

3. Run the experiment

```
$ python3 single_retrieval_rag/run.py

Running Single Retrieval RAG..
Running query: Where or how do I send in my booking confirmations?
Running query: What are the uses of drones in agriculture?
Running query: What is the boiling point of water?
Running query: What are the main functions of the roots of a plant?
See experiment results at: https://app.hamming.ai/experiments/alrt8nl88001czb35b4h2pe4r
```

4. Navigate to the experiment link logged in the console to see results.
