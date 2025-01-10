'use client'

import React, { useState } from "react";
import FlashCard from "@/components/dashboard/flashcard";
const cards = [
    { question: "What is React?", answer: "A library for building UIs." },
    { question: "What is JSX?", answer: "A syntax extension for JavaScript." },
    { question: "What is a component?", answer: "A reusable piece of UI." },
  ];
  
  const FlashCardPage: React.FC = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
  
    const nextCard = () => {
      setIsFlipped(false);
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };
  
    const handleFlip = () => {
      setIsFlipped(!isFlipped);
    };
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1b2e] py-10 relative overflow-hidden">
        {/* Background Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-200 rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
  
        {/* Grid Lines */}
        <div className="absolute inset-0 bg-grid-lines opacity-20" />
  
        <h1 className="text-4xl font-bold mb-10 relative z-10">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text font-mono">
            RETRO FLASH CARDS
          </span>
        </h1>
        <div onClick={handleFlip} className="cursor-pointer">
          <FlashCard
            question={cards[currentCardIndex].question}
            answer={cards[currentCardIndex].answer}
            isFlipped={isFlipped}
          />
        </div>
        <button
          onClick={nextCard}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold rounded-full hover:from-purple-500 hover:to-pink-500 transition-colors duration-300 relative z-10"
        >
          Next Card
        </button>
  
        <style jsx global>{`
          .bg-grid-lines {
            background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 40px 40px;
          }
  
          @keyframes twinkle {
            0%, 100% { opacity: 0; }
            50% { opacity: 1; }
          }
  
          .animate-twinkle {
            animation: twinkle 2s infinite;
          }
  
          .perspective-1000 {
            perspective: 1000px;
          }
  
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
  
          .backface-hidden {
            backface-visibility: hidden;
          }
  
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}</style>
      </div>
    );
  };
  
  export default FlashCardPage;
  
  