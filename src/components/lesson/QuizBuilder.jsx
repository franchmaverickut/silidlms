import { useState } from "react";
import { Plus, Trash2, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function QuizBuilder({ value, onChange }) {
  let questions = [];
  try {
    questions = value ? JSON.parse(value) : [];
  } catch {
    questions = [];
  }

  const update = (qs) => onChange(JSON.stringify(qs));

  const addQuestion = () => {
    update([...questions, { question: "", options: ["", "", "", ""], correct: 0, explanation: "" }]);
  };

  const updateQuestion = (qIdx, field, val) => {
    const qs = [...questions];
    qs[qIdx] = { ...qs[qIdx], [field]: val };
    update(qs);
  };

  const updateOption = (qIdx, oIdx, val) => {
    const qs = [...questions];
    qs[qIdx].options[oIdx] = val;
    update(qs);
  };

  const removeQuestion = (qIdx) => {
    update(questions.filter((_, i) => i !== qIdx));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground">{questions.length} question{questions.length !== 1 ? "s" : ""}</p>
        <Button size="sm" variant="outline" onClick={addQuestion} className="gap-1.5 text-xs rounded-xl">
          <Plus size={12} /> Add Question
        </Button>
      </div>

      {questions.map((q, qIdx) => (
        <Card key={qIdx} className="p-4 border-border/60 space-y-3 shadow-sm">
          <div className="flex items-start gap-2">
            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{qIdx + 1}</span>
            <Textarea
              value={q.question}
              onChange={e => updateQuestion(qIdx, "question", e.target.value)}
              placeholder="Question text..."
              className="text-sm min-h-[60px] flex-1 rounded-xl"
            />
            <button onClick={() => removeQuestion(qIdx)} className="text-muted-foreground hover:text-destructive mt-1">
              <Trash2 size={14} />
            </button>
          </div>

          <div className="space-y-2 pl-8">
            <p className="text-xs text-muted-foreground font-semibold">Options (click ✓ to mark correct answer)</p>
            {q.options.map((opt, oIdx) => (
              <div key={oIdx} className="flex items-center gap-2">
                <button
                  onClick={() => updateQuestion(qIdx, "correct", oIdx)}
                  className={`flex-shrink-0 transition-colors ${q.correct === oIdx ? "text-green-500" : "text-muted-foreground/30 hover:text-green-400"}`}
                >
                  <CheckCircle size={16} />
                </button>
                <span className="text-xs font-semibold text-muted-foreground w-4">{String.fromCharCode(65 + oIdx)}.</span>
                <Input
                  value={opt}
                  onChange={e => updateOption(qIdx, oIdx, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + oIdx)}`}
                  className="text-sm h-8 rounded-lg flex-1"
                />
              </div>
            ))}
          </div>

          <div className="pl-8">
            <Input
              value={q.explanation || ""}
              onChange={e => updateQuestion(qIdx, "explanation", e.target.value)}
              placeholder="Explanation (shown after answer) — optional"
              className="text-xs h-8 rounded-lg"
            />
          </div>
        </Card>
      ))}

      {questions.length === 0 && (
        <div className="text-center py-6 border border-dashed rounded-xl">
          <p className="text-sm text-muted-foreground">No questions yet. Click "Add Question" to start.</p>
        </div>
      )}
    </div>
  );
}