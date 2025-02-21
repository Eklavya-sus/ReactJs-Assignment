export const questions = [
  {
    id: 1,
    text: "Which planet is closest to the Sun?",
    type: "multiple-choice" as const,
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: 1 // B. Mercury
  },
  {
    id: 2,
    text: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    type: "multiple-choice" as const,
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: 1 // B. Queue
  },
  {
    id: 3,
    text: "Which of the following is primarily used for structuring web pages?",
    type: "multiple-choice" as const,
    options: ["Python", "Java", "HTML", "C++"],
    correctAnswer: 2 // C. HTML
  },
  {
    id: 4,
    text: "Which chemical symbol stands for Gold?",
    type: "multiple-choice" as const,
    options: ["Au", "Gd", "Ag", "Pt"],
    correctAnswer: 0 // A. Au
  },
  {
    id: 5,
    text: "Which of these processes is not typically involved in refining petroleum?",
    type: "multiple-choice" as const,
    options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
    correctAnswer: 3 // D. Filtration
  },
  {
    id: 6,
    text: "What is the value of 12 + 28?",
    type: "integer" as const,
    correctAnswer: "40"
  },
  {
    id: 7,
    text: "How many states are there in the United States?",
    type: "integer" as const,
    correctAnswer: "50"
  },
  {
    id: 8,
    text: "In which year was the Declaration of Independence signed?",
    type: "integer" as const,
    correctAnswer: "1776"
  },
  {
    id: 9,
    text: "What is the value of pi rounded to the nearest integer?",
    type: "integer" as const,
    correctAnswer: "3"
  },
  {
    id: 10,
    text: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    type: "integer" as const,
    correctAnswer: "120"
  }
];