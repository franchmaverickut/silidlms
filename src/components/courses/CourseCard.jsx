import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, BookOpen, Pencil, Trash2, Globe, Lock } from "lucide-react";

const skillColors = {
  "3D Printing": "bg-orange-100 text-orange-700",
  "Prompt Engineering": "bg-purple-100 text-purple-700",
  "AI Literacy": "bg-blue-100 text-blue-700",
  "Robotics": "bg-green-100 text-green-700",
  "Coding": "bg-cyan-100 text-cyan-700",
  "Digital Creativity": "bg-pink-100 text-pink-700",
  "Other": "bg-gray-100 text-gray-700",
};

export default function CourseCard({ course, progress, showProgress = false, canManage = false, onDelete }) {
  const colorClass = skillColors[course.skill_area] || skillColors["Other"];
  const isPublished = course.status === "published";

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Delete "${course.title}"? This cannot be undone.`)) {
      onDelete(course.id);
    }
  };

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

          {/* Teacher action bar on hover */}
          {canManage && (
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <span className={`flex items-center gap-1 text-xs font-semibold ${isPublished ? "text-green-300" : "text-amber-300"}`}>
                {isPublished ? <Globe size={11} /> : <Lock size={11} />}
                {isPublished ? "Published" : course.status === "archived" ? "Archived" : "Draft"}
              </span>
              <div className="flex items-center gap-2">
                <Link
                  to={`/courses/${course.id}/edit`}
                  onClick={e => e.stopPropagation()}
                  className="text-white/80 hover:text-white text-xs flex items-center gap-1 transition-colors"
                >
                  <Pencil size={12} /> Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="text-red-300 hover:text-red-200 transition-colors"
                  title="Delete course"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-poppins font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors flex-1">
              {course.title}
            </h3>
            {canManage && (
              <span className={`flex-shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                isPublished ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
              }`}>
                {isPublished ? <Globe size={10} /> : <Lock size={10} />}
                {isPublished ? "Published" : course.status === "archived" ? "Archived" : "Draft"}
              </span>
            )}
          </div>

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

          {canManage && (
            <div className="flex justify-end mt-3">
              <Link
                to={`/courses/${course.id}/edit`}
                onClick={e => e.stopPropagation()}
                className="text-muted-foreground hover:text-primary text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Pencil size={12} /> Edit
              </Link>
            </div>
          )}

          {course.grade_levels?.length > 0 && !canManage && (
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