import asyncio
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
from openai import OpenAI

load_dotenv()


HAMMING_API_KEY = os.getenv("HAMMING_API_KEY")
DATASET_ID = os.getenv("SAMPLE_DATASET_ID")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

hamming = Hamming(ClientOptions(api_key=HAMMING_API_KEY))
trace = hamming.tracing

openai_client = OpenAI(api_key=OPENAI_API_KEY)
model_name = "gpt-3.5-turbo"


def generate_prompt(question, contexts):
    context_texts = "\n".join([context.pageContent for context in contexts])
    return f"""
    You're an expert at answering user questions.

    You're given a question and a list of documents to use as context.

    You're tasked with generating an answer to the question using the context provided.

    Question: {question}
    Contexts: {context_texts}
    """


# This is a simple example of retrieving contexts from a vector store
# In a real-world scenario, you would use a database or other data source to retrieve the contexts
# For this example, we'll use a lookup table to retrieve the contexts
def retrieve_contexts_from_vector_store(input):
    if input["query"] in qa_demo_lookup:
        found_row = qa_demo_lookup[input["query"]]
        contexts = [Document(**d) for d in found_row["contexts"]]
        return contexts
    else:
        return []


async def rag_pipeline(input):
    if not input["query"] in qa_demo_lookup:
        print(
            "Please verify that the SAMPLE_DATASET_ID in your .env file points to a valid dataset ID."
        )
        exit(1)        

    contexts = retrieve_contexts_from_vector_store(input)
    prompt = generate_prompt(input["query"], contexts)

    response = openai_client.chat.completions.create(
        model=model_name,
        messages=[
            {"role": "user", "content": prompt},
        ],
    )

    llm_response = response.choices[0].message.content

    print(f"Running query: {input['query']}")

    # This makes it easier to view the documents that were retrieved in the experiment details page
    # This also enables the ability to score precision, recall and hallucination in the UI
    trace.log_retrieval(
        RetrievalParams(
            query=input["query"],
            results=contexts,
            metadata=RetrievalParams.Metadata(engine="Pinecone"),
        )
    )

    # This makes it easier to view the LLM response in the experiment details page
    trace.log_generation(
        GenerationParams(
            input=input["query"],
            output=llm_response,
            metadata=GenerationParams.Metadata(model=model_name),
        )
    )
    
    # Return the response to the server; this is critical for us to score the response
    return {"output": llm_response}


def run_experiment():
    print("Running Single Retrieval RAG..")    

    # Each input row from the dataset is passed in as an object to rag_pipeline
    # The goal is to run the RAG model on the query and return the response
    # We'll then run scores on the response to see if it matches the expected output
    result = hamming.experiments.run(
        RunOptions(
            dataset=DATASET_ID,
            name="Hello world from Python SDK",
            scoring=[
                ScoreType.FACTS_COMPARE,
                ScoreType.ACCURACY_AI,
            ],
            metadata={
                "goal": "Test if higher chunks are better",
                "chunkSize": 10,
                "modelName": "GPT-4 Turbo",
                "cutoffThreshold": 0.7,
            },
        ),
        rag_pipeline,
    )
    print(f"See experiment results at: {result.url}")


def main():
    run_experiment()


if __name__ == "__main__":
    main()
