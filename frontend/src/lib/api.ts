import axios from "@/utils/axios.server";
import { Answers, Questions, GradeResult } from "@/utils/types";

export const fetchQuiz = async (): Promise<Questions[]> => {
  const res = await axios.get<Questions[]>("/quiz");
  return res.data;
};

export const submitQuiz = async (answers: Answers[]): Promise<GradeResult> => {
  const res = await axios.post<GradeResult>("/grade", { answers });
  return res.data;
};
