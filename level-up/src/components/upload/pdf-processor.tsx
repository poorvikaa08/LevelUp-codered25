'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { FileIcon, UploadCloud, X, Gamepad2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PDFProcessor() {
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [showModernUI, setShowModernUI] = useState(false)

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
      setShowModernUI(false)
    }
  }

  const startProcessing = async (file: File) => {
    setIsProcessing(true)
    setProcessingProgress(0)
    
    // Simulate initial processing with retro UI
    const initialInterval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 30) {
          clearInterval(initialInterval)
          setShowModernUI(true) // Switch to modern UI at 30%
          return 30
        }
        return prev + 5
      })
    }, 500)

    // Continue processing with modern UI
    setTimeout(() => {
      const modernInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(modernInterval)
            setIsProcessing(false)
            setShowModernUI(false)
            return 100
          }
          return prev + 5
        })
      }, 500)
    }, 3000)
  }

  // Retro Game Style UI
  if (isProcessing && !showModernUI) {
    return (
      <div className="min-h-[500px] w-full max-w-2xl mx-auto flex items-center justify-center bg-[#1a1b2e] p-8">
        <div className="w-full space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold animate-pulse">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text font-mono">
                PDF FESTIVAL
              </span>
            </h2>
            
            <div className="text-2xl text-purple-300 font-mono animate-bounce">
              Start
            </div>
            
            <div className="mt-12 space-y-4">
              <div className="text-purple-300 font-mono tracking-wider">
                Loading...
              </div>
              
              <div className="relative mx-auto max-w-md">
                <div className="h-8 bg-purple-900/30 rounded border-2 border-purple-500 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${processingProgress}%` }}
                  />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <span className="text-purple-300 font-mono">{processingProgress}%</span>
                </div>
              </div>

              <div className="mt-16 p-6 bg-purple-900/30 border-2 border-purple-500 rounded">
                <p className="text-purple-300 font-mono text-sm leading-relaxed">
                  {files[0]?.name || 'DOCUMENT'} IS LOADING...
                  <br />
                  PLEASE WAIT WHILE WE PROCESS YOUR PDF
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <Gamepad2 className="w-12 h-12 text-purple-400 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Modern UI for both initial state and processing after 30%
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="p-8">
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
            isDragActive ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary",
            isProcessing && "pointer-events-none opacity-50"
          )}
        >
          <input {...getInputProps()} />
          <UploadCloud className={cn(
            "mx-auto h-12 w-12",
            isDragActive ? "text-primary" : "text-muted-foreground"
          )} />
          <h3 className="mt-2 text-sm font-semibold">
            {isDragActive ? "Drop your files here" : "Upload your PDF files"}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Drag & drop or click to upload
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-6 space-y-4">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
              >
                <FileIcon className="h-8 w-8 flex-shrink-0 text-primary" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Progress 
                    value={showModernUI ? processingProgress : uploadProgress} 
                    className="h-1 mt-2" 
                  />
                  {showModernUI && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Processing: {processingProgress}%
                    </p>
                  )}
                </div>
                {!isProcessing && (
                  <button
                    onClick={() => removeFile(file)}
                    className="p-1 hover:bg-muted rounded"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                    <span className="sr-only">Remove file</span>
                  </button>
                )}
                {!isProcessing && uploadProgress === 100 && (
                  <button
                    onClick={() => startProcessing(file)}
                    className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Process
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}

