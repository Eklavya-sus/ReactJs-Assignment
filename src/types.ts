export interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'integer';
  options?: string[];
  correctAnswer: number | string;
}

export interface QuizAttempt {
  id: string;
  timestamp: number;
  score: number;
  totalQuestions: number;
  timePerQuestion: number;
  answers: Record<number, number | string>;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, number | string>;
  timeRemaining: number;
  isComplete: boolean;
}