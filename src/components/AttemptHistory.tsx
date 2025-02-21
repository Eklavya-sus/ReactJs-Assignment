import React from 'react';
import { History } from 'lucide-react';
import type { QuizAttempt } from '../types';

interface AttemptHistoryProps {
  attempts: QuizAttempt[];
}

export function AttemptHistory({ attempts }: AttemptHistoryProps) {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5" />
        <h2 className="text-xl font-semibold">Previous Attempts</h2>
      </div>
      <div className="space-y-3">
        {attempts.map((attempt) => (
          <div
            key={attempt.id}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">
                  Score: {attempt.score}/{attempt.totalQuestions}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(attempt.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}