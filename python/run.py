import asyncio
import csv
import json
import os
import random

from dotenv import load_dotenv
from hamming import (
    ClientOptions,
    CreateDatasetOptions,
    DatasetItemValue,
    Document,
    GenerationParams,
    Hamming,
    RetrievalParams,
    RunOptions,
    ScoreType,
)

load_dotenv()

CSV_FILE = "./data/qa.csv"

HAMMING_API_KEY = os.getenv("HAMMING_API_KEY")
HAMMING_BASE_URL = os.getenv("HAMMING_BASE_URL")
DATASET_ID = os.getenv("DATASET_ID")

hamming = Hamming(ClientOptions(api_key=HAMMING_API_KEY, base_url=HAMMING_BASE_URL))
trace = hamming.tracing


def create_dataset():
    print("Creating dataset..")
    dataset = hamming.datasets.create(
        CreateDatasetOptions(
            name="Test dataset",
            description="Test dataset description",
            items=[
                DatasetItemValue(
                    input=dict(query="test input"),
                    output=dict(result="test output"),
                    metadata=dict(),
                )
            ],
        )
    )
    print(f"Created dataset with ID: {dataset.id}")


def list_datasets():
    print("Listing datasets..")
    datasets = hamming.datasets.list()
    for dataset in datasets:
        print(f"ID: {dataset.id}")
        print(f"Dataset: {dataset.name}")


def load_dataset():
    print(f"Loading dataset with ID: {DATASET_ID}..")
    dataset = hamming.datasets.load(DATASET_ID)
    print(f"Loaded dataset: {dataset.name}")
    print(f"Dataset items: {len(dataset.items)}")
    for item in dataset.items:
        print(f"Item: {item.id}")
        print(f"Input: {item.input}")
        print(f"Output: {item.output}")
        print(f"Metadata: {item.metadata}")


def run_experiment():
    data = []

    with open(CSV_FILE, mode="r", encoding="utf-8") as file:
        csv_dict_reader = csv.DictReader(file)
        data = [row for row in csv_dict_reader]

    if len(data) == 0:
        print("No data found in CSV file")
        return

    async def rag_pipeline(input):
        # Sleep a random amount of time to simulate a real API call
        await asyncio.sleep(random.random())
        # Lookup row with reference question
        found_row = None
        for row in data:
            if row["referenceQuestion"] == input["referenceQuestion"]:
                found_row = row
                break
        if found_row is None:
            return {"response": "Don't know"}

        contexts = [Document(**d) for d in json.loads(found_row["context"])]

        trace.log_retrieval(
            RetrievalParams(
                query=input["referenceQuestion"],
                results=contexts,
                metadata=RetrievalParams.Metadata(engine="Pinecone"),
            )
        )

        trace.log_generation(
            GenerationParams(
                input=input["referenceQuestion"],
                output=found_row["generatedAnswer"],
                metadata=GenerationParams.Metadata(model="GPT-3"),
            )
        )

        return {"output": found_row["generatedAnswer"]}

    result = hamming.experiments.run(
        RunOptions(
            dataset=DATASET_ID,
            name="Test run python sdk async",
            scoring=[
                ScoreType.STRING_DIFF,
                ScoreType.ACCURACY_AI,
            ],
            metadata=None,
        ),
        rag_pipeline,
    )
    print(f"See experiment results at: {result.url}")


def main():
    create_dataset()
    run_experiment()


if __name__ == "__main__":
    main()