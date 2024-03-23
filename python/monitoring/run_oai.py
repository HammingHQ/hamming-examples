import os
import openai

from dotenv import load_dotenv
from hamming.oai import wrap_openai

from ham import ham

load_dotenv()

# Sync OpenAI client
openai_client = openai.Client(api_key=os.getenv("OPENAI_API_KEY"))
wopenai_client = wrap_openai(openai_client, ham)

# Async OpenAI client
aopenai_client = openai.AsyncClient(api_key=os.getenv("OPENAI_API_KEY"))
awopenai_client = wrap_openai(aopenai_client, ham)

model = "gpt-3.5-turbo"
question = "What are the travel restrictions in France?"
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {
        "role": "user",
        "content": question,
    },
]


def run_oai():
    for _ in range(3):
        with ham.monitoring.start_item() as log_item:
            log_item.set_input({"question": question})
            resp = wopenai_client.chat.completions.create(
                model=model, messages=messages
            )
            output = resp.choices[0].message.content
            log_item.set_output({"answer": output})


def run_oai_streaming():
    for _ in range(3):
        with ham.monitoring.start_item() as log_item:
            log_item.set_input({"question": question})
            output = ""
            resp = wopenai_client.chat.completions.create(
                stream=True,
                model=model,
                messages=messages,
            )
            for chunk in resp:
                if chunk.choices[0].delta.content is not None:
                    output += chunk.choices[0].delta.content
            log_item.set_output({"answer": output})


async def run_oai_async():
    for _ in range(3):
        with ham.monitoring.start_item() as log_item:
            log_item.set_input({"question": question})
            resp = await awopenai_client.chat.completions.create(
                model=model, messages=messages
            )
            output = resp.choices[0].message.content
            log_item.set_output({"answer": output})
