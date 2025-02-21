import React, { useState, useEffect } from 'react';
import { questions } from './data/questions';
import { QuestionCard } from './components/QuestionCard';
import { QuizTimer } from './components/QuizTimer';
import { ScoreBoard } from './components/ScoreBoard';
import { AttemptHistory } from './components/AttemptHistory';
import { saveAttempt, getAttempts } from './utils/db';
import type { QuizState, QuizAttempt } from './types';

const TIME_PER_QUESTION = 30000; // 30 seconds

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    timeRemaining: TIME_PER_QUESTION,
    isComplete: false,
  });
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    loadAttempts();
  }, []);

  useEffect(() => {
    if (quizState.isComplete) return;

    const timer = setInterval(() => {
      setQuizState(prev => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1000),
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.isComplete]);

  async function loadAttempts() {
    const savedAttempts = await getAttempts();
    setAttempts(savedAttempts);
  }

  function handleAnswerSelect(answer: number | string) {
    if (quizState.isComplete) return;

    setQuizState(prev => ({
      ...prev,
      answers: { ...prev.answers, [questions[prev.currentQuestionIndex].id]: answer },
    }));
    setShowFeedback(true);
  }

  function handleNextQuestion() {
    const nextIndex = quizState.currentQuestionIndex + 1;
    setShowFeedback(false);
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: nextIndex,
      timeRemaining: TIME_PER_QUESTION,
      isComplete: nextIndex === questions.length,
    }));
  }

  function handleTimeUp() {
    if (quizState.isComplete) return;
    handleNextQuestion();
  }

  async function handleQuizComplete() {
    const score = Object.entries(quizState.answers).reduce((acc, [questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (!question) return acc;
      
      if (question.type === 'integer') {
        return acc + (answer === question.correctAnswer ? 1 : 0);
      } else {
        return acc + (answer === question.correctAnswer ? 1 : 0);
      }
    }, 0);

    const attempt: QuizAttempt = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      score,
      totalQuestions: questions.length,
      timePerQuestion: TIME_PER_QUESTION,
      answers: quizState.answers,
    };

    await saveAttempt(attempt);
    setCurrentAttempt(attempt);
    await loadAttempts();
  }

  function handleRetry() {
    setQuizState({
      currentQuestionIndex: 0,
      answers: {},
      timeRemaining: TIME_PER_QUESTION,
      isComplete: false,
    });
    setCurrentAttempt(null);
    setShowFeedback(false);
  }

  useEffect(() => {
    if (quizState.isComplete) {
      handleQuizComplete();
    }
  }, [quizState.isComplete]);

  const currentQuestion = questions[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Interactive Quiz</h1>
        
        <div className="flex flex-col items-center gap-8">
          {!quizState.isComplete ? (
            <>
              <div className="w-full flex justify-center mb-4">
                <QuizTimer
                  timeRemaining={quizState.timeRemaining}
                  onTimeUp={handleTimeUp}
                />
              </div>
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={quizState.answers[currentQuestion.id]}
                onSelectAnswer={handleAnswerSelect}
                isRevealed={showFeedback}
              />
              <div className="flex flex-col items-center gap-4">
                <div className="text-center text-gray-600">
                  Question {quizState.currentQuestionIndex + 1} of {questions.length}
                </div>
                {showFeedback && (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Next Question
                  </button>
                )}
              </div>
            </>
          ) : currentAttempt ? (
            <ScoreBoard
              attempt={currentAttempt}
              onRetry={handleRetry}
            />
          ) : null}

          {attempts.length > 0 && (
            <AttemptHistory attempts={attempts} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;