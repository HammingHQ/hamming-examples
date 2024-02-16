import asyncio
import csv
import json
import os
import random
from lookup import qa_demo_lookup

from dotenv import load_dotenv
from hamming import (
    ClientOptions,
    Document,
    GenerationParams,
    Hamming,
    RetrievalParams,
    RunOptions,
    ScoreType,
)

load_dotenv()


HAMMING_API_KEY = os.getenv("HAMMING_API_KEY")
DATASET_ID = os.getenv("DATASET_ID")

hamming = Hamming(ClientOptions(api_key=HAMMING_API_KEY))
trace = hamming.tracing


def run_experiment():
    data = []

    async def rag_pipeline(input):
        # Sleep a random amount of time to simulate a real API call
        await asyncio.sleep(random.random())
        # Lookup row with reference question
        # Lookup the query using the provided lookup.py context


        if input["query"] in qa_demo_lookup:
            found_row = qa_demo_lookup[input["query"]]
        else:
            found_row = None

        found_row = None
        for row in data:
            if row["query"] == input["query"]:
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
                ScoreType.FACTS_COMPARE,
                ScoreType.ACCURACY_AI,
            ],
            metadata=None,
        ),
        rag_pipeline,
    )
    print(f"See experiment results at: {result.url}")