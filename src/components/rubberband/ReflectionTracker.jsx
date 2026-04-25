import { useState } from "react";
import { CheckCircle2, Save } from "lucide-react";

const QUESTIONS = [
  "What was your car's biggest failure during the competition? Be specific.",
  "Was the failure caused by design, materials, or assembly? How do you know?",
  "If you had 5 extra minutes to fix one thing before another run — what would it be and why?",
  "Look at the winning car for each challenge. What did they do differently from your team?",
  "Which of the five materials had the most impact on performance? Why?",
];

const CAUSE_OPTIONS = ["Design", "Materials", "Assembly", "All three"];
const MATERIAL_OPTIONS = ["Popsicle Sticks", "Metal Pop Rivets", "EVA Foam Discs", "Rubber Bands", "Hot Glue"];

export default function ReflectionTracker() {
  const [answers, setAnswers] = useState(QUESTIONS.map(() => ""));
  const [cause, setCause] = useState("");
  const [material, setMaterial] = useState("");
  const [saved, setSaved] = useState(false);
  const [teamName, setTeamName] = useState("");

  const setAnswer = (i, val) => {
    setSaved(false);
    setAnswers(prev => prev.map((a, idx) => idx === i ? val : a));
  };

  const filledCount = answers.filter(a => a.trim().length > 0).length;
  const progress = Math.round((filledCount / QUESTIONS.length) * 100);

  const handleSave = () => {
    setSaved(true);
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-foreground/80">Do not skip this step — the reflection is where the real learning happens. Answer each question as a team, then save your responses.</p>

      {/* Team name */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground block mb-1">Team Name (optional)</label>
        <input
          type="text"
          value={teamName}
          onChange={e => { setTeamName(e.target.value); setSaved(false); }}
          placeholder="e.g. Team Rocket"
          className="w-full border border-input rounded-lg px-3 py-1.5 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-blue-500 max-w-xs"
        />
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-muted-foreground">Completion</p>
          <p className="text-xs font-bold text-blue-600">{filledCount}/{QUESTIONS.length} answered</p>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {QUESTIONS.map((q, i) => (
          <div key={i} className={`rounded-2xl border overflow-hidden transition-all ${answers[i].trim() ? "border-blue-200 bg-blue-50/40" : "border-border/60 bg-background"}`}>
            <div className="flex items-start gap-3 px-4 pt-4 pb-2">
              <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 ${answers[i].trim() ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}>
                {answers[i].trim() ? <CheckCircle2 size={13} /> : i + 1}
              </span>
              <p className="text-sm font-medium text-foreground leading-snug">{q}</p>
            </div>

            {/* Q2: cause picker */}
            {i === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-1.5">Quick pick (optional):</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {CAUSE_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setCause(opt); setSaved(false); }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${cause === opt ? "bg-blue-600 text-white border-blue-600" : "bg-background text-muted-foreground border-border hover:border-blue-400"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Q5: material picker */}
            {i === 4 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-1.5">Quick pick (optional):</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {MATERIAL_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setMaterial(opt); setSaved(false); }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${material === opt ? "bg-blue-600 text-white border-blue-600" : "bg-background text-muted-foreground border-border hover:border-blue-400"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="px-4 pb-4">
              <textarea
                value={answers[i]}
                onChange={e => setAnswer(i, e.target.value)}
                placeholder="Write your team's answer here..."
                rows={3}
                className="w-full border border-input rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
      >
        {saved ? <><CheckCircle2 size={15} /> Responses Saved!</> : <><Save size={15} /> Save Reflection Responses</>}
      </button>

      {/* Saved summary */}
      {saved && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-600" />
            <p className="font-poppins font-bold text-sm text-green-800">
              {teamName ? `${teamName}'s` : "Your"} Reflection Saved
            </p>
          </div>
          <div className="space-y-3">
            {QUESTIONS.map((q, i) => (
              answers[i].trim() ? (
                <div key={i} className="bg-white rounded-xl border border-green-100 px-4 py-3">
                  <p className="text-xs font-semibold text-green-700 mb-1">Q{i + 1}. {q}</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{answers[i]}</p>
                  {i === 1 && cause && <p className="text-xs text-blue-600 mt-1 font-semibold">Cause identified: {cause}</p>}
                  {i === 4 && material && <p className="text-xs text-blue-600 mt-1 font-semibold">Key material: {material}</p>}
                </div>
              ) : null
            ))}
          </div>
          <p className="text-xs text-green-700 italic">Take a screenshot or copy these responses into your portfolio.</p>
        </div>
      )}
    </div>
  );
}