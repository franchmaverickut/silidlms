import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, RotateCcw, Award, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUIZ } from "@/data/gettingStartedData";
import { jsPDF } from "jspdf";
import { loadLogoDataUrl } from "@/lib/watermark";

const PASS_PERCENT = 70;

async function downloadCertificate(scorePercent) {
  const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  const logo = await loadLogoDataUrl();
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const W = 297;

  // Faint centered watermark
  doc.setGState(new doc.GState({ opacity: 0.07 }));
  doc.addImage(logo, "PNG", W / 2 - 90, 70, 180, 70);
  doc.setGState(new doc.GState({ opacity: 1 }));

  // Header logo
  doc.addImage(logo, "PNG", W / 2 - 25, 14, 50, 19.5);

  doc.setTextColor(31, 36, 46);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.text("CERTIFICATE OF COMPLETION", W / 2, 58, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("This certifies that", W / 2, 78, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("Maker", W / 2, 94, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(14);
  doc.text("has successfully completed the course", W / 2, 110, { align: "center" });
  doc.setFont("helvetica", "bold");
  doc.text('"Getting Started with Your 3D Printer"', W / 2, 122, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Final Score: ${scorePercent}%     Date: ${date}`, W / 2, 142, { align: "center" });
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("SilidLMS Maker Curriculum  |  Content by LIVRO Systems Inc.", W / 2, 190, { align: "center" });

  doc.save("3D-Printer-Certificate.pdf");
}

export default function GettingStartedQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const total = QUIZ.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total;

  const correctCount = QUIZ.filter((q, i) => answers[i] === q.answer).length;
  const scorePercent = Math.round((correctCount / total) * 100);
  const passed = scorePercent >= PASS_PERCENT;

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="space-y-4">
      {!submitted ? (
        <>
          <div className="space-y-5">
            {QUIZ.map((q, qi) => (
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
                          ? "border-orange-500 bg-orange-50"
                          : "border-border/40 hover:bg-muted/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${qi}`}
                        checked={answers[qi] === oi}
                        onChange={() => setAnswers({ ...answers, [qi]: oi })}
                        className="accent-orange-600"
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
              {answeredCount} of {total} answered
            </span>
            <Button
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className="bg-orange-500 hover:bg-orange-600 rounded-xl"
            >
              Submit Quiz
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div
            className={`rounded-2xl p-6 text-center border ${
              passed ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"
            }`}
          >
            <div className="flex justify-center mb-2">
              {passed ? (
                <Award size={40} className="text-green-600" />
              ) : (
                <Trophy size={40} className="text-orange-500" />
              )}
            </div>
            <p className="font-poppins font-bold text-2xl text-foreground">
              {correctCount} / {total} ({scorePercent}%)
            </p>
            <p className={`text-sm mt-1 ${passed ? "text-green-700" : "text-orange-700"}`}>
              {passed
                ? `Congratulations! You passed with over ${PASS_PERCENT}%.`
                : `You need ${PASS_PERCENT}% to pass. Review the lessons and try again.`}
            </p>
            {passed && (
              <Button
                onClick={() => downloadCertificate(scorePercent)}
                className="mt-4 bg-green-600 hover:bg-green-700 rounded-xl gap-1.5"
              >
                <Download size={16} /> Download Certificate
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {QUIZ.map((q, qi) => {
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
                      <p className="font-poppins font-bold text-sm text-foreground">
                        {qi + 1}. {q.question}
                      </p>
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