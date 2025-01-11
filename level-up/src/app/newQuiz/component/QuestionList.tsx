"use client";

import { useEffect, useState } from "react";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      alert("No questions found in storage!");
    }
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Questions</h1>
      {questions.length > 0 ? (
        <ul>
          {questions.map((question: any, index: number) => (
            <li key={index} className="mb-2">
              {index + 1}. {question}
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
}