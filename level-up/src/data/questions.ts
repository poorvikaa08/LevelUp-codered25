import { Question } from '../types/quiz'

export const questions: Question[] = [
  {
    id: 1,
    question: "Two cylindrical rods of uniform cross-sectional area A and 2A, having free electrons per unit volume 2n and n respectively are joined in series. A constant current I flows through them in steady state. The ratio of the drift velocity of free electrons in the left rod to that of the right rod is:",
    image: "/placeholder.svg?height=150&width=400",
    options: [
      { id: 'A', text: '½' },
      { id: 'B', text: '1' },
      { id: 'C', text: '2' },
      { id: 'D', text: '4' }
    ],
    difficulty: 'Hard', // Requires understanding of current flow and drift velocity
    answer: 'A',
    marks: 1,
  },
  {
    id: 2,
    question: "Which of the following is a fundamental force in nature?",
    options: [
      { id: 'A', text: 'Gravitational force' },
      { id: 'B', text: 'Electromagnetic force' },
      { id: 'C', text: 'Strong nuclear force' },
      { id: 'D', text: 'All of the above' }
    ],
    difficulty: 'Easy', // Straightforward knowledge-based question
    answer: 'D',
    marks: 1,
  },
  {
    id: 3,
    question: "Calculate the equivalent resistance when two resistors of 2Ω and 4Ω are connected in parallel.",
    options: [
      { id: 'A', text: '1.33Ω' },
      { id: 'B', text: '6Ω' },
      { id: 'C', text: '3Ω' },
      { id: 'D', text: '2.67Ω' }
    ],
    difficulty: 'Medium', // Involves simple parallel resistance calculation
    answer: 'A',
    marks: 1,
  },
  {
    id: 4,
    question: "What is the SI unit of electric potential?",
    options: [
      { id: 'A', text: 'Ampere' },
      { id: 'B', text: 'Volt' },
      { id: 'C', text: 'Ohm' },
      { id: 'D', text: 'Watt' }
    ],
    difficulty: 'Easy', // Basic conceptual question
    answer: 'B',
    marks: 1,
  },
  {
    id: 5,
    question: "A ball is thrown vertically upward with an initial velocity of 49 m/s. Calculate the maximum height reached by the ball. (Take g = 9.8 m/s²)",
    options: [
      { id: 'A', text: '122.5 m' },
      { id: 'B', text: '125 m' },
      { id: 'C', text: '127.5 m' },
      { id: 'D', text: '130 m' }
    ],
    difficulty: 'Medium', // Requires applying kinematic equations
    answer: 'A',
    marks: 1,
  },
  {
    id: 6,
    question: "Which quantum number determines the shape of an orbital?",
    options: [
      { id: 'A', text: 'Principal quantum number' },
      { id: 'B', text: 'Angular momentum quantum number' },
      { id: 'C', text: 'Magnetic quantum number' },
      { id: 'D', text: 'Spin quantum number' }
    ],
    difficulty: 'Easy', // Knowledge-based question
    answer: 'B',
    marks: 1,
  },
  {
    id: 7,
    question: "The photoelectric effect demonstrates which nature of light?",
    image: "/placeholder.svg?height=150&width=400",
    options: [
      { id: 'A', text: 'Wave nature' },
      { id: 'B', text: 'Particle nature' },
      { id: 'C', text: 'Both wave and particle nature' },
      { id: 'D', text: 'Neither wave nor particle nature' }
    ],
    difficulty: 'Medium', // Requires conceptual understanding of light's dual nature
    answer: 'B',
    marks: 1,
  },
  {
    id: 8,
    question: "What is the value of Planck's constant?",
    options: [
      { id: 'A', text: '6.023 × 10²³ J·s' },
      { id: 'B', text: '6.626 × 10⁻³⁴ J·s' },
      { id: 'C', text: '3.0 × 10⁸ J·s' },
      { id: 'D', text: '1.6 × 10⁻¹⁹ J·s' }
    ],
    difficulty: 'Easy', // Memorization-based
    answer: 'B',
    marks: 1,
  },
  {
    id: 9,
    question: "Which of the following is an example of a vector quantity?",
    options: [
      { id: 'A', text: 'Mass' },
      { id: 'B', text: 'Temperature' },
      { id: 'C', text: 'Displacement' },
      { id: 'D', text: 'Time' }
    ],
    difficulty: 'Easy', // Concept-based
    answer: 'C',
    marks: 1,
  },
  {
    id: 10,
    question: "In a transformer, which of the following remains constant?",
    options: [
      { id: 'A', text: 'Current' },
      { id: 'B', text: 'Voltage' },
      { id: 'C', text: 'Frequency' },
      { id: 'D', text: 'Power' }
    ],
    difficulty: 'Medium', // Requires understanding of transformer basics
    answer: 'C',
    marks: 1,
  }
]
