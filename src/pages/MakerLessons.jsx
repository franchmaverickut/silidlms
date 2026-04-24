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
      const role = user?.role?.toLowerCase();
      const isManager = role === "teacher" || role === "admin";
      const query = isManager ? {} : { status: "published" };
      const [l, s] = await Promise.all([
        base44.entities.MakerLesson.filter(query, "-created_date", 50).catch(() => []),
        user ? base44.entities.MakerSubmission.filter({ student_id: user.id }, "-created_date", 50).catch(() => []) : Promise.resolve([]),
      ]);
      setLessons(l);
      setSubmissions(s);
      setLoading(false);
    };
    if (user !== undefined) load();
  }, [user]);

  const getProgress = (lessonId) => {
    const sub = submissions.find(s => s.lesson_id === lessonId);
    if (!sub) return undefined;
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson?.steps?.length) return sub.status === "submitted" ? 100 : 0;
    return Math.round(((sub.completed_steps?.length || 0) / lesson.steps.length) * 100);
  };

  const handleDelete = async (lessonId) => {
    await base44.entities.MakerLesson.delete(lessonId);
    setLessons(prev => prev.filter(l => l.id !== lessonId));
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

      {/* STEM Projects — Static */}
      {(skillFilter === "All" || skillFilter === "3D Printing") && !search && (
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">STEM Projects</p>
          <Link to="/maker/spinning-tops" className="block group">
            <div className="relative rounded-2xl overflow-hidden h-44 shadow-sm border border-border/60 hover:shadow-md transition-all">
              <img
                src="https://media.base44.com/images/public/69d386ad9523e2ce04536574/a7884a6b9_SpinningTopscover.png"
                alt="Spinning Tops"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="relative z-10 p-5 h-full flex flex-col justify-end">
                <div className="flex gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-600 text-white">Project</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-600 text-white">Basic</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white">STEM</span>
                </div>
                <h3 className="font-poppins font-bold text-lg text-white">Spinning Tops</h3>
                <p className="text-white/70 text-xs">Design & 3D print a spinning top — spin for as long as possible!</p>
              </div>
            </div>
          </Link>

          {/* Community Feature Projects */}
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pt-2">Community Projects</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* RC Car */}
            <div className="relative rounded-2xl overflow-hidden h-40 shadow-sm border border-border/60 opacity-80">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900" />
              <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-500 text-white">Robotics</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white">Community</span>
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-base text-white">RC Car</h3>
                  <p className="text-white/60 text-xs mt-0.5">3D print and build a remote-controlled car from scratch.</p>
                  <span className="inline-block mt-2 text-xs text-white/40 font-semibold">Coming soon</span>
                </div>
              </div>
            </div>
            {/* uArm */}
            <div className="relative rounded-2xl overflow-hidden h-40 shadow-sm border border-border/60 opacity-80">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
              <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-500 text-white">Robotics</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white">Community</span>
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-base text-white">uArm</h3>
                  <p className="text-white/60 text-xs mt-0.5">Build a miniature robotic arm using 3D printed parts.</p>
                  <span className="inline-block mt-2 text-xs text-white/40 font-semibold">Coming soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <MakerLessonCard key={lesson.id} lesson={lesson} progress={getProgress(lesson.id)} isTeacher={isTeacher} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}