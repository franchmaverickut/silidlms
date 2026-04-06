import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Plus, Layers, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MakerLessonCard from "@/components/maker/MakerLessonCard";

const SKILL_AREAS = ["All", "3D Printing", "Robotics", "Prompt Engineering", "Coding", "Electronics", "Digital Creativity"];

export default function MakerLessons() {
  const { user } = useOutletContext();
  const [lessons, setLessons] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Normalize role to lowercase for consistent comparison regardless of platform casing
  const role = user?.role?.toLowerCase();
  const isTeacher = role === "teacher" || role === "admin";
  console.log('ROLE:', user?.role, '| isTeacher:', isTeacher);

  useEffect(() => {
    const load = async () => {
      const query = isTeacher ? {} : { status: "published" };
      const [l, s] = await Promise.all([
        base44.entities.MakerLesson.filter(query, "-created_date", 50).catch(() => []),
        user ? base44.entities.MakerSubmission.filter({ student_id: user.id }, "-created_date", 50).catch(() => []) : [],
      ]);
      setLessons(l);
      setSubmissions(s);
      setLoading(false);
    };
    if (user !== null) load();
  }, [user]);

  const getProgress = (lessonId) => {
    const sub = submissions.find(s => s.lesson_id === lessonId);
    if (!sub) return undefined;
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson?.steps?.length) return sub.status === "submitted" ? 100 : 0;
    return Math.round(((sub.completed_steps?.length || 0) / lesson.steps.length) * 100);
  };

  const filtered = lessons.filter(l => {
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description?.toLowerCase().includes(search.toLowerCase());
    const matchSkill = skillFilter === "All" || l.skill_area === skillFilter;
    return matchSearch && matchSkill;
  });

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-foreground">Maker Lessons</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {isTeacher ? "Create and manage hands-on project lessons" : "Explore hands-on projects and start building"}
          </p>
        </div>
        {isTeacher && (
          <Link to="/maker/new">
            <Button className="bg-primary text-white rounded-xl gap-2 shadow-sm shadow-primary/20">
              <Plus size={16} /> New Lesson
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search lessons..."
            className="pl-9 rounded-xl"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {SKILL_AREAS.map(s => (
            <button
              key={s}
              onClick={() => setSkillFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                skillFilter === s
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-2xl">
          <Layers className="w-12 h-12 text-muted-foreground/20 mx-auto mb-3" />
          <h3 className="font-poppins font-semibold text-foreground">No maker lessons found</h3>
          <p className="text-muted-foreground text-sm mt-1">
            {isTeacher ? "Create your first maker lesson to get started!" : "Check back soon for new projects."}
          </p>
          {isTeacher && (
            <Link to="/maker/new">
              <Button className="mt-4 bg-primary text-white rounded-xl gap-2">
                <Plus size={16} /> Create Lesson
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(lesson => (
            <MakerLessonCard key={lesson.id} lesson={lesson} progress={getProgress(lesson.id)} />
          ))}
        </div>
      )}
    </div>
  );
}