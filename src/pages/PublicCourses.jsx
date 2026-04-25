import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import PublicProjectShell from "@/components/maker/PublicProjectShell";
import { BookOpen, Clock, Layers } from "lucide-react";

const skillColors = {
  "3D Printing": "bg-purple-600",
  "Prompt Engineering": "bg-pink-600",
  "AI Literacy": "bg-indigo-600",
  "Robotics": "bg-blue-600",
  "Coding": "bg-green-600",
  "Digital Creativity": "bg-yellow-500",
  "Other": "bg-gray-500",
};

const difficultyColor = {
  Beginner: "bg-green-600",
  Intermediate: "bg-amber-500",
  Advanced: "bg-red-600",
};

export default function PublicCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Course.filter({ status: "published" }, "-created_date", 50)
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  return (
    <PublicProjectShell>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 pt-2">
          <h1 className="font-poppins font-bold text-3xl text-gray-900">Courses</h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Structured skill-building courses in 3D printing, AI, coding, robotics, and more — guiding students from beginner to advanced.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-orange-400/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-sm">No published courses yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <Link
                key={course.id}
                to={`/share/course/${course.id}`}
                className="group block rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white"
              >
                {/* Thumbnail / Color banner */}
                <div className="relative h-36 overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
                  {course.thumbnail_url && (
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute inset-0 flex items-end p-3 gap-1.5 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${skillColors[course.skill_area] || "bg-gray-500"}`}>
                      {course.skill_area}
                    </span>
                    {course.difficulty && (
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${difficultyColor[course.difficulty] || "bg-gray-500"}`}>
                        {course.difficulty}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-1.5">
                  <h3 className="font-poppins font-bold text-sm text-gray-900 group-hover:text-orange-500 transition-colors leading-snug">
                    {course.title}
                  </h3>
                  {course.description && (
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{course.description}</p>
                  )}
                  <div className="flex items-center gap-3 pt-1 text-xs text-gray-400">
                    {course.duration_hours && (
                      <span className="flex items-center gap-1"><Clock size={11} /> {course.duration_hours}h</span>
                    )}
                    {course.total_lessons > 0 && (
                      <span className="flex items-center gap-1"><Layers size={11} /> {course.total_lessons} lessons</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PublicProjectShell>
  );
}