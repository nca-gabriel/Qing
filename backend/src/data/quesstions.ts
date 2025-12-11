import { Questions } from "../utils/types";

export const questions: Questions[] = [
  {
    id: 1,
    type: "text",
    question: "What is the capital of France?",
    correctText: "Paris",
  },
  {
    id: 2,
    type: "radio",
    question: "Which language is primarily used for web development?",
    choices: ["Python", "JavaScript", "C++"],
    correctIndex: 1,
  },
  {
    id: 3,
    type: "checkbox",
    question: "Select the prime numbers",
    choices: [2, 3, 4, 5],
    correctIndexes: [0, 1, 3],
  },
  {
    id: 4,
    type: "text",
    question: "What does HTML stand for?",
    correctText: "HyperText Markup Language",
  },
  {
    id: 5,
    type: "radio",
    question: "Which of these is a front-end framework?",
    choices: ["React", "Express", "Django"],
    correctIndex: 0,
  },
  {
    id: 6,
    type: "checkbox",
    question: "Select the fruits",
    choices: ["Apple", "Carrot", "Banana", "Potato"],
    correctIndexes: [0, 2],
  },
  {
    id: 7,
    type: "text",
    question: "What is 10 divided by 2?",
    correctText: "5",
  },
  {
    id: 8,
    type: "radio",
    question: "Which company developed JavaScript?",
    choices: ["Microsoft", "Netscape", "Google"],
    correctIndex: 1,
  },
];
