'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function ResultPage() {
  const [feedback, setFeedback] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const storedQuestions = localStorage.getItem('questions')
        const storedResponses = localStorage.getItem('userResponses')

        if (!storedQuestions || !storedResponses) {
          throw new Error('Missing required data. Please try taking the quiz again.')
        }

        const payload = {
          questions: JSON.parse(storedQuestions),
          user_responses: JSON.parse(storedResponses),
        }

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
        setError(err instanceof Error ? err.message : 'An error occurred while fetching feedback.')
      } finally {
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 starry-sky">
        <Card className="w-full max-w-md bg-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-300"></div>
            </div>
            <p className="text-center mt-4 text-lg font-semibold text-purple-300">Loading feedback...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 starry-sky">
        <Card className="w-full max-w-md bg-gray-800">
          <CardHeader>
            <CardTitle className="text-center text-red-400">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-300">{error}</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild variant="outline">
              <a href="/quiz">Take the Quiz Again</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 starry-sky p-8">
      <Card className="w-full max-w-2xl bg-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-purple-300">Quiz Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold text-gray-300 mb-4">Here's your personalized feedback:</p>
          <div className="bg-gray-700 p-6 rounded-lg prose prose-purple max-w-none">
            <ReactMarkdown>{feedback || ''}</ReactMarkdown>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild variant="outline">
            <a href="/quiz">Take the Quiz Again</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

