export interface Questions {
  id: number;
  type: "text" | "radio" | "checkbox";
  question: string;
  choices?: string[] | number[];

  // grading
  correctIndex?: number; //correctIndex
  correctText?: string; // correct text
  correctIndexes?: number[]; //checkbox
}

export type AnswerValue = string | number | (string | number)[];

export interface Answers {
  id: string | number;
  value: AnswerValue;
}

export interface GradeResult {
  score: number;
  total: number;
  results: { id: number | string; correct: boolean }[];
}

export type AnswerMap = Record<number, AnswerValue>;
