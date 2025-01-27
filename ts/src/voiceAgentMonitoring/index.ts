import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();
const HAMMING_API_KEY = process.env.HAMMING_API_KEY;
if (!HAMMING_API_KEY) {
  throw new Error("Missing HAMMING_API_KEY in environment");
}

function getTimestamps(): [number, number] {
  // Generate timestamps for a call that just ended
  const endTime = new Date();
  // Simulate a 5-minute call
  const startTime = new Date(endTime.getTime() - 5 * 60 * 1000);
  
  // Convert to milliseconds since epoch
  const endTimestamp = endTime.getTime();
  const startTimestamp = startTime.getTime();
  
  return [startTimestamp, endTimestamp];
}

async function sendCallRecording() {
  const url = "https://app.hamming.ai/api/rest/v2/call-logs";
  const [startTimestamp, endTimestamp] = getTimestamps();
  
  const payload = {
    provider: "custom",
    metadata: { agent: "My TypeScript Voice Agent" },
    payload: {
      // Replace with your actual call ID
      call_id: "your-call-id",
      // Replace with your actual recording URL from storage.vapi.ai
      recording_url: "https://storage.vapi.ai/your-recording-id.wav",
      // Replace with your actual phone numbers
      from_number: "+1234567890",
      to_number: "+1987654321",
      start_timestamp: startTimestamp,
      end_timestamp: endTimestamp,
      status: "ended"
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HAMMING_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  console.log("Status:", res.status);
  console.log("Response text:", await res.text());
}

sendCallRecording().catch(console.error);
