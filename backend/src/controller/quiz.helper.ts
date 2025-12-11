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
        correct = ans.value === q.correctIndex;
        break;
      case "checkbox":
        if (Array.isArray(ans.value) && q.correctIndexes) {
          correct =
            ans.value.length === q.correctIndexes.length &&
            ans.value.every((v) => q.correctIndexes!.includes(v));
        }
        break;
    }

    if (correct) score++;
    return { id: ans.id, correct };
  });

  return { score, total: questions.length, results };
}
