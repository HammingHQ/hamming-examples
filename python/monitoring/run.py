from hamming import (
    RetrievalParams,
    GenerationParams,
)

from ham import ham
trace = ham.tracing

def run():
    for _ in range(3):
        with ham.monitoring.start_item() as log_item:
            # This helps us display the question more cleanly on the monitoring page
            log_item.set_input(
                {"question": "What are the travel restrictions in Germany?"}
            )
            log_item.set_metadata({"category": "travel", "async": "true", "sdk": "Python"})

            trace.log({"text": "free-form log"})

            # This logs the retrieval results so that we can see them in the monitoring page
            trace.log_retrieval(
                RetrievalParams(
                    query="tour guides for Germany",
                    results=[
                        "Germany is a really nice place",
                        "You can travel to Berlin to see the cultural landmarks",
                        "You can travel freely in Germany",
                    ],
                    metadata=RetrievalParams.Metadata(engine="chroma"),
                )
            )
            
            # This logs the generation results so that we can see them in the monitoring page
            trace.log_generation(
                GenerationParams(
                    input="What are the travel restrictions in Germany?",
                    output="You can travel freely in Germany",
                    metadata=GenerationParams.Metadata(model="GPT-3"),
                )
            )

            # This helps us display the answer more cleanly on the monitoring page
            log_item.set_output({"answer": "You can travel freely in Germany"})
