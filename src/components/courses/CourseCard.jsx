import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, BookOpen } from "lucide-react";

const skillColors = {
  "3D Printing": "bg-orange-100 text-orange-700",
  "Prompt Engineering": "bg-purple-100 text-purple-700",
  "AI Literacy": "bg-blue-100 text-blue-700",
  "Robotics": "bg-green-100 text-green-700",
  "Coding": "bg-cyan-100 text-cyan-700",
  "Digital Creativity": "bg-pink-100 text-pink-700",
  "Other": "bg-gray-100 text-gray-700",
};

export default function CourseCard({ course, progress, showProgress = false }) {
  const colorClass = skillColors[course.skill_area] || skillColors["Other"];

  return (
    <Link to={`/courses/${course.id}`}>
      <Card className="overflow-hidden border-border/60 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group">
        {/* Thumbnail */}
        <div className="relative h-44 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
          {course.thumbnail_url ? (
            <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-primary/30" />
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
              {course.skill_area}
            </span>
          </div>
          {course.difficulty && (
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-foreground">
                {course.difficulty}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-poppins font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          {course.description && (
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{course.description}</p>
          )}

          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            {course.duration_hours && (
              <span className="flex items-center gap-1">
                <Clock size={12} /> {course.duration_hours}h
              </span>
            )}
            {course.total_lessons > 0 && (
              <span className="flex items-center gap-1">
                <BookOpen size={12} /> {course.total_lessons} lessons
              </span>
            )}
            {course.enrolled_count > 0 && (
              <span className="flex items-center gap-1">
                <Users size={12} /> {course.enrolled_count}
              </span>
            )}
          </div>

          {showProgress && progress !== undefined && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground font-medium">Progress</span>
                <span className="text-primary font-semibold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}

          {course.grade_levels?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {course.grade_levels.slice(0, 3).map(g => (
                <span key={g} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">{g}</span>
              ))}
              {course.grade_levels.length > 3 && (
                <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">+{course.grade_levels.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}