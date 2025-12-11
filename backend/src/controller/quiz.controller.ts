import { Context } from "hono";
import { questions } from "../data/quesstions";
import { Answers } from "../utils/types";
import { gradeAnswers } from "../helper/quiz.helper";
import { shuffleQuestions } from "../utils/shuffle";

export const getQuiz = (c: Context) => {
  // remove the answers before sending
  const safeQuestions = questions.map(
    ({ correctIndex, correctText, correctIndexes, choices, ...rest }) => {
      const shuffledChoices = choices
        ? shuffleQuestions<string | number>(choices)
        : undefined;

      return { ...rest, choices: shuffledChoices };
    }
  );

  const shuffledQuestions = shuffleQuestions(safeQuestions);
  return c.json(shuffledQuestions);
};

export const gradeQuiz = async (c: Context) => {
  try {
    const body = (await c.req.json()) as {
      answers: Answers[];
    };

    if (!body.answers) {
      return c.json({ error: "Invalid Payload" }, 400);
    }

    const results = gradeAnswers(questions, body.answers);
    return c.json(results);
  } catch (error) {
    return c.json({ error: "Invalid request" }, 400);
  }
};
