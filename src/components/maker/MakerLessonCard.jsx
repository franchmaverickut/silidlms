import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Clock, Layers, ChevronRight, Cpu, Printer, Bot, Code2, Zap, Palette, BookOpen, Pencil } from "lucide-react";

const skillIcons = {
  "3D Printing": Printer,
  "Robotics": Cpu,
  "Prompt Engineering": Bot,
  "Coding": Code2,
  "Electronics": Zap,
  "Digital Creativity": Palette,
  "Other": BookOpen,
};

const difficultyColors = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
};

const skillColors = {
  "3D Printing": "bg-orange-100 text-orange-700",
  "Robotics": "bg-blue-100 text-blue-700",
  "Prompt Engineering": "bg-purple-100 text-purple-700",
  "Coding": "bg-cyan-100 text-cyan-700",
  "Electronics": "bg-yellow-100 text-yellow-700",
  "Digital Creativity": "bg-pink-100 text-pink-700",
  "Other": "bg-gray-100 text-gray-700",
};

export default function MakerLessonCard({ lesson, progress, isTeacher }) {
  const SkillIcon = skillIcons[lesson.skill_area] || BookOpen;
  const skillColor = skillColors[lesson.skill_area] || skillColors["Other"];
  const diffColor = difficultyColors[lesson.difficulty] || difficultyColors["Beginner"];

  return (
    <Link to={`/maker/${lesson.id}`}>
      <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
        {/* Thumbnail */}
        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/15 to-orange-200/30">
          {lesson.thumbnail_url || lesson.hero_image_url ? (
            <img
              src={lesson.thumbnail_url || lesson.hero_image_url}
              alt={lesson.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <SkillIcon className="w-14 h-14 text-primary/20" />
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${skillColor}`}>
              {lesson.skill_area}
            </span>
          </div>
          {lesson.difficulty && (
            <div className="absolute top-3 right-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${diffColor}`}>
                {lesson.difficulty}
              </span>
            </div>
          )}
          {progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/10">
              <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-poppins font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {lesson.title}
          </h3>
          {lesson.description && (
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{lesson.description}</p>
          )}

          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            {lesson.estimated_minutes && (
              <span className="flex items-center gap-1">
                <Clock size={12} /> {lesson.estimated_minutes} min
              </span>
            )}
            {lesson.steps?.length > 0 && (
              <span className="flex items-center gap-1">
                <Layers size={12} /> {lesson.steps.length} steps
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-3">
            {progress !== undefined ? (
              <span className="text-xs text-primary font-semibold">{progress}% complete</span>
            ) : (
              <span className="text-xs text-muted-foreground">
                {lesson.status === "published" ? "Ready to build" : lesson.status}
              </span>
            )}
            {isTeacher ? (
              <Link
                to={`/maker/${lesson.id}/edit`}
                onClick={e => e.stopPropagation()}
                className="text-muted-foreground hover:text-primary text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Pencil size={12} /> Edit
              </Link>
            ) : (
              <span className="text-primary text-xs font-semibold flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                Start Build <ChevronRight size={13} />
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}