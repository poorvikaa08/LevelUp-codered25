'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileIcon, Gamepad2, Upload } from 'lucide-react'

export default function RetroPDFUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0])
      // Simulate upload progress
      setUploadProgress(0)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 500)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf']
    }
  })

  return (
    <div className=" h-screen flex w-full bg-[#1a1b2e] p-8 m-0 overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
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

      <div className="w-full space-y-8 text-center relative z-10">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold animate-pulse">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text font-mono">
              RETRO GAMES
            </span>
          </h2>

          <div className="text-2xl text-purple-300 mt-100font-mono animate-bounce">
            Upload PDF
          </div>

          <div className="mt-12 space-y-4">
            <div {...getRootProps()} className="cursor-pointer">
              <input {...getInputProps()} />
              <div className="relative mx-auto max-w-xl">
                <div className="h-12 bg-purple-900/30 rounded-full border-2 border-purple-500 overflow-hidden hover:bg-purple-900/50 transition-colors">
                  {file ? (
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-purple-300" />
                    </div>
                  )}
                </div>
                <div className="bottom-6 mt-10 mb-10 left-1/2 transform -translate-x-1/2">
                  {/* <span className="text-purple-300 font-mono">
                      {file ? `${uploadProgress}%` : 'UPLOAD PDF'}
                    </span> */}
                </div>
              </div>
            </div>



            <div className="mt-16 p-6 ">
              {file ? (
                <div className="flex items-center justify-center gap-3 text-purple-300 font-mono text-sm">
                  <FileIcon className="w-5 h-5" />
                  <span className="truncate">{file.name}</span>
                </div>
              ) : (
                <div className="text-md text-purple-300 font-mono ">
                  DRAG AND DROP YOUR PDF HERE
                  <br />
                  OR CLICK TO SELECT
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <Gamepad2 className="w-12 h-12 text-purple-400 animate-bounce" />
            </div>
          </div>
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
  )
}

