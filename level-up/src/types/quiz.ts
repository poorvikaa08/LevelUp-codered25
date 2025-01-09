export interface Option {
    id: string;
    text: string;
  }
  
  export interface Question {
    id: number;
    question: string;
    image?: string; 
    options: Option[];
    difficulty: string;
    answer: string;
    marks: number;
    // marksCorrect: number;
    // imageSrc?: string;
  }
  
  export interface QuestionStatus {
    answered?: string;
    markedForReview: boolean;
    visited: boolean;
  }
  
  export type QuestionStatuses = Record<number, QuestionStatus>;
  
  