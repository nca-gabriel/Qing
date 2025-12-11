"use client";

import { useState } from "react";
import { Questions, Answers, GradeResult, AnswerMap } from "@/utils/types";
import axios from "@/utils/axios.client";

interface QuizFormProps {
  questions: Questions[];
}

export default function QuizForm({ questions }: QuizFormProps) {
  const [answers, setAnswers] = useState<AnswerMap>(() => {
    const initial: AnswerMap = {};
    questions.forEach((q) => {
      initial[q.id] = q.type === "checkbox" ? [] : "";
    });
    return initial;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GradeResult | null>(null);

  const handleInputChange = ({ id, value }: Answers) => {
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
      const res = await axios.post<GradeResult>("/grade", {
        answers: payload,
      });
      setResult(res.data);
    } catch {
      setError("Failed to submit quiz");
    } finally {
      setLoading(false);
    }
  };

  // If result exists, show score
  if (result) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">Your Score</h2>
          <p className="text-xl mt-2">
            {result.score} / {result.total}
          </p>
        </div>

        <ul className="space-y-4">
          {result.results.map((r) => (
            <li
              key={r.id}
              className={`flex justify-between items-center p-4 rounded-lg shadow transition ${
                r.correct
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <span>Question {r.id}</span>
              <span className="font-semibold">
                {r.correct ? "✅ Correct" : "❌ Incorrect"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {questions.map((q) => (
        <div
          key={q.id}
          className="p-5 border rounded-xl shadow hover:shadow-lg transition-all bg-white"
        >
          <p className="font-semibold text-lg">{q.question}</p>

          {/* Text Input */}
          {q.type === "text" && (
            <input
              type="text"
              value={answers[q.id] as string}
              onChange={(e) =>
                handleInputChange({ id: q.id, value: e.target.value })
              }
              placeholder="Type your answer..."
              className="mt-3 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
          )}

          {/* Radio Buttons */}
          {q.type === "radio" &&
            q.choices?.map((choice) => (
              <label
                key={choice.toString()}
                className="flex items-center mt-3 cursor-pointer space-x-3"
              >
                <input
                  type="radio"
                  name={q.id.toString()}
                  value={choice}
                  checked={answers[q.id] === choice}
                  onChange={() =>
                    handleInputChange({ id: q.id, value: choice })
                  }
                  className="accent-blue-500 w-5 h-5"
                />
                <span>{choice}</span>
              </label>
            ))}

          {/* Checkbox */}
          {q.type === "checkbox" &&
            q.choices?.map((choice) => {
              const current = answers[q.id] as (string | number)[];
              const checked = current.includes(choice);
              return (
                <label
                  key={choice.toString()}
                  className="flex items-center mt-3 cursor-pointer space-x-3"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      handleInputChange({
                        id: q.id,
                        value: checked
                          ? current.filter((v) => v !== choice)
                          : [...current, choice],
                      })
                    }
                    className="accent-blue-500 w-5 h-5"
                  />
                  <span>{choice}</span>
                </label>
              );
            })}
        </div>
      ))}

      {error && <p className="text-red-600 text-center">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Quiz"}
      </button>
    </div>
  );
}
