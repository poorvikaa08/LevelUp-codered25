"use client";

import { useState } from 'react';
import { Zap } from 'lucide-react';

export default function YouTubeSummarizer() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!url) {
      setError("Please enter a YouTube URL");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary(null);

    try {
      const response = await fetch("http://localhost:8000/summarize/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ youtube_url: url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate summary");
      }

      const data = await response.json();
      setSummary(data.summary); // Access the summary directly from the response
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex w-full bg-[#1a1b2e] p-8 m-0 overflow-hidden">
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

      <div className="w-full max-w-lg mx-auto space-y-8 text-center relative z-10">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold animate-pulse">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text font-mono">
              YOUTUBE SUMMARIZER
            </span>
          </h2>

          <div className="text-2xl text-purple-300 font-mono animate-bounce">
            Enter YouTube URL
          </div>

          <div className="space-y-4">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL here"
              className="w-full p-4 border border-purple-500 rounded-lg bg-purple-900/30 text-purple-300 placeholder-purple-400"
            />

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-4 text-purple-900 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg hover:from-purple-500 hover:to-pink-500 font-mono ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Zap className="animate-pulse mr-2" />
                  Generating Summary...
                </span>
              ) : (
                "Generate Summary"
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {summary && (
            <div className="mt-6 p-6 bg-purple-900/30 rounded-lg border border-purple-500">
              <h3 className="text-lg font-semibold text-purple-300 mb-4">Summary</h3>
              <p className="text-purple-200 text-left whitespace-pre-line">{summary}</p>
            </div>
          )}
        </div>
      </div>

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
      `}</style>
    </div>
  );
}