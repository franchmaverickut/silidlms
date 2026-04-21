import { useState, useCallback } from "react";

// ─── Flip Card ──────────────────────────────────────────────────────────────
export function RevealCard({ frontSvg, hint, name, desc, accentColor }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(f => !f)}
      style={{ perspective: 600, cursor: "pointer" }}
      className="w-full"
    >
      <div
        style={{
          transition: "transform 0.45s",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "none",
          position: "relative",
          minHeight: 140,
        }}
      >
        {/* Front */}
        <div
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border-2 bg-white p-4"
          aria-hidden={flipped}
        >
          <div dangerouslySetInnerHTML={{ __html: frontSvg }} />
          <span style={{ color: accentColor }} className="text-xs font-bold tracking-wide opacity-70">
            {hint || "Tap to reveal"}
          </span>
        </div>
        {/* Back */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: accentColor + "15",
            borderColor: accentColor + "50",
          }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-xl border-2 p-4 text-center"
          aria-hidden={!flipped}
        >
          <div className="font-bold text-sm" style={{ color: accentColor }}>{name}</div>
          <div className="text-xs text-gray-600 leading-relaxed">{desc}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Drag-and-Drop ──────────────────────────────────────────────────────────
export function DragDropActivity({ chips, zones, accentColor }) {
  const [bank, setBank] = useState(() => chips.map((c, i) => ({ ...c, uid: `chip-${i}` })));
  const [placed, setPlaced] = useState({}); // zoneIndex → chip
  const [feedback, setFeedback] = useState({}); // zoneIndex → "correct"|"wrong"
  const [selected, setSelected] = useState(null); // uid of selected chip

  const handleChipClick = (uid) => {
    setSelected(prev => prev === uid ? null : uid);
  };

  const handleZoneClick = (zoneIdx) => {
    if (!selected) return;
    const chip = bank.find(c => c.uid === selected);
    if (!chip) return;
    const correct = chip.val === zones[zoneIdx].answer;
    setFeedback(f => ({ ...f, [zoneIdx]: correct ? "correct" : "wrong" }));
    if (correct) {
      setPlaced(p => ({ ...p, [zoneIdx]: { ...chip, correct: true } }));
      setBank(b => b.filter(c => c.uid !== selected));
    } else {
      setTimeout(() => setFeedback(f => { const n = { ...f }; delete n[zoneIdx]; return n; }), 900);
    }
    setSelected(null);
  };

  const reset = () => {
    setBank(chips.map((c, i) => ({ ...c, uid: `chip-${i}` })));
    setPlaced({});
    setFeedback({});
    setSelected(null);
  };

  const allPlaced = Object.keys(placed).length === zones.length && zones.every((_, i) => placed[i]?.correct);

  return (
    <div className="space-y-4">
      {/* Instruction hint */}
      <p className="text-xs text-gray-500 italic">
        {selected ? "Now tap a zone to place it ↓" : "Tap a label to select it, then tap a zone to match →"}
      </p>

      {/* Bank */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-300 min-h-[48px]">
        {bank.map(chip => (
          <button
            key={chip.uid}
            onClick={() => handleChipClick(chip.uid)}
            style={{
              background: selected === chip.uid ? "#fff" : accentColor,
              color: selected === chip.uid ? accentColor : "#fff",
              border: `2px solid ${accentColor}`,
              transform: selected === chip.uid ? "scale(1.08)" : "scale(1)",
              boxShadow: selected === chip.uid ? `0 0 0 3px ${accentColor}44` : "none",
              transition: "all 0.15s",
            }}
            className="px-3 py-1.5 rounded-full text-xs font-bold select-none"
          >
            {chip.label}
          </button>
        ))}
        {bank.length === 0 && !allPlaced && <span className="text-xs text-gray-400 self-center">All chips placed!</span>}
        {allPlaced && (
          <span className="text-xs font-bold self-center" style={{ color: accentColor }}>
            🎉 All correct!
          </span>
        )}
      </div>

      {/* Zones */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {zones.map((zone, i) => {
          const fb = feedback[i];
          const pl = placed[i];
          const isTarget = !!selected && !pl;
          return (
            <button
              key={i}
              onClick={() => handleZoneClick(i)}
              disabled={!!pl}
              className="flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 min-h-[90px] transition-all w-full text-left"
              style={{
                borderColor: fb === "correct" ? "#22c55e" : fb === "wrong" ? "#ef4444" : isTarget ? accentColor : "#e5e7eb",
                background: fb === "correct" ? "#f0fdf4" : fb === "wrong" ? "#fef2f2" : isTarget ? `${accentColor}08` : "#fff",
                cursor: pl ? "default" : selected ? "pointer" : "default",
                transform: isTarget ? "scale(1.03)" : "scale(1)",
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: zone.svgContent }} />
              <div className="text-xs text-gray-500 font-semibold text-center">{zone.label}</div>
              {pl && (
                <div style={{ background: accentColor }} className="px-2 py-0.5 rounded-full text-white text-xs font-bold">
                  ✓ {pl.val}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Reset */}
      {Object.keys(placed).length > 0 && (
        <button onClick={reset} className="text-xs text-gray-400 underline">Reset activity</button>
      )}
    </div>
  );
}

// ─── Quiz ───────────────────────────────────────────────────────────────────
export function Quiz({ questions, accentColor, onPass }) {
  const [answers, setAnswers] = useState({}); // qIdx → { chosen, correct }
  const [passed, setPassed] = useState(false);

  const handleAnswer = (qIdx, optIdx, isCorrect) => {
    if (answers[qIdx] !== undefined) return; // already answered
    setAnswers(a => {
      const next = { ...a, [qIdx]: { chosen: optIdx, correct: isCorrect } };
      // Check completion
      if (Object.keys(next).length === questions.length) {
        const score = Object.values(next).filter(v => v.correct).length;
        if (score >= Math.ceil(questions.length * 0.67)) { // 2/3 = pass
          setPassed(true);
          onPass?.();
        }
      }
      return next;
    });
  };

  const retry = () => { setAnswers({}); setPassed(false); };

  const score = Object.values(answers).filter(v => v.correct).length;
  const allDone = Object.keys(answers).length === questions.length;
  const stars = allDone ? (score === questions.length ? "⭐⭐⭐" : score >= Math.ceil(questions.length * 0.67) ? "⭐⭐" : "⭐") : "";

  return (
    <div className="space-y-4">
      {questions.map((q, qIdx) => {
        const ans = answers[qIdx];
        return (
          <div key={qIdx} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span style={{ background: accentColor }} className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {qIdx + 1}
              </span>
              <span className="font-semibold text-sm text-gray-800">{q.text}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, oIdx) => {
                let bg = "#f9fafb", border = "#e5e7eb", color = "#374151";
                if (ans !== undefined) {
                  if (oIdx === ans.chosen && ans.correct) { bg = "#f0fdf4"; border = "#22c55e"; color = "#166534"; }
                  else if (oIdx === ans.chosen && !ans.correct) { bg = "#fef2f2"; border = "#ef4444"; color = "#991b1b"; }
                  else if (opt.correct && !ans.correct) { bg = "#f0fdf4"; border = "#22c55e"; color = "#166534"; } // highlight correct
                }
                return (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswer(qIdx, oIdx, opt.correct)}
                    disabled={ans !== undefined}
                    className="text-left px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all"
                    style={{ background: bg, borderColor: border, color }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {ans !== undefined && (
              <div className={`mt-2 text-xs font-semibold ${ans.correct ? "text-green-600" : "text-red-600"}`}>
                {ans.correct ? "✓ Correct!" : "✗ Not quite — the correct answer is highlighted in green."}
              </div>
            )}
          </div>
        );
      })}

      {allDone && (
        <div className={`rounded-xl p-5 text-center border-2 ${passed ? "bg-green-50 border-green-300" : "bg-amber-50 border-amber-300"}`}>
          <div className="text-2xl mb-1">{stars}</div>
          <div className="font-bold text-lg">{score} / {questions.length} correct</div>
          <div className="text-sm mt-1 text-gray-600">
            {passed ? "Great job! You passed! 🎉" : "Keep trying — you can do it!"}
          </div>
          {!passed && (
            <button
              onClick={retry}
              style={{ background: accentColor }}
              className="mt-3 px-5 py-2 rounded-xl text-white text-sm font-bold"
            >
              Try again
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Section Label ───────────────────────────────────────────────────────────
export function SectionLabel({ children, accentColor }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <div style={{ background: accentColor }} className="w-1 h-5 rounded-full flex-shrink-0" />
      <span style={{ color: accentColor }} className="text-xs font-black uppercase tracking-widest">
        {children}
      </span>
    </div>
  );
}

// ─── Reading Block ────────────────────────────────────────────────────────────
export function ReadingBlock({ svgIcon, heading, body, accentColor }) {
  return (
    <div className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-4 shadow-sm mb-3">
      <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
        <div dangerouslySetInnerHTML={{ __html: svgIcon }} />
      </div>
      <div>
        <div style={{ color: accentColor }} className="font-black text-sm mb-1">{heading}</div>
        <div className="text-sm text-gray-700 leading-relaxed">{body}</div>
      </div>
    </div>
  );
}

// ─── Lesson Header ────────────────────────────────────────────────────────────
export function LessonHeader({ badge, typeBadge, title, subtitle, accentColor }) {
  return (
    <div
      className="rounded-2xl p-6 mb-6 relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)` }}
    >
      <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 bg-white -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">{badge}</span>
          <span className="px-3 py-1 rounded-full bg-white/30 text-white text-xs font-bold">{typeBadge}</span>
        </div>
        <h1 className="text-white font-black text-2xl leading-tight mb-1">{title}</h1>
        <p className="text-white/80 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

// ─── Done Banner ─────────────────────────────────────────────────────────────
export function DoneBanner({ lessonNum }) {
  return (
    <div className="mt-6 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 p-6 text-center text-white shadow-lg">
      <div className="text-3xl mb-2">🎉</div>
      <h3 className="font-black text-xl">Lesson Complete!</h3>
      <p className="text-white/90 text-sm mt-1">Great work! You finished Lesson {lessonNum}. Ready for the next one?</p>
    </div>
  );
}