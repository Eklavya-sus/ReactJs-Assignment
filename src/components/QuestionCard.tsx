import React, { useState } from 'react';
import type { Question } from '../types';
import clsx from 'clsx';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: number | string;
  isRevealed?: boolean;
  onSelectAnswer: (answer: number | string) => void;
}

export function QuestionCard({
  question,
  selectedAnswer,
  isRevealed,
  onSelectAnswer,
}: QuestionCardProps) {
  const [integerAnswer, setIntegerAnswer] = useState('');

  const isCorrect = selectedAnswer !== undefined && 
    selectedAnswer.toString() === question.correctAnswer.toString();

  if (question.type === 'integer') {
    return (
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="number"
              value={integerAnswer}
              onChange={(e) => setIntegerAnswer(e.target.value)}
              className={clsx(
                "w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
                isRevealed && isCorrect && "border-green-500 bg-green-50",
                isRevealed && !isCorrect && "border-red-500 bg-red-50"
              )}
              placeholder="Enter your answer..."
              disabled={isRevealed}
            />
            {isRevealed && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-red-500" />
                    <span className="text-sm text-gray-600">
                      Correct answer: {question.correctAnswer}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
          {!isRevealed && (
            <button
              onClick={() => {
                if (integerAnswer.trim()) {
                  onSelectAnswer(integerAnswer);
                  setIntegerAnswer('');
                }
              }}
              className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit Answer
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="space-y-3">
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isOptionCorrect = index === question.correctAnswer;
          
          return (
            <button
              key={index}
              onClick={() => !isRevealed && onSelectAnswer(index)}
              disabled={isRevealed}
              className={clsx(
                "w-full text-left p-4 rounded-lg transition-colors relative",
                "hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
                isSelected && !isRevealed && "bg-blue-100",
                isRevealed && isOptionCorrect && "bg-green-100 border-green-500",
                isRevealed && isSelected && !isOptionCorrect && "bg-red-100 border-red-500"
              )}
            >
              <div className="flex justify-between items-center">
                <span>{String.fromCharCode(65 + index)}. {option}</span>
                {isRevealed && (
                  <div className="flex items-center gap-2">
                    {isOptionCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {isSelected && !isOptionCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}