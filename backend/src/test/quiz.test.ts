import { gradeAnswers } from "../helper/quiz.helper";
import { questions } from "../data/quesstions";

describe("grading logic", () => {
  it("calculate correct score", () => {
    const answers = [
      { id: 1, value: "Paris" },
      { id: 2, value: "JavaScript" },
      { id: 3, value: [2, 3, 5] },
    ];
    const { score, total, results } = gradeAnswers(questions, answers);

    expect(score).toBe(3);
    expect(total).toBe(questions.length);
    expect(results.length).toBe(answers.length);
    expect(results[0].correct).toBe(true);
    expect(results[1].correct).toBe(true);
    expect(results[2].correct).toBe(true);
  });

  it("marks incorrect answers correctly", () => {
    const answers = [
      { id: 1, value: "London" },
      { id: 2, value: 0 },
      { id: 3, value: [0, 2] },
    ];
    const { score, results } = gradeAnswers(questions, answers);

    expect(score).toBe(0);
    expect(results.every((r) => r.correct === false)).toBe(true);
  });
});
