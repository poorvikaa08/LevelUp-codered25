'use client'

import React, { useState } from "react";

interface FlashCardProps {
  question: string;
  answer: string;
  isFlipped: boolean;
}

const FlashCard: React.FC<FlashCardProps> = ({ question, answer, isFlipped }) => {

  return (
    <div className="flashcard-container w-80 h-48 perspective-1000 mb-8">
      <div
        className={`flashcard w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="flashcard-side absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl shadow-lg flex items-center justify-center p-4">
          <p className="text-white text-xl font-bold text-center">{question}</p>
        </div>

        {/* Back Side */}
        <div className="flashcard-side absolute w-full h-full backface-hidden bg-gradient-to-br from-pink-400 to-purple-400 rounded-xl shadow-lg flex items-center justify-center p-4 rotate-y-180">
          <p className="text-white text-xl font-bold text-center">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
