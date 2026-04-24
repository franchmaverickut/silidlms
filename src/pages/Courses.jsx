import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Plus, Search, Filter, BookOpen, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from "@/components/courses/CourseCard";

const SKILL_AREAS = ["All", "3D Printing", "Prompt Engineering", "AI Literacy", "Robotics", "Coding", "Digital Creativity", "Other"];

export default function Courses() {
  const { user } = useOutletContext();
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusTab, setStatusTab] = useState("published");
  const [skillFilter, setSkillFilter] = useState("All");

  const role = user?.role || "student";
  const canManage = role === "teacher" || role === "admin";

  useEffect(() => {
    const load = async () => {
      const role = user?.role || "student";
      const isManager = role === "teacher" || role === "admin";
      const filter = isManager ? {} : { status: "published" };
      const [c, e] = await Promise.all([
        base44.entities.Course.filter(filter, "-created_date", 50),
        user ? base44.entities.Enrollment.filter({ student_id: user.id }) : Promise.resolve([]),
      ]);
      setCourses(c);
      setEnrollments(e);
      setLoading(false);
    };
    if (user !== undefined) load();
  }, [user]);

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title?.toLowerCase().includes(search.toLowerCase()) || c.description?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = canManage ? c.status === statusTab : c.status === "published";
    const matchSkill = skillFilter === "All" || c.skill_area === skillFilter;
    return matchSearch && matchStatus && matchSkill;
  });

  const getProgress = (courseId) => {
    const e = enrollments.find(e => e.course_id === courseId);
    return e ? e.progress_percent : undefined;
  };

  const isEnrolled = (courseId) => enrollments.some(e => e.course_id === courseId);

  const handleDelete = async (courseId) => {
    await base44.entities.Course.delete(courseId);
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-foreground">
            {canManage ? "Course Management" : "Browse Courses"}
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {canManage ? "Create, manage, and publish skill courses" : "Discover and learn future-ready tech skills"}
          </p>
        </div>
        {canManage && (
          <Link to="/courses/new">
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 gap-2">
              <Plus size={16} /> New Course
            </Button>
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4">
        {canManage && (
          <Tabs value={statusTab} onValueChange={setStatusTab}>
            <TabsList className="bg-muted">
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {SKILL_AREAS.map(area => (
              <button
                key={area}
                onClick={() => setSkillFilter(area)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  skillFilter === area
                    ? "bg-primary text-white shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card className="p-12 text-center border-dashed">
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <h3 className="font-poppins font-semibold text-foreground">No courses found</h3>
          <p className="text-muted-foreground text-sm mt-1">
            {canManage ? "Create your first course to get started." : "Check back soon for new courses!"}
          </p>
          {canManage && (
            <Link to="/courses/new">
              <Button className="mt-4 bg-primary text-white rounded-xl gap-2">
                <Plus size={15} /> Create Course
              </Button>
            </Link>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              progress={getProgress(course.id)}
              showProgress={isEnrolled(course.id)}
              canManage={canManage}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}