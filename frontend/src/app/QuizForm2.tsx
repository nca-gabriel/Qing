"use client";

import { useState } from "react";
import { Questions, Answers, GradeResult } from "@/utils/types";
import axios from "@/utils/axios.client";

export default function QuizForm({ questions }: { questions: Questions[] }) {
  const [answers, setAnswers] = useState<
    Record<string, string | number | number[]>
  >(() => {
    const initial: Record<string, string | number | number[]> = {};
    questions.forEach((q) => {
      initial[q.id] = q.type === "checkbox" ? [] : "";
    });
    return initial;
  });
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle input
  const handleChange = (id: number, value: string | number | number[]) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  // Submit quiz
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload: Answers[] = Object.entries(answers).map(([id, value]) => ({
        id: Number(id),
        value,
      }));
      const res = await axios.post<GradeResult>("/api/grade", {
        answers: payload,
      });
      setResult(res.data);
    } catch {
      setError("Failed to submit quiz");
    } finally {
      setLoading(false);
    }
  };

  // Result view
  if (result) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Score: {result.score}/{result.total}
        </h2>
        <ul>
          {result.results.map((r) => (
            <li
              key={r.id}
              className={r.correct ? "text-green-600" : "text-red-600"}
            >
              Question {r.id}: {r.correct ? "Correct" : "Incorrect"}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Quiz form
  return (
    <div className="space-y-6">
      {questions.map((q) => (
        <div key={q.id} className="border p-4 rounded shadow">
          <p className="font-semibold">{q.question}</p>

          {/* Text */}
          {q.type === "text" && (
            <input
              type="text"
              value={(answers[q.id] as string) || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
              className="border p-2 w-full mt-2 rounded"
            />
          )}

          {/* Radio */}
          {q.type === "radio" &&
            q.choices?.map((choice, idx) => (
              <label key={idx} className="block mt-2">
                <input
                  type="radio"
                  name={q.id.toString()}
                  value={choice}
                  checked={answers[q.id] === choice}
                  onChange={() => handleChange(q.id, choice)}
                  className="mr-2"
                />
                {choice}
              </label>
            ))}

          {/* Checkbox */}
          {q.type === "checkbox" &&
            q.choices?.map((choice, idx) => {
              const current = (answers[q.id] as number[]) || [];
              const checked = current.includes(idx);
              return (
                <label key={idx} className="block mt-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      handleChange(
                        q.id,
                        checked
                          ? current.filter((i) => i !== idx)
                          : [...current, idx]
                      )
                    }
                    className="mr-2"
                  />
                  {choice}
                </label>
              );
            })}
        </div>
      ))}

      {error && <p className="text-red-600">{error}</p>}

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
