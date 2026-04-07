import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import {
  Users, BookOpen, GraduationCap, BarChart3, Megaphone,
  Plus, Loader2, Trash2, Pin, ShieldAlert, RefreshCw
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StatsCard from "@/components/dashboard/StatsCard";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

export default function AdminPanel() {
  const { user } = useOutletContext();
  const { toast } = useToast();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingAnn, setSavingAnn] = useState(false);
  const [cleaning, setCleaning] = useState(null); // track which cleanup is running
  const [newAnn, setNewAnn] = useState({ title: "", content: "", is_pinned: false });

  const loadAll = async () => {
    const [u, c, e, a] = await Promise.all([
      base44.entities.User.list("-created_date", 100),
      base44.entities.Course.list("-created_date", 100),
      base44.entities.Enrollment.list("-created_date", 200),
      base44.entities.Announcement.list("-created_date", 20),
    ]);
    setUsers(u);
    setCourses(c);
    setEnrollments(e);
    setAnnouncements(a);
  };

  useEffect(() => {
    loadAll().finally(() => setLoading(false));
  }, []);

  const postAnnouncement = async () => {
    if (!newAnn.title || !newAnn.content) return;
    setSavingAnn(true);
    const a = await base44.entities.Announcement.create({
      ...newAnn,
      author_id: user?.id,
      author_name: user?.full_name,
      published_date: new Date().toISOString().split("T")[0],
    });
    setAnnouncements(prev => [a, ...prev]);
    setNewAnn({ title: "", content: "", is_pinned: false });
    setSavingAnn(false);
    toast({ title: "Announcement posted!" });
  };

  const deleteAnnouncement = async (id) => {
    await base44.entities.Announcement.delete(id);
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const updateUserRole = async (userId, role) => {
    await base44.entities.User.update(userId, { role });
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    toast({ title: "Role updated!" });
  };

  // --- Cleanup actions ---
  const clearAllEnrollments = async () => {
    if (!window.confirm("Delete ALL student enrollments? This cannot be undone.")) return;
    setCleaning("enrollments");
    for (const e of enrollments) {
      await base44.entities.Enrollment.delete(e.id);
    }
    // Also reset enrolled_count on all courses
    for (const c of courses) {
      if (c.enrolled_count > 0) {
        await base44.entities.Course.update(c.id, { enrolled_count: 0 });
      }
    }
    await loadAll();
    setCleaning(null);
    toast({ title: "All enrollments cleared." });
  };

  const clearMakerLessons = async () => {
    if (!window.confirm("Delete all non-seed Maker Lessons and their submissions? Seed/demo lessons are protected.")) return;
    setCleaning("maker");
    const [lessons, submissions] = await Promise.all([
      base44.entities.MakerLesson.list("-created_date", 200),
      base44.entities.MakerSubmission.list("-created_date", 500),
    ]);
    const deletableLessons = lessons.filter(l => !l.is_seed_data);
    const deletableIds = new Set(deletableLessons.map(l => l.id));
    for (const s of submissions) {
      if (deletableIds.has(s.lesson_id)) await base44.entities.MakerSubmission.delete(s.id);
    }
    for (const l of deletableLessons) {
      await base44.entities.MakerLesson.delete(l.id);
    }
    toast({ title: `Deleted ${deletableLessons.length} maker lesson(s). Seed lessons preserved.` });
    setCleaning(null);
  };

  const clearAllSubmissions = async () => {
    if (!window.confirm("Delete ALL course submissions and maker submissions? This cannot be undone.")) return;
    setCleaning("submissions");
    const [courseSubs, makerSubs] = await Promise.all([
      base44.entities.Submission.list("-created_date", 500),
      base44.entities.MakerSubmission.list("-created_date", 500),
    ]);
    for (const s of courseSubs) await base44.entities.Submission.delete(s.id);
    for (const s of makerSubs) await base44.entities.MakerSubmission.delete(s.id);
    toast({ title: `Cleared ${courseSubs.length + makerSubs.length} submission(s).` });
    setCleaning(null);
  };

  const publishedCourses = courses.filter(c => c.status === "published").length;
  const totalStudents = users.filter(u => u.role === "student" || !u.role).length;
  const completionRate = enrollments.length
    ? Math.round((enrollments.filter(e => e.status === "completed").length / enrollments.length) * 100)
    : 0;

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-poppins font-bold text-2xl text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Manage users, content, and platform analytics</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 text-xs rounded-xl" onClick={() => loadAll()}>
          <RefreshCw size={13} /> Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard icon={Users} label="Total Users" value={users.length} color="primary" />
        <StatsCard icon={BookOpen} label="Published Courses" value={publishedCourses} color="secondary" />
        <StatsCard icon={GraduationCap} label="Enrollments" value={enrollments.length} color="green" />
        <StatsCard icon={BarChart3} label="Completion Rate" value={`${completionRate}%`} color="purple" />
      </div>

      <Tabs defaultValue="users">
        <TabsList className="bg-muted">
          <TabsTrigger value="users" className="gap-1.5"><Users size={13} /> Users</TabsTrigger>
          <TabsTrigger value="courses" className="gap-1.5"><BookOpen size={13} /> Courses</TabsTrigger>
          <TabsTrigger value="announcements" className="gap-1.5"><Megaphone size={13} /> Announcements</TabsTrigger>
          <TabsTrigger value="cleanup" className="gap-1.5 text-destructive data-[state=active]:text-destructive"><ShieldAlert size={13} /> Cleanup</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-5">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <p className="font-poppins font-semibold text-sm">{users.length} Users</p>
              <p className="text-xs text-muted-foreground">{totalStudents} students · {users.filter(u => u.role === "teacher").length} teachers · {users.filter(u => u.role === "admin").length} admins</p>
            </div>
            <div className="divide-y divide-border/40">
              {users.map(u => (
                <div key={u.id} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/20 transition-colors">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {u.full_name?.charAt(0) || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{u.full_name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                  <Select value={u.role || "student"} onValueChange={(role) => updateUserRole(u.id, role)}>
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Courses Tab — admin view only, no enrollment state */}
        <TabsContent value="courses" className="mt-5">
          <Card className="border-border/60 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border/50">
              <p className="font-poppins font-semibold text-sm">{courses.length} Courses</p>
            </div>
            <div className="divide-y divide-border/40">
              {courses.map(course => {
                const courseEnrollments = enrollments.filter(e => e.course_id === course.id);
                const completed = courseEnrollments.filter(e => e.status === "completed").length;
                return (
                  <div key={course.id} className="flex items-center gap-4 px-4 py-3 hover:bg-muted/20 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={15} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{course.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {course.skill_area} · {courseEnrollments.length} enrolled · {completed} completed
                      </p>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      course.status === "published" ? "bg-secondary/15 text-secondary" :
                      course.status === "archived" ? "bg-muted text-muted-foreground" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {course.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="mt-5 space-y-4">
          <Card className="p-5 border-border/60 shadow-sm space-y-4">
            <h3 className="font-poppins font-semibold text-sm">Post New Announcement</h3>
            <Input
              value={newAnn.title}
              onChange={e => setNewAnn(p => ({ ...p, title: e.target.value }))}
              placeholder="Announcement title"
              className="text-sm"
            />
            <Textarea
              value={newAnn.content}
              onChange={e => setNewAnn(p => ({ ...p, content: e.target.value }))}
              placeholder="Announcement content..."
              className="text-sm min-h-[80px]"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={newAnn.is_pinned} onChange={e => setNewAnn(p => ({ ...p, is_pinned: e.target.checked }))} className="accent-primary" />
                <Pin size={13} /> Pin this announcement
              </label>
              <Button onClick={postAnnouncement} disabled={savingAnn || !newAnn.title || !newAnn.content} className="bg-primary text-white rounded-xl gap-2 text-sm">
                {savingAnn ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
                Post
              </Button>
            </div>
          </Card>

          <div className="space-y-3">
            {announcements.map(a => (
              <Card key={a.id} className="p-4 border-border/60 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {a.is_pinned && <Pin size={12} className="text-primary" />}
                      <p className="font-poppins font-semibold text-sm">{a.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{a.content}</p>
                    {a.published_date && (
                      <p className="text-xs text-muted-foreground/60 mt-2">{format(new Date(a.published_date), "MMM d, yyyy")}</p>
                    )}
                  </div>
                  <button onClick={() => deleteAnnouncement(a.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Cleanup Tab */}
        <TabsContent value="cleanup" className="mt-5 space-y-4">
          <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 text-sm text-destructive font-medium flex items-center gap-2">
            <ShieldAlert size={16} />
            These actions are irreversible. Seed and system data is always protected.
          </div>

          <div className="space-y-3">
            <CleanupAction
              title="Clear All Enrollments"
              description={`Remove all ${enrollments.length} student enrollment records and reset course enrollment counts.`}
              onConfirm={clearAllEnrollments}
              loading={cleaning === "enrollments"}
              disabled={!!cleaning || enrollments.length === 0}
            />
            <CleanupAction
              title="Clear Non-Seed Maker Lessons"
              description="Delete all teacher-created Maker Lessons and their submissions. Demo/seed lessons are protected and will not be removed."
              onConfirm={clearMakerLessons}
              loading={cleaning === "maker"}
              disabled={!!cleaning}
            />
            <CleanupAction
              title="Clear All Submissions"
              description="Delete all course and maker project submissions platform-wide."
              onConfirm={clearAllSubmissions}
              loading={cleaning === "submissions"}
              disabled={!!cleaning}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CleanupAction({ title, description, onConfirm, loading, disabled }) {
  return (
    <Card className="p-4 border-border/60 shadow-sm flex items-center gap-4">
      <div className="flex-1">
        <p className="font-poppins font-semibold text-sm text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Button
        variant="destructive"
        size="sm"
        className="rounded-xl gap-1.5 text-xs flex-shrink-0"
        onClick={onConfirm}
        disabled={disabled}
      >
        {loading ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
        {loading ? "Clearing..." : "Clear"}
      </Button>
    </Card>
  );
}