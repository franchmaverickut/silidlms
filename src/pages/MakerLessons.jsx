import { useState, useEffect } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Plus, Layers, Search, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MakerLessonCard from "@/components/maker/MakerLessonCard";
import { useToast } from "@/components/ui/use-toast";

const SKILL_AREAS = ["All", "3D Printing", "Robotics", "Prompt Engineering", "Coding", "Electronics", "Digital Creativity"];

export default function MakerLessons() {
  const { user } = useOutletContext();
  const { toast } = useToast();

  const copyShare = (path, label) => {
    const url = `${window.location.origin}/share/${path}`;
    navigator.clipboard.writeText(url);
    toast({ title: `${label} link copied!`, description: url });
  };
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

  const COMMUNITY_IDS = ["69ddcb95e60c3666ca2a34f8", "69ddcb95e60c3666ca2a34f9"];
  const STEM_IDS = ["69ec1418ba193ce56e0c585e","69ec1418ba193ce56e0c585f","69ec1418ba193ce56e0c5860","69ec1418ba193ce56e0c5861","69ec1418ba193ce56e0c5862","69ec1418ba193ce56e0c5863","69ec1418ba193ce56e0c5864"];

  const filtered = lessons.filter(l => {
    if (COMMUNITY_IDS.includes(l.id)) return false;
    if (STEM_IDS.includes(l.id)) return false;
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
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl gap-2 text-xs" onClick={() => { const url = `${window.location.origin}/share/maker`; navigator.clipboard.writeText(url); toast({ title: "Maker page link copied!", description: url }); }}>
            <Share2 size={14} /> Share All
          </Button>
          {isTeacher && (
            <Link to="/maker/new">
              <Button className="bg-primary text-white rounded-xl gap-2 shadow-sm shadow-primary/20">
                <Plus size={16} /> New Lesson
              </Button>
            </Link>
          )}
        </div>
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

          {[
            { to: "/maker/spinning-tops", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/a7884a6b9_SpinningTopscover.png", title: "Spinning Tops", desc: "Design & 3D print a spinning top — spin for as long as possible!", b1: "bg-purple-600", b1l: "Project", b2: "bg-green-600", b2l: "Basic", shareKey: "spinning-tops", shareLabel: "Spinning Tops" },
            { to: "/maker/rubber-band-car", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/73050b285_RubberbandCarCoverPhoto.png", title: "Rubber Band Car Challenge", desc: "Build, race, and redesign a rubber band-powered car.", b1: "bg-blue-600", b1l: "Project", b2: "bg-green-600", b2l: "Basic", shareKey: "rubber-band-car", shareLabel: "Rubber Band Car" },
            { to: "/maker/emoji-tokens", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/4dc8cba41_EmojiTokenCover.png", title: "Emoji Tokens", desc: "Design & 3D print emoji tokens for a feedback or communication system.", b1: "bg-yellow-500", b1l: "Project", b2: "bg-green-600", b2l: "Basic", shareKey: "emoji-tokens", shareLabel: "Emoji Tokens" },
            { to: "/maker/69ec1418ba193ce56e0c585e", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/c44bb0b59_PuzzleCubes.png", title: "Puzzle Cubes", desc: "Learn how to design and make 3D printed puzzle cubes", b1: "bg-orange-500", b1l: "3D Printing", b2: "bg-green-600", b2l: "Beginner", shareKey: "maker/69ec1418ba193ce56e0c585e", shareLabel: "Puzzle Cubes" },
            { to: "/maker/69ec1418ba193ce56e0c585f", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9f8f426ef_FunctionalWrenches.png", title: "Functional Wrenches", desc: "Design and create practical, usable wrench tools using digital fabrication", b1: "bg-orange-500", b1l: "3D Printing", b2: "bg-green-600", b2l: "Beginner", shareKey: "maker/69ec1418ba193ce56e0c585f", shareLabel: "Functional Wrenches" },
            { to: "/maker/69ec1418ba193ce56e0c5860", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b57596a03_BalloonDragsters.png", title: "Balloon Dragsters", desc: "Build a balloon-powered dragster to explore motion and propulsion", b1: "bg-orange-500", b1l: "3D Printing", b2: "bg-green-600", b2l: "Beginner", shareKey: "maker/69ec1418ba193ce56e0c5860", shareLabel: "Balloon Dragsters" },
            { to: "/maker/69ec1418ba193ce56e0c5861", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/2168fd833_EgyptianObelisks.png", title: "Egyptian Obelisks", desc: "Model and construct ancient Egyptian obelisks while exploring geometry and design", b1: "bg-orange-500", b1l: "3D Printing", b2: "bg-green-600", b2l: "Beginner", shareKey: "maker/69ec1418ba193ce56e0c5861", shareLabel: "Egyptian Obelisks" },
            { to: "/maker/69ec1418ba193ce56e0c5862", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9b6f3097f_Self-WateringPlanters.png", title: "Self-Watering Planters", desc: "Create a 3D printed self-watering planter system for plants", b1: "bg-orange-500", b1l: "3D Printing", b2: "bg-amber-500", b2l: "Intermediate", shareKey: "maker/69ec1418ba193ce56e0c5862", shareLabel: "Self-Watering Planters" },
            { to: "/maker/69ec1418ba193ce56e0c5863", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/6b2dca797_Whistles.png", title: "Whistles", desc: "Design and build functional whistles while exploring sound and airflow", b1: "bg-orange-500", b1l: "3D Printing", b2: "bg-amber-500", b2l: "Intermediate", shareKey: "maker/69ec1418ba193ce56e0c5863", shareLabel: "Whistles" },
            { to: "/maker/69ec1418ba193ce56e0c5864", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/8906f1ab3_SuspensionBridges.png", title: "Suspension Bridges", desc: "Design and model a suspension bridge to understand structural engineering concepts", b1: "bg-orange-500", b1l: "3D Printing", b2: "bg-amber-500", b2l: "Intermediate", shareKey: "maker/69ec1418ba193ce56e0c5864", shareLabel: "Suspension Bridges" },
          ].map(({ to, img, title, desc, b1, b1l, b2, b2l, shareKey, shareLabel }) => (
            <div key={to} className="relative group">
              <Link to={to} className="block">
                <div className="relative rounded-2xl overflow-hidden h-44 shadow-sm border border-border/60 hover:shadow-md transition-all">
                  <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  <div className="relative z-10 p-5 h-full flex flex-col justify-end">
                    <div className="flex gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${b1}`}>{b1l}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${b2}`}>{b2l}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white">STEM</span>
                    </div>
                    <h3 className="font-poppins font-bold text-lg text-white">{title}</h3>
                    <p className="text-white/70 text-xs">{desc}</p>
                  </div>
                </div>
              </Link>
              <button onClick={() => copyShare(shareKey, shareLabel)} className="absolute top-3 right-3 z-20 bg-black/50 hover:bg-black/70 text-white rounded-lg px-2 py-1 text-xs flex items-center gap-1 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                <Share2 size={11} /> Share
              </button>
            </div>
          ))}

          {/* Community Feature Projects */}
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest pt-2">Community Projects</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* RC Car */}
            <div className="relative group">
              <Link to="/maker/69ddcb95e60c3666ca2a34f8" className="block">
                <div className="relative rounded-2xl overflow-hidden h-40 shadow-sm border border-border/60 hover:shadow-md transition-all">
                  <img src="https://media.base44.com/images/public/69d386ad9523e2ce04536574/91c30fc60_CoverPhoto1.jpg" alt="3D Printed RC Car" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  <div className="relative z-10 p-5 h-full flex flex-col justify-end">
                    <div className="flex gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-orange-500 text-white">3D Printing</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white">Advanced</span>
                    </div>
                    <h3 className="font-poppins font-bold text-base text-white">3D Printed RC Car</h3>
                    <p className="text-white/70 text-xs">Design, print, and assemble a fully functional RC car.</p>
                  </div>
                </div>
              </Link>
              <button onClick={() => copyShare("maker/69ddcb95e60c3666ca2a34f8", "3D RC Car")} className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-lg px-2 py-1 text-xs flex items-center gap-1 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                <Share2 size={11} /> Share
              </button>
            </div>
            {/* uArm */}
            <div className="relative group">
              <Link to="/maker/69ddcb95e60c3666ca2a34f9" className="block">
                <div className="relative rounded-2xl overflow-hidden h-40 shadow-sm border border-border/60 hover:shadow-md transition-all">
                  <img src="https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/8764ae1e8_IMG_0296.jpeg" alt="UArm Miniature Palletizing Robot Arm" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  <div className="relative z-10 p-5 h-full flex flex-col justify-end">
                    <div className="flex gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">Robotics</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-600 text-white">Advanced</span>
                    </div>
                    <h3 className="font-poppins font-bold text-base text-white">UArm Palletizing Robot Arm</h3>
                    <p className="text-white/70 text-xs">Build a miniature robotic arm with Arduino.</p>
                  </div>
                </div>
              </Link>
              <button onClick={() => copyShare("maker/69ddcb95e60c3666ca2a34f9", "UArm Robot Arm")} className="absolute top-2 right-2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-lg px-2 py-1 text-xs flex items-center gap-1 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
                <Share2 size={11} /> Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 && (search || skillFilter !== "All") ? (
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
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(lesson => (
            <MakerLessonCard key={lesson.id} lesson={lesson} progress={getProgress(lesson.id)} isTeacher={isTeacher} onDelete={handleDelete} />
          ))}
        </div>
      ) : null}
    </div>
  );
}