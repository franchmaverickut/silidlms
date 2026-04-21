import { useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import {
  RevealCard, DragDropActivity, Quiz,
  SectionLabel, ReadingBlock, LessonHeader, DoneBanner,
  CalloutBlock, SketchComponentsGrid,
} from "./InteractiveLessonViewer";
import { GRADE1_MAKER_LESSONS } from "./lessonData";
import { GRADE2_MAKER_LESSONS } from "./lessonDataGrade2";
import { GRADE3_MAKER_LESSONS } from "./lessonDataGrade3";
import { GRADE4_MAKER_LESSONS } from "./lessonDataGrade4";

const ALL_LESSONS = [...GRADE1_MAKER_LESSONS, ...GRADE2_MAKER_LESSONS, ...GRADE3_MAKER_LESSONS, ...GRADE4_MAKER_LESSONS];

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

      {/* Hero Banner Image */}
      {lessonData.heroBannerImage && (
        <div className="relative rounded-2xl overflow-hidden mb-2">
          <img src={lessonData.heroBannerImage} alt={lessonData.title} className="w-full h-52 object-cover" loading="lazy" />
          {lessonData.heroBannerCaption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-4 py-2 text-center">{lessonData.heroBannerCaption}</div>
          )}
        </div>
      )}

      {/* Learn */}
      <SectionLabel accentColor={accentColor}>Learn — read and understand</SectionLabel>
      {lessonData.readings.map((r, i) => (
        <ReadingBlock key={i} svgIcon={r.svgIcon} heading={r.heading} body={r.body} accentColor={accentColor} emphasis={r.emphasis} vocab={r.vocab} image={r.image} />
      ))}

      {/* Callouts */}
      {lessonData.callouts?.map((c, i) => (
        <CalloutBlock key={i} type={c.type} icon={c.icon} title={c.title} text={c.text} accentColor={accentColor} />
      ))}

      {/* Sketch Components */}
      {lessonData.sketchComponents && (
        <>
          <SectionLabel accentColor={accentColor}>Sketch components — label each of these in your sketches</SectionLabel>
          <SketchComponentsGrid components={lessonData.sketchComponents} accentColor={accentColor} />
        </>
      )}

      {/* Reveal Cards */}
      <SectionLabel accentColor={accentColor}>{lessonData.revealLabel}</SectionLabel>
      <div className="grid grid-cols-2 gap-4 mb-2">
        {lessonData.revealCards.map((card, i) => (
          <RevealCard
            key={i}
            frontSvg={card.frontSvg}
            name={card.name}
            desc={card.desc}
            detail={card.detail}
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