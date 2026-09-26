import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUIZ_QUESTIONS } from "./tutorialsData";

export default function CourseQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  const correctCount = QUIZ_QUESTIONS.filter((q, i) => answers[i] === q.answer).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);

  const handleSubmit = () => {
    if (allAnswered) setSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-4">
      {!submitted ? (
        <>
          <div className="space-y-5">
            {QUIZ_QUESTIONS.map((q, qi) => (
              <div key={qi} className="rounded-xl border border-border/40 p-4">
                <p className="font-poppins font-bold text-sm text-foreground mb-3">
                  {qi + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => (
                    <label
                      key={oi}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border cursor-pointer transition-colors ${
                        answers[qi] === oi
                          ? "border-violet-500 bg-violet-50"
                          : "border-border/40 hover:bg-muted/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${qi}`}
                        checked={answers[qi] === oi}
                        onChange={() => setAnswers({ ...answers, [qi]: oi })}
                        className="accent-violet-600"
                      />
                      <span className="text-sm text-foreground">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {answeredCount} of {totalQuestions} answered
            </span>
            <Button onClick={handleSubmit} disabled={!allAnswered} className="bg-violet-600 hover:bg-violet-700 rounded-xl">
              Submit Quiz
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          {/* Score banner */}
          <div className="rounded-2xl p-6 text-center bg-violet-50 border border-violet-200">
            <div className="flex justify-center mb-2">
              <Trophy size={40} className="text-violet-600" />
            </div>
            <p className="font-poppins font-bold text-2xl text-foreground">
              {correctCount} / {totalQuestions} ({scorePercent}%)
            </p>
            <p className="text-sm mt-1 text-violet-700">
              {correctCount === totalQuestions
                ? "Perfect score! You've mastered the fundamentals."
                : `You answered ${correctCount} out of ${totalQuestions} correctly.`}
            </p>
          </div>

          {/* Review answers */}
          <div className="space-y-3">
            {QUIZ_QUESTIONS.map((q, qi) => {
              const userAnswer = answers[qi];
              const isCorrect = userAnswer === q.answer;
              return (
                <div key={qi} className="rounded-xl border border-border/40 p-4">
                  <div className="flex items-start gap-2.5">
                    {isCorrect ? (
                      <CheckCircle2 size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <p className="font-poppins font-bold text-sm text-foreground">{qi + 1}. {q.question}</p>
                      <p className="text-sm text-green-700">
                        <span className="font-semibold">Correct:</span> {q.options[q.answer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-red-600">
                          <span className="font-semibold">Your answer:</span> {q.options[userAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={handleRetake} className="rounded-xl gap-1.5">
              <RotateCcw size={16} /> Retake Quiz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}