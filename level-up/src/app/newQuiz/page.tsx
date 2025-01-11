"use client";

import { useState } from "react";
import IDValidation from "./component/IDValidation";
import Loading from "./component/Loading";
import QuestionList from "./component/QuestionList";

export default function NewQuizPage() {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = (isValid: boolean) => {
    setIsValid(isValid);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 40000); // 40 seconds
  };

  return (
    <div className="p-8">
      {!isValid && !isLoading && <IDValidation onValidate={handleValidation} />}
      {isLoading && <Loading />}
      {isValid && !isLoading && <QuestionList />}
    </div>
  );
}