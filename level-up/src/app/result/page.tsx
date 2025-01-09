// import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Quiz Result',
// }

// export default function ResultPage({
//   searchParams,
// }: {
//   searchParams: { score: string }
// }) {
//   const score = parseInt(searchParams.score) || 0
//   const totalQuestions = 3 // Update this if you change the number of questions

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Quiz Result</h1>
//       <p className="text-lg">
//         Your score: {score} out of {totalQuestions}
//       </p>
//       <div className="mt-4">
//         <h2 className="text-xl font-semibold mb-2">Analysis:</h2>
//         {score === totalQuestions && (
//           <p className="text-green-600">Excellent! You got all questions correct!</p>
//         )}
//         {score > totalQuestions / 2 && score < totalQuestions && (
//           <p className="text-blue-600">Good job! You passed the quiz, but there's room for improvement.</p>
//         )}
//         {score <= totalQuestions / 2 && (
//           <p className="text-red-600">You might want to study more and try again.</p>
//         )}
//       </div>
//       <a
//         href="/quiz"
//         className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//       >
//         Take the Quiz Again
//       </a>
//     </div>
//   )
// }

'use client';

import { useEffect, useState } from 'react'

export default function ResultPage() {
  const [score, setScore] = useState<number>(0)
  const [userResponses, setUserResponses] = useState<{ [key: number]: string }>({})
  const [questions, setQuestions] = useState<any[]>([])

  useEffect(() => {
    // Retrieve result and user responses from localStorage
    const storedResult = localStorage.getItem('result')
    const storedQuestions = localStorage.getItem('questions')
    const storedResponses = localStorage.getItem('userResponses')

    if (storedResult) {
      const parsedResult = JSON.parse(storedResult)
      setScore(parsedResult.correctAnswers)
    }

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions))
    }

    if (storedResponses) {
      setUserResponses(JSON.parse(storedResponses))
    }
  }, [])

  const totalQuestions = questions.length

  return (
    <div className="container p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quiz Result</h1>
      
      <div className="text-center mb-6">
        <p className="text-xl font-semibold text-gray-700">
          Your score: <span className="text-4xl text-blue-600">{score}</span> out of{' '}
          <span className="text-4xl text-blue-600">{totalQuestions}</span>
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Analysis:</h2>
        {score === totalQuestions && (
          <p className="text-xl text-green-600 font-medium bg-green-100 p-4 rounded-lg">
            Excellent! You got all questions correct!
          </p>
        )}
        {score > totalQuestions / 2 && score < totalQuestions && (
          <p className="text-xl text-blue-600 font-medium bg-blue-100 p-4 rounded-lg">
            Good job! You passed the quiz, but there's room for improvement.
          </p>
        )}
        {score <= totalQuestions / 2 && (
          <p className="text-xl text-red-600 font-medium bg-red-100 p-4 rounded-lg">
            You might want to study more and try again.
          </p>
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Responses:</h2>
        <div className="space-y-4">
          {questions.map((question) => {
            const userAnswer = userResponses[question.id]
            const correctAnswer = question.correctAnswer
            const isCorrect = userAnswer === correctAnswer
            return (
              <div key={question.id} className="border p-4 rounded-lg bg-white shadow-sm">
                <h3 className="text-lg font-semibold">{question.question}</h3>
                <p className={`text-md mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  Your answer: <span className="font-medium">{userAnswer}</span>
                </p>
                <p className={`text-md mt-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                  Correct answer: <span className="font-medium">{correctAnswer}</span>
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="text-center mt-8">
        <a
          href="/quiz"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Take the Quiz Again
        </a>
      </div>
    </div>
  )
}
