'use client'

import { useState } from 'react'
import { QuestionStatuses } from '@/types/quiz'
import { questions } from '@/data/questions'

export function useQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [statuses, setStatuses] = useState<QuestionStatuses>({})
  
  const updateStatus = (questionId: number, update: Partial<QuestionStatuses[number]>) => {
    setStatuses(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        ...update,
        visited: true
      }
    }))
  }

  const handleAnswer = (questionId: number, answerId: string) => {
    updateStatus(questionId, { answered: answerId, visited: true })
  }

  const handleMarkForReview = (questionId: number) => {
    updateStatus(questionId, { markedForReview: true })
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleClearResponse = (questionId: number) => {
    updateStatus(questionId, { answered: undefined })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleQuestionSelect = (questionId: number) => {
    setCurrentQuestion(questionId)
  }

  const handleSubmitTest = () => {
    // Add submission logic here
    alert('Test Submitted!')
  }

  return {
    currentQuestion,
    statuses,
    handleAnswer,
    handleMarkForReview,
    handleClearResponse,
    handleNext,
    handlePrevious,
    handleQuestionSelect,
    handleSubmitTest
  }
}

