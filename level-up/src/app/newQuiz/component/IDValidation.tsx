
import { useState } from "react";

export default function IDValidation({ onValidate }: { onValidate: (isValid: boolean) => void }) {
  const [userId, setUserId] = useState("");
  const mockUserId = "12345"; // Replace with actual validation logic if needed

  const handleSubmit = () => {
    if (userId === mockUserId) {
      onValidate(true);
    } else {
      alert("Invalid User ID");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl mb-4">Enter Your User ID</h1>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 rounded mb-4"
        placeholder="Enter your ID"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </div>
  );
}