const BASE_URL = "http://127.0.0.1:5000";

export const startInterview = async (subject) => {
  const response = await fetch(`${BASE_URL}/start-interview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ subject }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Start interview failed");
  }

  return data;
};

export const submitAnswer = async (audioBlob) => {
  const formData = new FormData();

  formData.append("audio", audioBlob, "answer.webm");

  const response = await fetch(`${BASE_URL}/submit-answer`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Submit answer failed");
  }

  return data;
};

export const getFeedback = async () => {
  const response = await fetch(`${BASE_URL}/get-feedback`, {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Feedback failed");
  }

  return data;
};