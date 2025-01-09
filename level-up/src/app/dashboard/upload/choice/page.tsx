'use client';

import React, { useState } from 'react';
import { Zap, FileText } from 'lucide-react';

const GeneratePage = () => {


  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#1A1C2E] animate-twinkle">
      <h1 className="text-3xl font-bold text-purple-200 animate-bounce mb-8">Generate Resources</h1>




      <div className="flex gap-6">
        {/* Generate PDF Button */}
        <a href="/dashboard/upload/pdf">
          <button
            className={`py-3 px-10 text-purple-900 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg hover:from-purple-500 hover:to-pink-500 font-mono ${''
              }`}
          >
            Generate PDF
          </button>
        </a>

        {/* Generate Questions Button */}
        <a href="/dashboard/upload/quiz">
          <button
            className={`py-3 px-6 text-purple-900 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg hover:from-purple-500 hover:to-pink-500 font-mono ${''
              }`}
          >
            Generate Questions
          </button>
        </a>
      </div>

      {/* <footer className="mt-10 text-purple-300 text-sm">
        Powered by <span className="font-semibold text-pink-400">Your App</span>
      </footer> */}
    </div>


  );
};

export default GeneratePage;