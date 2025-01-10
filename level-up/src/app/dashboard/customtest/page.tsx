"use client";

import { useState } from "react";

export default function Page() {
  const [inputId, setInputId] = useState("");
  const [customTest, setCustomTest] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputId.trim()) {
      setError("Please enter a unique ID.");
      return;
    }

    try {
      setError(null);
      // Replace with your actual endpoint for fetching tests
      const response = await fetch(`/api/get-test/${inputId}`);

      if (!response.ok) {
        throw new Error("Test not found. Please check the unique ID.");
      }

      const data = await response.json();
      setCustomTest(data.testContent); // Assume `testContent` contains the shared test.
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setCustomTest(null);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-6">Enter Unique ID</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
      >
        <label htmlFor="unique-id" className="block text-sm font-medium text-gray-700 mb-2">
          Unique ID
        </label>
        <input
          id="unique-id"
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Enter unique test ID"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Fetch Test
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {customTest && (
        <div className="w-full max-w-md mt-6 bg-green-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-2">Fetched Test</h2>
          <p className="text-gray-700">{customTest}</p>
        </div>
      )}
    </div>
  );
}
