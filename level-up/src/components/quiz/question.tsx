'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { QuestionStatuses } from '@/types/quiz'

interface QuestionProps {
  questionId: number;
  statuses: QuestionStatuses;
  onAnswer: (questionId: number, answerId: string) => void;
  onMarkForReview: (questionId: number) => void;
  onClearResponse: (questionId: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export function Question({
  questionId,
  statuses,
  onAnswer,
  onMarkForReview,
  onClearResponse,
  onPrevious,
  onNext,
  onSubmit
}: QuestionProps) {
  const [questions, setQuestions] = useState<any[]>([])

  useEffect(() => {
    // Retrieve the questions from localStorage
    const storedQuestions = localStorage.getItem('questions')
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions))
    }
  }, [])

  const question = questions.find(q => q.id === questionId)
  if (!question) return null

  const status = statuses[questionId] || { visited: false }
  const isLastQuestion = questionId === questions.length

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Marks for correct answer : <span className="bg-green-100 px-2 py-1 rounded">{question.marks}</span>
        </div>
        {/* <div className="text-sm text-gray-600">
          Negative marks : <span className="bg-red-100 px-2 py-1 rounded">{question.negativeMarks}</span>
        </div> */}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Question {question.id} - Single Choice</h2>

        <div className="prose max-w-none">
          <p>{question.question}</p>

          {question.image && (
            <div className="flex justify-center my-4">
              <Image
                src={question.image}
                alt={`Question ${question.id} diagram`}
                width={400}
                height={150}
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          {question.options.map((option: any) => (
            <button
              key={option.id}
              onClick={() => onAnswer(question.id, option.id)}
              className={`w-full text-left p-4 rounded border hover:bg-gray-50 flex items-center gap-2 ${status.answered === option.id ? 'border-indigo-500 bg-indigo-50' : ''
                }`}
            >
              <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${status.answered === option.id ? 'border-indigo-500 text-indigo-500' : ''
                }`}>
                {option.id}
              </span>
              <span>{option.text}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={() => onMarkForReview(question.id)}
            >
              Mark for review & Next
            </Button>
            <Button
              variant="outline"
              onClick={() => onClearResponse(question.id)}
            >
              Clear Response
            </Button>
          </div>
          <div className="space-x-4">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={questionId === 1}
            >
              Previous
            </Button>
            {isLastQuestion ? (
              <Button
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => {window.location.href = '/result/'}}
              >
                Submit Test
              </Button>
            ) : (
              <Button
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
                onClick={onNext}
              >
                Save & Next
              </Button>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

// "use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { QuestionStatuses } from "@/types/quiz";
// import { useState, useEffect } from "react";

// interface QuestionProps {
//   id: number;
//   statuses: QuestionStatuses;
//   onAnswer: (id: number, answer: string) => void;
//   onMarkForReview: (id: number) => void;
//   onClearResponse: (id: number) => void;
//   onPrevious: () => void;
//   onNext: () => void;
//   onSubmit: () => void;
// }

// interface Question {
//   id: number;
//   question: string;
//   marks: number;
//   answer: string;
//   options: { id: string; text: string }[];
//   image?: string;
// }

// export function Question({
//   id,
//   statuses,
//   onAnswer,
//   onMarkForReview,
//   onClearResponse,
//   onPrevious,
//   onNext,
//   onSubmit,
// }: QuestionProps) {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [score, setScore] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState<
//     { id: number; answer: string }[]
//   >([]);

//   useEffect(() => {
//     // Retrieve questions from localStorage
//     const storedQuestions = localStorage.getItem("questions");
//     if (storedQuestions) {
//       setQuestions(JSON.parse(storedQuestions));
//     }
//   }, []);

//   const question = questions.find((q) => q.id === id);
//   if (!question) return null;

//   const status = statuses[id] || { visited: false };
//   const isLastQuestion = id === questions.length;

//   const handleAnswer = (answer: string) => {
//     onAnswer(question.id, answer);

//     const isCorrect = question.answer === answer;
//     if (isCorrect) {
//       setScore((prevScore) => prevScore + question.marks);
//     }

//     setSelectedAnswers((prevAnswers) => {
//       const existingIndex = prevAnswers.findIndex((a) => a.id === question.id);
//       const updatedAnswers = [...prevAnswers];

//       if (existingIndex !== -1) {
//         updatedAnswers[existingIndex] = { id: question.id, answer };
//       } else {
//         updatedAnswers.push({ id: question.id, answer });
//       }

//       return updatedAnswers;
//     });
//   };

//   const submitAnswersToServer = async () => {
//     const csrfToken = document
//       .querySelector('meta[name="csrf-token"]')
//       ?.getAttribute("content");

//     try {
//       const response = await fetch("/api/submit-answers/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-CSRFToken": csrfToken || "",
//         },
//         body: JSON.stringify({
//           answers: selectedAnswers,
//           score: score,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Server Response:", data);
//     } catch (error) {
//       console.error("Error submitting answers:", error);
//     }
//   };

//   useEffect(() => {
//     console.log(
//       "Selected Answers JSON:",
//       JSON.stringify(selectedAnswers, null, 2)
//     );
//   }, [selectedAnswers]);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm">
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-sm text-gray-600">
//           Marks for correct answer:{" "}
//           <span className="bg-green-100 px-2 py-1 rounded">
//             {question.marks}
//           </span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-lg font-medium">
//           Question {question.id} - Single Choice
//         </h2>

//         <div className="prose max-w-none">
//           <p>{question.question}</p>

//           {question.image && (
//             <div className="flex justify-center my-4">
//               <Image
//                 src={question.image}
//                 alt={`Question ${question.id} diagram`}
//                 width={400}
//                 height={150}
//                 className="rounded-lg"
//               />
//             </div>
//           )}
//         </div>

//         <div className="space-y-2">
//           {question.options.map((option) => (
//             <button
//               key={option.id}
//               onClick={() => handleAnswer(option.id)}
//               className={`w-full text-left p-4 rounded border hover:bg-gray-50 flex items-center gap-2 ${
//                 status.answered === option.id
//                   ? "border-indigo-500 bg-indigo-50"
//                   : ""
//               }`}
//             >
//               <span
//                 className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
//                   status.answered === option.id
//                     ? "border-indigo-500 text-indigo-500"
//                     : ""
//                 }`}
//               >
//                 {option.id}
//               </span>
//               <span>{option.text}</span>
//             </button>
//           ))}
//         </div>

//         <div className="flex justify-between mt-8">
//           <div className="space-x-4">
//             <Button
//               variant="outline"
//               onClick={() => onMarkForReview(question.id)}
//             >
//               Mark for review & Next
//             </Button>
//             <Button
//               variant="outline"
//               onClick={() => onClearResponse(question.id)}
//             >
//               Clear Response
//             </Button>
//           </div>
//           <div className="space-x-4">
//             <Button variant="outline" onClick={onPrevious} disabled={id === 1}>
//               Previous
//             </Button>
//             {isLastQuestion ? (
//               <Button
//                 className="bg-green-500 hover:bg-green-600 text-white"
//                 onClick={() => {
//                   submitAnswersToServer();
//                   onSubmit();
//                 }}
//               >
//                 Submit Test
//               </Button>
//             ) : (
//               <Button
//                 className="bg-yellow-400 hover:bg-yellow-500 text-black"
//                 onClick={onNext}
//               >
//                 Save & Next
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="mt-6 text-right">
//         <p className="text-gray-600">Current Score: {score}</p>
//         <pre className="text-sm bg-gray-100 p-2 rounded mt-4">
//           {JSON.stringify(selectedAnswers, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// }
