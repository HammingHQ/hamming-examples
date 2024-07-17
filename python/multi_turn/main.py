import os

from dotenv import load_dotenv
from hamming import (
    ClientOptions,
    Hamming,
    RunOptions,
    ScoreType,
)
from openai import OpenAI

load_dotenv()


HAMMING_API_KEY = os.getenv("HAMMING_API_KEY")
HAMMING_DATASET_ID = os.getenv("SAMPLE_DATASET_ID")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

hamming = Hamming(ClientOptions(api_key=HAMMING_API_KEY))
openai_client = OpenAI(api_key=OPENAI_API_KEY)


def answer_question(input):
    question = input["question"]
    conversation_history = input["conversation_history"]

    response = openai_client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            *conversation_history,
            {"role": "user", "content": question},
        ],
    )
    answer = response.choices[0].message.content
    return {"answer": answer}


def run():
    hamming.experiments.run(
        RunOptions(
            dataset=HAMMING_DATASET_ID,
            name="Multi-turn evaluation from Python SDK",
            scoring=[
                ScoreType.ACCURACY_AI,
            ],
            metadata={},
        ),
        answer_question,
    )


if __name__ == "__main__":
    run()