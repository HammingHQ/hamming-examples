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


def custom_correctness_score(args: ScoreArgs) -> Score:
    output = args["output"]
    expected = args["expected"]

    # "output" and "expected" are Dict objects
    # matching the format of a dataset item Output Json.
    output_answer = output["answer"]
    expected_answer = expected["output"]

    # Define your scoring logic here.
    if (len(output_answer) % 2) == (len(expected_answer) % 2):
        return Score(value=1, reason="The length of the answers has the same parity.")
    else:
        return Score(value=0, reason="The length of the answers has different parity.")

# 1. Classification Scorer
custom_scoring_classification = ScoringFunction(
    name="TutorialScore-Classify",
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
        score_fn=custom_correctness_score
    ),
)

# 2. Numerical Scorer
custom_scoring_numeric = ScoringFunction(
    name="TutorialScore-Numeric",
    version=1,
    score_config=NumericScoreConfig(
        aggregate=FunctionAggregateType.MEAN,
    ),
    scorer=LocalScorer(
        score_fn=lambda _: Score(value=random.random(), reason="Random number")
    ),
)
