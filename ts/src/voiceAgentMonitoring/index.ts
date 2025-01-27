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
      call_id: "call_ts_12345",
      recording_url: "https://example.com/recordings/call_ts_12345.wav",
      from_number: "+14255551234",
      to_number: "+18335557890",
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
