import React, { useEffect } from 'react';
import { Timer } from 'lucide-react';

interface QuizTimerProps {
  timeRemaining: number;
  onTimeUp: () => void;
}

export function QuizTimer({ timeRemaining, onTimeUp }: QuizTimerProps) {
  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeUp();
    }
  }, [timeRemaining, onTimeUp]);

  return (
    <div className="flex items-center gap-2 text-lg font-semibold">
      <Timer className="w-6 h-6" />
      <span>{Math.ceil(timeRemaining / 1000)}s</span>
    </div>
  );
}