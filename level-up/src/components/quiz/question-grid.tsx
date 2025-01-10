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
    <div className="bg-[#1a1b2e] p-6 rounded-lg border-2 border-purple-500 shadow-lg shadow-purple-500/20">
      <h3 className="font-mono text-xl text-purple-300 mb-4">Choose a Question</h3>
      <div className="grid grid-cols-5 gap-3">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onQuestionSelect(question.id)}
            className={`w-12 h-12 rounded-full text-white flex items-center justify-center transition-all duration-300 font-mono text-lg
              ${getStatusClasses(getQuestionStatus(question.id))}
              ${currentQuestion === question.id ? 'ring-2 ring-offset-2 ring-pink-500 animate-pulse' : ''}
            `}
          >
            {question.id}
          </button>
        ))}
      </div>
    </div>
  )
}