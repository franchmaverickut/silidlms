import { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHASES = [
  { label: "Import & Navigate", range: [0, 8] },
  { label: "Trace to Vector", range: [8, 16] },
  { label: "Clean Up & Save", range: [16, 25] },
  { label: "Extrude in Tinkercad", range: [25, 33] },
  { label: "Final Check", range: [33, 35] },
];

export default function ModellingStepper({ steps }) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  const phase = PHASES[phaseIdx];
  const phaseSteps = steps.slice(phase.range[0], phase.range[1]);
  const currentStep = phaseSteps[stepIdx];
  const globalStepNum = phase.range[0] + stepIdx + 1;
  const totalSteps = steps.length;

  const isLastInPhase = stepIdx === phaseSteps.length - 1;
  const isFirstInPhase = stepIdx === 0;
  const isLastPhase = phaseIdx === PHASES.length - 1;
  const atStart = phaseIdx === 0 && isFirstInPhase;
  const atEnd = isLastPhase && isLastInPhase;

  const goNext = () => {
    if (isLastInPhase) {
      if (!isLastPhase) { setPhaseIdx(phaseIdx + 1); setStepIdx(0); }
    } else {
      setStepIdx(stepIdx + 1);
    }
  };

  const goPrev = () => {
    if (isFirstInPhase) {
      if (phaseIdx > 0) {
        const prev = PHASES[phaseIdx - 1];
        setPhaseIdx(phaseIdx - 1);
        setStepIdx(prev.range[1] - prev.range[0] - 1);
      }
    } else {
      setStepIdx(stepIdx - 1);
    }
  };

  const selectPhase = (i) => { setPhaseIdx(i); setStepIdx(0); };

  return (
    <div>
      {/* Phase tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PHASES.map((p, i) => (
          <button
            key={i}
            onClick={() => selectPhase(i)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              i === phaseIdx
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span>Step {globalStepNum} of {totalSteps}</span>
          <span>{Math.round((globalStepNum / totalSteps) * 100)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${(globalStepNum / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step card */}
      <div className="rounded-2xl border border-border/60 overflow-hidden shadow-sm bg-card">
        <div className="flex items-center gap-3 px-5 py-3 bg-purple-50 border-b border-purple-100">
          <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{globalStepNum}</span>
          <span className="font-poppins font-bold text-sm text-foreground">{currentStep.title}</span>
        </div>
        <div className="p-5">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            {currentStep.media?.type === "image" && (
              <img
                src={currentStep.media.url}
                alt={currentStep.title}
                className="w-full sm:w-80 max-h-80 object-contain rounded-lg border border-border/40 shadow-sm flex-shrink-0 bg-muted/20"
              />
            )}
            {currentStep.media?.type === "video" && (
              <video
                src={currentStep.media.url}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full sm:w-80 max-h-80 object-contain rounded-lg border border-border/40 shadow-sm flex-shrink-0 bg-muted/20"
              />
            )}
            <p className="text-sm text-muted-foreground leading-relaxed">{currentStep.desc}</p>
          </div>
        </div>
      </div>

      {/* Phase dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {phaseSteps.map((_, i) => (
          <button
            key={i}
            onClick={() => setStepIdx(i)}
            className={`h-2 rounded-full transition-all ${
              i === stepIdx ? "w-6 bg-purple-600" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-4">
        <Button variant="outline" size="sm" onClick={goPrev} disabled={atStart} className="rounded-xl gap-1.5">
          <ChevronLeft size={16} /> Previous
        </Button>
        <span className="text-xs font-medium text-muted-foreground hidden sm:block">{phase.label}</span>
        {atEnd ? (
          <Button size="sm" disabled className="rounded-xl gap-1.5 bg-purple-600 hover:bg-purple-700">
            <Check size={16} /> Done
          </Button>
        ) : (
          <Button size="sm" onClick={goNext} className="rounded-xl gap-1.5 bg-purple-600 hover:bg-purple-700">
            Next <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}