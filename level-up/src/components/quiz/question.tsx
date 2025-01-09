'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { questions } from '@/data/questions'
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
          {question.options.map((option) => (
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
                onClick={onSubmit}
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

