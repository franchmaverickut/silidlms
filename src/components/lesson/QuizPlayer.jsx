import { useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function QuizPlayer({ quizData }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  let questions = [];
  try {
    questions = typeof quizData === "string" ? JSON.parse(quizData) : quizData;
    if (!Array.isArray(questions)) questions = [];
  } catch {
    return <p className="text-sm text-muted-foreground italic">Quiz data is invalid.</p>;
  }

  if (!questions.length) return null;

  const handleSelect = (qIdx, optIdx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++;
    });
    setScore(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const allAnswered = questions.every((_, i) => answers[i] !== undefined);

  return (
    <Card className="p-6 border-border/60 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-poppins font-bold text-base text-foreground">Knowledge Check</h3>
        {submitted && (
          <span className={`text-sm font-bold px-3 py-1 rounded-full ${score === questions.length ? "bg-green-100 text-green-700" : score >= questions.length / 2 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
            {score}/{questions.length} correct
          </span>
        )}
      </div>

      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const userAnswer = answers[qIdx];
          const isCorrect = userAnswer === q.correct;
          return (
            <div key={qIdx} className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                <span className="text-primary mr-2">{qIdx + 1}.</span>{q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  let style = "border-border/60 hover:border-primary/40 hover:bg-primary/5";
                  if (submitted) {
                    if (oIdx === q.correct) style = "border-green-400 bg-green-50 text-green-800";
                    else if (oIdx === userAnswer && !isCorrect) style = "border-red-400 bg-red-50 text-red-800";
                    else style = "border-border/40 opacity-50";
                  } else if (userAnswer === oIdx) {
                    style = "border-primary bg-primary/10";
                  }
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(qIdx, oIdx)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${style}`}
                    >
                      <span className="font-semibold mr-2">{String.fromCharCode(65 + oIdx)}.</span>{opt}
                    </button>
                  );
                })}
              </div>
              {submitted && q.explanation && (
                <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2">
                  💡 {q.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 pt-2">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={!allAnswered} className="bg-primary text-white rounded-xl">
            Submit Answers
          </Button>
        ) : (
          <Button onClick={handleReset} variant="outline" className="rounded-xl gap-2">
            <RotateCcw size={14} /> Retake Quiz
          </Button>
        )}
      </div>
    </Card>
  );
}