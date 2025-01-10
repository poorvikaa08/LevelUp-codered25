'use client'

import { useState } from 'react'
import { Header } from '@/components/quiz/header'
import { StatusBar } from '@/components/quiz/status-bar'
import { Question } from '@/components//quiz/question'
import { QuestionStatus } from '@/components/quiz/question-status'
import { QuestionGrid } from '@/components/quiz/question-grid'
import { useQuiz } from '@/hooks/useQuiz'
import { useQuizTimer } from '@/hooks/useQuizTimer'


export default function QuizPortal() {
  const {
    currentQuestion,
    statuses,
    handleAnswer,
    handleMarkForReview,
    handleClearResponse,
    handleNext,
    handlePrevious,
    handleQuestionSelect,
    handleSubmitTest
  } = useQuiz()

  const { timeLeft} = useQuizTimer(900)
  const [currentSection, setCurrentSection] = useState('Easy')

  return (
    <div className="min-h-screen bg-[url('/assests/image1.png')] bg-cover bg-center bg-no-repeat h-full w-full">
      <Header />
      <StatusBar
        timeLeft={timeLeft}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
      />      
      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-6">
          <Question
            questionId={currentQuestion}
            statuses={statuses}
            onAnswer={handleAnswer}
            onMarkForReview={handleMarkForReview}
            onClearResponse={handleClearResponse}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmitTest}
          />
          
          <div className="space-y-6">
            <QuestionStatus statuses={statuses} />
            <QuestionGrid
              currentQuestion={currentQuestion}
              statuses={statuses}
              onQuestionSelect={handleQuestionSelect}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

