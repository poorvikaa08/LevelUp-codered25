"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileIcon, UploadCloud, X } from "lucide-react";

export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [numQuestions, setNumQuestions] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    // Simulate upload progress
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
    accept: ".pdf", // Only accept PDFs
  });

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter((file) => file !== fileToRemove));
    if (files.length === 1) {
      setUploadProgress(0);
    }
  };

  const handleSubmit = async () => {
    if (!numQuestions || files.length === 0) {
      setError("Please upload a file and specify the number of questions");
      return;
    }

    setIsUploading(true);
    setError(null);

    // Prepare form data to send the file and number of questions
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("num_questions", numQuestions.toString());

    try {
      // Send POST request to create-questions endpoint
      const response = await fetch("http://localhost:8000/create-questions/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate questions");
      }

      const data = await response.json();

      // Store the response in localStorage
      localStorage.setItem("questions", JSON.stringify(data.questions));

      // Redirect or display the next steps (e.g., show "Take test" button)
      window.location.href = "/quiz"; // Example redirect
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card className="p-8">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold">Upload your PDF file</h3>
          <p className="mt-1 text-sm text-gray-500">
            {isDragActive
              ? "Drop your file here"
              : "Drag & drop or browse to upload"}
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
              </div>
            ))}
          </div>
        )}
        <div className="flex">
          {/* Number of Questions Input */}
          <div className="mt-6 px-20">
            <label className="text-sm font-semibold" htmlFor="numQuestions">
              Number of Questions
            </label>
            <input
              id="numQuestions"
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
              min="1"
            />
          </div>
        </div>

        {/* Error message */}
        {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

        {/* Submit button */}
        <div className="mt-6 px-20">
          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className={`w-full py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 ${
              isUploading ? "opacity-50" : ""
            }`}
          >
            {isUploading ? "Uploading..." : "Generate Questions"}
          </button>
        </div>
      </Card>
    </div>
  );
}
