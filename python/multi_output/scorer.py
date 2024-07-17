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

def custom_correctness_score_multiple_outputs(args: ScoreArgs) -> Score:
    output = args["output"]
    expected = args["expected"]

    # "output" and "expected" are Dict objects
    # matching the format of a dataset item Output Json.
    output_answer = output["answer"]
    expected_answers = expected["answers"]

    # Define your scoring logic here.
    if output_answer in expected_answers:
        return Score(value=1, reason="The output answer is contained in the expected answers.")
    else:
        return Score(value=0, reason="The output answer is not contained in the expected answers.")


# 1. Classification Scorer that uses multiple outputs to score
custom_scoring_classification_multiple_outputs = ScoringFunction(
    name="TutorialScore-Classify-Multiple-Outputs",
    version=1,
    score_config=ClassificationScoreConfig(
        type=FunctionType.CLASSIFICATION,
        labels={
            0: "Incorrect",
            1: "Correct",
        },
        colors={
            0: LabelColor.RED,
            1: LabelColor.GREEN,
        },
    ),
    scorer=LocalScorer(
        score_fn=custom_correctness_score_multiple_outputs
    ),
)
