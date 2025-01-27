#!/usr/bin/env python3
import os
import requests
from datetime import datetime, timedelta

HAMMING_API_KEY = os.getenv("HAMMING_API_KEY", "")
if not HAMMING_API_KEY:
    raise ValueError("Missing HAMMING_API_KEY in environment")

def get_timestamps():
    """Generate start and end timestamps in milliseconds for a call that just ended."""
    end_time = datetime.now()
    # Simulate a 5-minute call
    start_time = end_time - timedelta(minutes=5)
    
    # Convert to milliseconds since epoch
    end_timestamp = int(end_time.timestamp() * 1000)
    start_timestamp = int(start_time.timestamp() * 1000)
    
    return start_timestamp, end_timestamp

def send_call_recording():
    url = "https://app.hamming.ai/api/rest/v2/call-logs"
    headers = {"Authorization": f"Bearer {HAMMING_API_KEY}", "Content-Type": "application/json"}
    
    start_timestamp, end_timestamp = get_timestamps()
    
    payload = {
        "provider": "custom",
        "metadata": {"agent": "My Python Voice Agent"},
        "payload": {
            # Replace with your actual call ID
            "call_id": "your-call-id",
            # Example recording URL from Hamming documentation
            "recording_url": "https://storage.vapi.ai/2f465c6c-93d2-40f0-8ec9-dafdc23fb0d2-1732230739721-32d30dab-2b31-41d3-b6e3-64e8330c00e2-stereo.wav",
            # Replace with your actual phone numbers
            "from_number": "+1234567890",
            "to_number": "+1987654321",
            "start_timestamp": start_timestamp,
            "end_timestamp": end_timestamp,
            "status": "ended"
        }
    }
    response = requests.post(url, json=payload, headers=headers)
    print("Response status:", response.status_code)
    print("Response body:", response.text)

if __name__ == "__main__":
    send_call_recording()
