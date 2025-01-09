'use client'

import { QuestionStatuses } from '@/types/quiz'
import { questions } from '@/data/questions'

interface QuestionGridProps {
  currentQuestion: number;
  statuses: QuestionStatuses;
  onQuestionSelect: (questionId: number) => void;
}

export function QuestionGrid({
  currentQuestion,
  statuses,
  onQuestionSelect
}: QuestionGridProps) {
  const getQuestionStatus = (questionId: number) => {
    const status = statuses[questionId];
    if (status && status.answered) return 'answered';
    if (status && status.markedForReview) return 'marked';
    return 'not-answered';
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'answered':
        return 'bg-green-500 text-white'
      case 'marked':
        return 'bg-indigo-600 text-white'
      default:
        return 'border-2 border-gray-300 hover:border-gray-400'
    }
  }

  return (
    <div className="bg-blue-50 p-4 mt-4 rounded-lg">
      <h3 className="font-medium mb-4">Choose a Question</h3>
      <div className="grid grid-cols-5 gap-2">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onQuestionSelect(question.id)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
              ${getStatusClasses(getQuestionStatus(question.id))}
              ${currentQuestion === question.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}
            `}
          >
            {question.id}
          </button>
        ))}
      </div>
    </div>
  )
}

