import { Questions, Answers } from "../utils/types";

export function gradeAnswers(questions: Questions[], answers: Answers[]) {
  let score = 0;

  const results = answers.map((ans) => {
    const q = questions.find((q) => q.id === ans.id);
    if (!q) return { id: ans.id, correct: false };

    let correct = false;

    switch (q.type) {
      case "text":
        correct = ans.value === q.correctText;
        break;
      case "radio":
        // Compare selected value with the correct choice
        if (Array.isArray(q.choices) && typeof q.correctIndex === "number") {
          correct = ans.value === q.choices[q.correctIndex];
        }
        break;
      case "checkbox":
        if (
          Array.isArray(ans.value) &&
          Array.isArray(q.choices) &&
          q.correctIndexes
        ) {
          const correctValues = q.correctIndexes.map((i) => q.choices![i]);
          correct =
            ans.value.length === correctValues.length &&
            ans.value.every((v) => correctValues.includes(v));
        }
        break;
    }

    if (correct) score++;
    return { id: ans.id, correct };
  });

  return { score, total: questions.length, results };
}
