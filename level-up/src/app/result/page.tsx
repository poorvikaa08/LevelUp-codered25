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
  const [feedback, setFeedback] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Retrieve questions and user responses from localStorage
    const storedQuestions = localStorage.getItem('questions')
    const storedResponses = localStorage.getItem('userResponses')

    if (!storedQuestions || !storedResponses) {
      setError('Missing required data. Please try taking the quiz again.')
      setLoading(false)
      return
    }

    // Prepare the payload for the API
    const payload = {
      questions: JSON.parse(storedQuestions),
      user_responses: JSON.parse(storedResponses),
    }

    // Send the POST request to the feedback API
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:8000/generate-feedback/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch feedback: ${response.statusText}`)
        }

        const data = await response.json()
        setFeedback(data.feedback)
      } catch (err) {
        setError(err.message || 'An error occurred while fetching feedback.')
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  if (loading) {
    return <div className="text-center p-6">Loading feedback...</div>
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-600">
        <p>Error: {error}</p>
        <a
          href="/quiz"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 mt-4"
        >
          Take the Quiz Again
        </a>
      </div>
    )
  }

  return (
    <div className="container p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Quiz Feedback</h1>

      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-gray-700">Here’s your personalized feedback:</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-lg text-gray-800 whitespace-pre-line">{feedback}</p>
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
