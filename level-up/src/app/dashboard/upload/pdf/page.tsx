"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FileIcon, UploadCloud, X } from 'lucide-react';

export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [numQuestions, setNumQuestions] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: ".pdf",
  });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    if (files.length === 1) {
      setUploadProgress(0);
    }
  };

  const handleSubmit = async () => {
    if (!numQuestions || files.length === 0) {
      setError("Please upload a file");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("num_questions", numQuestions.toString());

    try {
      const response = await fetch("http://localhost:8000/create-questions/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate questions");
      }

      const data = await response.json();
      localStorage.setItem("questions", JSON.stringify(data.questions));
      window.location.href = "/quiz";
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
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
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 bg-grid-lines opacity-20" />

      <div className="w-full max-w-md mx-auto space-y-8 text-center relative z-10">
        <div className="space-y-8">
          <div className="text-2xl text-purple-300 font-mono animate-bounce">
            Upload PDF
          </div>

          <div
            {...getRootProps()}
            className={`cursor-pointer border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragActive
              ? "border-purple-400 bg-purple-400/10"
              : "border-purple-200 hover:border-purple-400"}`}
          >
            <input {...getInputProps()} />
            <UploadCloud className="mx-auto h-12 w-12 text-purple-400" />
            <h3 className="mt-2 text-sm font-semibold text-purple-300">Upload your PDF file</h3>
            <p className="mt-1 text-sm text-purple-200">
              {isDragActive ? "Drop your file here" : "Drag & drop or click to upload"}
            </p>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-4">
              {files.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center gap-4 p-4 bg-purple-900/30 rounded-lg border border-purple-500"
                >
                  <FileIcon className="h-8 w-8 flex-shrink-0 text-purple-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-purple-300">{file.name}</p>
                    <p className="text-sm text-purple-200">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Progress value={uploadProgress} className="h-1 mt-2" />
                  </div>
                  <button
                    onClick={() => removeFile(file)}
                    className="p-1 hover:bg-purple-800/50 rounded"
                  >
                    <X className="h-5 w-5 text-purple-400" />
                    <span className="sr-only">Remove file</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className={`py-2 px-4 mt-10 text-purple-900 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg hover:opacity-80 ${isUploading ? "opacity-50" : ""}`}
          >
            {isUploading ? "Uploading..." : "Download PDF"}
          </button>

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
