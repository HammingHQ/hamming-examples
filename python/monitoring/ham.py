import os

from dotenv import load_dotenv
load_dotenv()

from hamming import (
    Hamming,
    ClientOptions,
)

HAMMING_API_KEY = os.getenv("HAMMING_API_KEY")

ham = Hamming(ClientOptions(api_key=HAMMING_API_KEY))
