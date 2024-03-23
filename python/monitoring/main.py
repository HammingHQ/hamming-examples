import asyncio

from ham import ham
from run import run
from run_oai import run_oai, run_oai_streaming, run_oai_async


if __name__ == "__main__":
    ham.monitoring.start()

    print("Running manual monitoring..")
    run()

    print("Running with OpenAI Wrapper")
    run_oai()

    print("Running with OpenAI Wrapper using streaming..")
    run_oai_streaming()

    print("Running with OpenAI Wrapper using async..")
    asyncio.run(run_oai_async())

    ham.monitoring.stop()
