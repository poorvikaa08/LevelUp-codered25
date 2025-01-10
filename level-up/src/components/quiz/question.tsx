// import { useEffect, useState } from 'react'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'
// import { QuestionStatuses } from '@/types/quiz'

// interface QuestionProps {
//   questionId: number;
//   statuses: QuestionStatuses;
//   onAnswer: (questionId: number, answerId: string) => void;
//   onMarkForReview: (questionId: number) => void;
//   onClearResponse: (questionId: number) => void;
//   onPrevious: () => void;
//   onNext: () => void;
//   onSubmit: () => void;
// }

// export function Question({
//   questionId,
//   statuses,
//   onAnswer,
//   onMarkForReview,
//   onClearResponse,
//   onPrevious,
//   onNext,
//   onSubmit
// }: QuestionProps) {
//   const [questions, setQuestions] = useState<any[]>([])
//   const [userResponses, setUserResponses] = useState<{ [key: number]: string }>({})
//   const [correctAnswers, setCorrectAnswers] = useState<number>(0)

//   useEffect(() => {
//     // Retrieve the questions from localStorage
//     const storedQuestions = localStorage.getItem('questions')
//     if (storedQuestions) {
//       setQuestions(JSON.parse(storedQuestions))
//     }

//     // Retrieve user responses from localStorage (if any)
//     const storedResponses = localStorage.getItem('userResponses')
//     if (storedResponses) {
//       setUserResponses(JSON.parse(storedResponses))
//     }
//   }, [])

//   const question = questions.find(q => q.id === questionId)
//   if (!question) return null

//   const status = statuses[questionId] || { visited: false }
//   const isLastQuestion = questionId === questions.length

//   const handleAnswer = (questionId: number, answerId: string) => {
//     // Update user responses in the state
//     setUserResponses((prevResponses) => {
//       const updatedResponses = { ...prevResponses, [questionId]: answerId }
//       localStorage.setItem('userResponses', JSON.stringify(updatedResponses)) // Save to localStorage
//       return updatedResponses
//     })
//     onAnswer(questionId, answerId)
//   }

//   const handleSubmit = () => {
//     // Calculate the number of correct answers
//     let correct = 0
//     questions.forEach(question => {
      
//       if (userResponses[question.id] === question.correctAnswer) {
//         correct++
       
//       }
//     })

//     // Store the result in localStorage
//     localStorage.setItem('result', JSON.stringify({ correctAnswers: correct, totalQuestions: questions.length }))
    
//     // Redirect to result page using window.location.href
//     window.location.href = '/result/'
    
//     onSubmit()
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm">
//       <div className="flex justify-between items-center mb-4">
//         <div className="text-sm text-gray-600">
//           Marks for correct answer : <span className="bg-green-100 px-2 py-1 rounded">{question.marks}</span>
//         </div>
//       </div>

//       <div className="space-y-4">
//         <h2 className="text-lg font-medium">Question {question.id} - Single Choice</h2>

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
//           {question.options.map((option: any) => (
//             <button
//               key={option.id}
//               onClick={() => handleAnswer(question.id, option.id)}
//               className={`w-full text-left p-4 rounded border hover:bg-gray-50 flex items-center gap-2 ${userResponses[question.id] === option.id ? 'border-indigo-500 bg-indigo-50' : ''
//                 }`}
//             >
//               <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${userResponses[question.id] === option.id ? 'border-indigo-500 text-indigo-500' : ''
//                 }`}>
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
//             <Button
//               variant="outline"
//               onClick={onPrevious}
//               disabled={questionId === 1}
//             >
//               Previous
//             </Button>
//             {isLastQuestion ? (
//               <Button
//                 className="bg-green-500 hover:bg-green-600 text-white"
//                 onClick={handleSubmit}
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
//              console.log('User Responses:', userResponses);
//              console.log('Correct Answers:', question.correctAnswer);
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
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
  const [userResponses, setUserResponses] = useState<{ [key: number]: string }>({})
  const [correctAnswers, setCorrectAnswers] = useState<number>(0)
  const [score, setScore] = useState<number | null>(null)

  useEffect(() => {
    // Retrieve the questions from localStorage
    const storedQuestions = localStorage.getItem('questions')
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions))
    }

    // Retrieve user responses from localStorage (if any)
    const storedResponses = localStorage.getItem('userResponses')
    if (storedResponses) {
      setUserResponses(JSON.parse(storedResponses))
    }
  }, [])

  const question = questions.find(q => q.id === questionId)
  if (!question) return null

  const status = statuses[questionId] || { visited: false }
  const isLastQuestion = questionId === questions.length

  const handleAnswer = (questionId: number, answerId: string) => {
    // Update user responses in the state
    setUserResponses((prevResponses) => {
      const updatedResponses = { ...prevResponses, [questionId]: answerId }
      localStorage.setItem('userResponses', JSON.stringify(updatedResponses)) // Save to localStorage
      return updatedResponses
    })
    onAnswer(questionId, answerId)
  }

  const calculateScore = () => {
    let correct = 0
    questions.forEach(question => {
      if (userResponses[question.id] === question.correctAnswer) {
        correct++
      }
    })
    setScore(correct) // Set the score in the state
    return correct
  }

  const handleSubmit = () => {
    // Calculate and store the score
    const correct = calculateScore()
    localStorage.setItem('result', JSON.stringify({ correctAnswers: correct, totalQuestions: questions.length }))
    
    // Redirect to result page
    window.location.href = '/result/'
    
    onSubmit()
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Marks for correct answer : <span className="bg-green-100 px-2 py-1 rounded">{question.marks}</span>
        </div>
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
              onClick={() => handleAnswer(question.id, option.id)}
              className={`w-full text-left p-4 rounded border hover:bg-gray-50 flex items-center gap-2 ${userResponses[question.id] === option.id ? 'border-indigo-500 bg-indigo-50' : ''
                }`}
            >
              <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${userResponses[question.id] === option.id ? 'border-indigo-500 text-indigo-500' : ''
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
                onClick={handleSubmit}
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
      {score !== null && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="text-lg font-bold">Your Score: {score}/{questions.length}</p>
        </div>
      )}
    </div>
  )
}

