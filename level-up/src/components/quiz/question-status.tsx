'use client'

import { useState, useEffect } from 'react';
import { QuestionStatuses } from '@/types/quiz'
import { questions } from '@/data/questions'

interface QuestionStatusProps {
  statuses: QuestionStatuses;
}

export function QuestionStatus({ statuses }: QuestionStatusProps) {
  const [counts, setCounts] = useState({
    answered: 0,
    markedForReview: 0,
  });

  useEffect(() => {
    const calculateCounts = () => {
      const counts = {
        answered: 0,
        markedForReview: 0,
      };

      questions.forEach(question => {
        const status = statuses[question.id];
        if (status?.answered) {
          counts.answered++;
        } else if (status?.markedForReview) {
          counts.markedForReview++;
        } else {
          //do nothing
          console.log('do nothing');
        }
      });

      setCounts(counts);
    };

    calculateCounts();
  }, [statuses]);


  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
            {counts.answered}
          </div>
          <span className="text-sm">Answered</span>
        </div>
        {/* <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">
            {counts.notAnswered}
          </div>
          <span className="text-sm">Not Answered</span>
        </div> */}
        {/* <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
            {counts.notVisited}
          </div>
          <span className="text-sm">Not Visited</span>
        </div> */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
            {counts.markedForReview}
          </div>
          <span className="text-sm">Marked for Review</span>
        </div>
        {/* <div className="flex items-center gap-2 col-span-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white relative">
            {counts.answeredMarked}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full text-xs flex items-center justify-center">
              ✓
            </span>
          </div>
          <span className="text-sm">Answered & Marked for Review</span>
        </div> */}
      </div>
    </div>
  )
}

