import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUIZ_QUESTIONS } from "./technologiesData";

export default function TechQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const allAnswered = Object.keys(answers).length === totalQuestions;
  const correctCount = QUIZ_QUESTIONS.filter((q, i) => answers[i] === q.correct).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  const handleSubmit = () => {
    if (!allAnswered) return;
    setSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  if (!submitted) {
    return (
      <div className="space-y-5">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Answer all {totalQuestions} scenario-based questions below. Read each situation carefully and choose the most suitable 3D printing technology.
        </p>
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, qi) => (
            <div key={qi} className="space-y-2.5">
              <p className="font-poppins font-semibold text-sm text-foreground leading-relaxed">
                {qi + 1}. {q.q}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => (
                  <button
                    key={oi}
                    onClick={() => setAnswers(a => ({ ...a, [qi]: oi }))}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                      answers[qi] === oi
                        ? "border-pink-500 bg-pink-50 text-pink-800 font-medium"
                        : "border-border/60 bg-muted/20 text-foreground hover:bg-muted/40"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full rounded-xl bg-pink-600 hover:bg-pink-700 text-white"
        >
          Submit Quiz
        </Button>
        {!allAnswered && (
          <p className="text-xs text-center text-muted-foreground">
            {totalQuestions - Object.keys(answers).length} question{totalQuestions - Object.keys(answers).length !== 1 ? "s" : ""} remaining
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Score banner */}
      <div className="rounded-2xl p-6 text-center bg-pink-50 border border-pink-200">
        <div className="flex justify-center mb-2">
          <Trophy size={40} className="text-pink-600" />
        </div>
        <p className="font-poppins font-bold text-2xl text-foreground">
          {correctCount} / {totalQuestions} ({scorePercent}%)
        </p>
        <p className="text-sm mt-1 text-pink-700">
          {correctCount === totalQuestions
            ? "Perfect score! You've mastered 3D printing technologies."
            : `You answered ${correctCount} out of ${totalQuestions} correctly.`}
        </p>
      </div>

      {/* Answer review */}
      <div className="space-y-3">
        <p className="font-poppins font-bold text-sm text-foreground">Review your answers:</p>
        {QUIZ_QUESTIONS.map((q, qi) => {
          const isCorrect = answers[qi] === q.correct;
          return (
            <div key={qi} className={`rounded-xl border p-4 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
              <p className="font-semibold text-xs mb-2 text-foreground leading-relaxed">{qi + 1}. {q.q}</p>
              {q.options.map((opt, oi) => (
                <div key={oi} className={`text-xs px-3 py-1.5 rounded-lg mb-1 ${
                  oi === q.correct
                    ? "bg-green-100 text-green-800 font-semibold"
                    : answers[qi] === oi && !isCorrect
                      ? "bg-red-100 text-red-700 line-through"
                      : "text-muted-foreground"
                }`}>
                  {oi === q.correct ? "✓ " : answers[qi] === oi ? "✗ " : "   "}{opt}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <Button
        onClick={handleRetake}
        variant="outline"
        className="w-full rounded-xl"
      >
        <RotateCcw size={15} /> Retake Quiz
      </Button>
    </div>
  );
}