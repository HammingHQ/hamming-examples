import os

from dotenv import load_dotenv
from hamming import (
    ClientOptions,
    CreateDatasetOptions,
    DatasetItemValue,
    Hamming,
)

from data import sample_data


load_dotenv()

HAMMING_API_KEY = os.getenv("HAMMING_API_KEY")
hamming = Hamming(ClientOptions(api_key=HAMMING_API_KEY))

def create_dataset():
    print("Creating dataset..")

    items = [
        DatasetItemValue(
            input=item["input"],
            output=item["output"],
            metadata=item["metadata"],
        )
        for item in sample_data
    ]

    dataset = hamming.datasets.create(
        CreateDatasetOptions(
            name="Test dataset",
            description="Test dataset description",
            items=items
        )
    )
    print(f"Created dataset with ID: {dataset.id}")


def main():
    create_dataset()


if __name__ == "__main__":
    main()