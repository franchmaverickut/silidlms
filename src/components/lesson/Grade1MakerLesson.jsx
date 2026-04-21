import { useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import {
  RevealCard, DragDropActivity, Quiz,
  SectionLabel, ReadingBlock, LessonHeader, DoneBanner,
} from "./InteractiveLessonViewer";
import { GRADE1_MAKER_LESSONS } from "./lessonData";
import { GRADE2_MAKER_LESSONS } from "./lessonDataGrade2";
import { GRADE3_MAKER_LESSONS } from "./lessonDataGrade3";

const ALL_LESSONS = [...GRADE1_MAKER_LESSONS, ...GRADE2_MAKER_LESSONS, ...GRADE3_MAKER_LESSONS];

export default function Grade1MakerLesson({ lessonId, enrollment, allLessons, user, onComplete }) {
  const lessonData = useMemo(() =>
    ALL_LESSONS.find(l => l.id === lessonId),
    [lessonId]
  );

  const [done, setDone] = useState(false);

  const handlePass = async () => {
    setDone(true);
    if (onComplete) onComplete();
  };

  if (!lessonData) return null;

  const { accentColor } = lessonData;

  return (
    <div className="max-w-2xl mx-auto pb-12">
      {/* Header */}
      <LessonHeader
        badge={lessonData.badge}
        typeBadge={lessonData.typeBadge}
        title={lessonData.title}
        subtitle={lessonData.subtitle}
        accentColor={accentColor}
      />

      {/* Learn */}
      <SectionLabel accentColor={accentColor}>Learn — read and understand</SectionLabel>
      {lessonData.readings.map((r, i) => (
        <ReadingBlock key={i} svgIcon={r.svgIcon} heading={r.heading} body={r.body} accentColor={accentColor} />
      ))}

      {/* Reveal Cards */}
      <SectionLabel accentColor={accentColor}>{lessonData.revealLabel}</SectionLabel>
      <div className="grid grid-cols-2 gap-4 mb-2">
        {lessonData.revealCards.map((card, i) => (
          <RevealCard
            key={i}
            frontSvg={card.frontSvg}
            name={card.name}
            desc={card.desc}
            accentColor={accentColor}
          />
        ))}
      </div>

      {/* Drag & Drop */}
      <SectionLabel accentColor={accentColor}>{lessonData.dragLabel}</SectionLabel>
      <DragDropActivity
        key={lessonId + "-drag"}
        chips={lessonData.dragChips}
        zones={lessonData.dragZones}
        accentColor={accentColor}
      />

      {/* Quiz */}
      <SectionLabel accentColor={accentColor}>{lessonData.quizLabel}</SectionLabel>
      <Quiz
        key={lessonId + "-quiz"}
        questions={lessonData.quiz}
        accentColor={accentColor}
        onPass={handlePass}
      />

      {/* Done Banner */}
      {done && (
        <DoneBanner lessonNum={lessonData.badge.match(/Lesson (\d+)/)?.[1] || ""} />
      )}
    </div>
  );
}