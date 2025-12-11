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

export interface Answers {
  id: string | number;
  value: string | number | number[];
}
