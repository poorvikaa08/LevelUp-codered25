'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FileIcon, UploadCloud, X, Gamepad2 } from 'lucide-react'

export default function FileProcessor() {
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles)
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
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'application/pdf': ['.pdf']
    }
  })

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove))
    if (files.length === 1) {
      setUploadProgress(0)
      setProcessingProgress(0)
      setIsProcessing(false)
    }
  }

  const startProcessing = async (file: File) => {
    setIsProcessing(true)
    setProcessingProgress(0)
    
    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          return 100
        }
        return prev + 5
      })
    }, 500)

    // Here you would actually process the PDF
    // const formData = new FormData()
    // formData.append('pdf', file)
    // await fetch('/api/process', { method: 'POST', body: formData })
  }

  if (isProcessing) {
    return (
      <div className="min-h-[500px] w-full max-w-2xl mx-auto flex items-center justify-center">
        <div className="w-full space-y-8 text-center">
          {/* Retro Game Style Processing Screen */}
          <div className="space-y-4 bg-[#1a1b2e] p-8 rounded-lg shadow-lg border-2 border-purple-500">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text pixel-font">
              PDF FESTIVAL
            </h2>
            <div className="text-2xl text-purple-300 pixel-font">Start</div>
            
            <div className="mt-8 space-y-2">
              <div className="text-purple-300 pixel-font">Processing...</div>
              <div className="relative">
                <div className="h-6 w-full bg-purple-900/30 rounded-sm border-2 border-purple-500 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${processingProgress}%` }}
                  />
                </div>
              </div>
              <div className="text-purple-300 pixel-font">{processingProgress}%</div>
            </div>

            <div className="mt-8 p-4 bg-purple-900/30 border-2 border-purple-500 rounded-sm">
              <p className="text-purple-300 pixel-font text-sm">
                ANALYZING YOUR PDF... PLEASE WAIT WHILE WE PROCESS YOUR DOCUMENT
              </p>
            </div>

            <Gamepad2 className="w-12 h-12 mx-auto mt-4 text-purple-400 animate-bounce" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-200 hover:border-primary'
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold">Upload your PDF files</h3>
          <p className="mt-1 text-sm text-gray-500">
            {isDragActive ? 'Drop your files here' : 'Drag & drop or click to upload'}
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-4">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <FileIcon className="h-8 w-8 flex-shrink-0 text-blue-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Progress value={uploadProgress} className="h-1 mt-2" />
                </div>
                <button
                  onClick={() => removeFile(file)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5 text-gray-500" />
                  <span className="sr-only">Remove file</span>
                </button>
                <button
                  onClick={() => startProcessing(file)}
                  className="px-3 py-1 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                >
                  Process
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

