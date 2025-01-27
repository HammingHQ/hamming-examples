#!/usr/bin/env python3
import os
import requests

HAMMING_API_KEY = os.getenv("HAMMING_API_KEY", "")
if not HAMMING_API_KEY:
    raise ValueError("Missing HAMMING_API_KEY in environment")

def send_call_recording():
    url = "https://app.hamming.ai/api/rest/v2/call-logs"
    headers = {"Authorization": f"Bearer {HAMMING_API_KEY}", "Content-Type": "application/json"}
    payload = {
        "provider": "custom",
        "metadata": {"agent": "My Python Voice Agent"},
        "payload": {
            "call_id": "call_python_12345",
            "recording_url": "https://example.com/recordings/call_python_12345.wav",
            "from_number": "+14255551234",
            "to_number": "+18335557890",
            "start_timestamp": 1683330954000,
            "end_timestamp": 1683331234000,
            "status": "ended"
        }
    }
    response = requests.post(url, json=payload, headers=headers)
    print("Response status:", response.status_code)
    print("Response body:", response.text)

if __name__ == "__main__":
    send_call_recording()
