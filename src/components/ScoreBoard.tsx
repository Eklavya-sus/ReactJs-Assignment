import React from 'react';
import { Trophy } from 'lucide-react';
import type { QuizAttempt } from '../types';

interface ScoreBoardProps {
  attempt: QuizAttempt;
  onRetry: () => void;
}

export function ScoreBoard({ attempt, onRetry }: ScoreBoardProps) {
  const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
      <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <div className="text-4xl font-bold text-blue-600 mb-4">
        {percentage}%
      </div>
      <p className="text-gray-600 mb-6">
        You got {attempt.score} out of {attempt.totalQuestions} questions correct
      </p>
      <button
        onClick={onRetry}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}