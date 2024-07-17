import random

from hamming import (
    ScoringFunction,
    ClassificationScoreConfig,
    NumericScoreConfig,
    FunctionAggregateType,
    FunctionType,
    LabelColor,
    LocalScorer,
    ScoreArgs,
    Score
)

def custom_correctness_score_reference_free(args: ScoreArgs) -> Score:
    output = args["output"]

    # "output" is Dict object
    # matching the format of a dataset item Output Json.
    output_answer = output["answer"]

    # Define your scoring logic here.
    if 'delve' in output_answer:
        return Score(value=1, reason="The output answer uses 'delve'.")
    else:
        return Score(value=0, reason="The output answer does not use 'delve'.")


# 1. Classification Scorer that uses reference-free scoring to score
custom_scoring_classification_reference_free = ScoringFunction(
    name="TutorialScore-Classify-Reference-Free",
    version=1,
    score_config=ClassificationScoreConfig(
        type=FunctionType.CLASSIFICATION,
        labels={
            0: "Incorrect",
            1: "Correct",
        },
    ),
    scorer=LocalScorer(
        score_fn=custom_correctness_score_reference_free
    ),
)