import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { appParams } from "@/lib/app-params";
import { Clock } from "lucide-react";

const COMMUNITY_IDS = new Set(["69ddcb95e60c3666ca2a34f8", "69ddcb95e60c3666ca2a34f9"]);
const STEM_IDS = new Set(["69ec1418ba193ce56e0c585e","69ec1418ba193ce56e0c585f","69ec1418ba193ce56e0c5860","69ec1418ba193ce56e0c5861","69ec1418ba193ce56e0c5862","69ec1418ba193ce56e0c5863","69ec1418ba193ce56e0c5864"]);

const HARDCODED_STEM = [
  { href: "/share/spinning-tops", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/a7884a6b9_SpinningTopscover.png", title: "Spinning Tops", desc: "Design & 3D print a spinning top — spin for as long as possible!", badges: [{ label: "Project", color: "bg-purple-600" }, { label: "Basic", color: "bg-green-600" }, { label: "STEM", color: "bg-white/20" }] },
  { href: "/share/rubber-band-car", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/73050b285_RubberbandCarCoverPhoto.png", title: "Rubber Band Car Challenge", desc: "Build, race, and redesign a rubber band-powered car.", badges: [{ label: "Project", color: "bg-blue-600" }, { label: "Basic", color: "bg-green-600" }, { label: "STEM", color: "bg-white/20" }] },
  { href: "/share/emoji-tokens", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/4dc8cba41_EmojiTokenCover.png", title: "Emoji Tokens", desc: "Design & 3D print emoji tokens for a feedback or communication system.", badges: [{ label: "Project", color: "bg-yellow-500" }, { label: "Basic", color: "bg-green-600" }, { label: "STEM", color: "bg-white/20" }] },
  { href: "/share/maker/69ec1418ba193ce56e0c585e", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/c44bb0b59_PuzzleCubes.png", title: "Puzzle Cubes", desc: "Learn how to design and make 3D printed puzzle cubes", badges: [{ label: "3D Printing", color: "bg-orange-500" }, { label: "Beginner", color: "bg-green-600" }, { label: "STEM", color: "bg-white/20" }] },
  { href: "/share/maker/69ec1418ba193ce56e0c585f", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9f8f426ef_FunctionalWrenches.png", title: "Functional Wrenches", desc: "Design and create practical, usable wrench tools using digital fabrication", badges: [{ label: "3D Printing", color: "bg-orange-500" }, { label: "Beginner", color: "bg-green-600" }, { label: "STEM", color: "bg-white/20" }] },
  { href: "/share/maker/69ec1418ba193ce56e0c5860", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/b57596a03_BalloonDragsters.png", title: "Balloon Dragsters", desc: "Build a balloon-powered dragster to explore motion and propulsion", badges: [{ label: "3D Printing", color: "bg-orange-500" }, { label: "Beginner", color: "bg-green-600" }, { label: "STEM", color: "bg-white/20" }] },
  { href: "/share/maker/69ec1418ba193ce56e0c5861", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/2168fd833_EgyptianObelisks.png", title: "Egyptian Obelisks", desc: "Model and construct ancient Egyptian obelisks while exploring geometry and design", badges: [{ label: "3D Printing", color: "bg-orange-500" }, { label: "Beginner", color: "bg-green-600" }, { label: "STEM", color: "bg-white/20" }] },
  { href: "/share/maker/69ec1418ba193ce56e0c5862", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/9b6f3097f_Self-WateringPlanters.png", title: "Self-Watering Planters", desc: "Create a 3D printed self-watering planter system for plants", badges: [{ label: "3D Printing", color: "bg-orange-500" }, { label: "Intermediate", color: "bg-amber-500" }, { label: "STEM", color: "bg-white/20" }] },
  { href: "/share/maker/69ec1418ba193ce56e0c5863", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/6b2dca797_Whistles.png", title: "Whistles", desc: "Design and build functional whistles while exploring sound and airflow", badges: [{ label: "3D Printing", color: "bg-orange-500" }, { label: "Intermediate", color: "bg-amber-500" }, { label: "STEM", color: "bg-white/20" }] },
  { href: "/share/maker/69ec1418ba193ce56e0c5864", img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/8906f1ab3_SuspensionBridges.png", title: "Suspension Bridges", desc: "Design and model a suspension bridge to understand structural engineering concepts", badges: [{ label: "3D Printing", color: "bg-orange-500" }, { label: "Intermediate", color: "bg-amber-500" }, { label: "STEM", color: "bg-white/20" }] },
];

async function fetchGallery() {
  const base  = appParams.appBaseUrl || "";
  const ver   = appParams.functionsVersion || "prod";
  const appId = appParams.appId;
  const res = await fetch(`${base}/api/apps/${appId}/functions/${ver}/getPublicMakerGallery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

function formatDuration(minutes) {
  if (!minutes) return null;
  if (minutes >= 60) { const h = Math.round(minutes / 60); return `${h} hr${h !== 1 ? "s" : ""}`; }
  return `${minutes} min`;
}

const skillBadgeColor = {
  "3D Printing": "bg-orange-500", "Robotics": "bg-blue-600",
  "Prompt Engineering": "bg-pink-600", "Coding": "bg-green-600",
  "Electronics": "bg-yellow-600", "Digital Creativity": "bg-purple-600", "Other": "bg-gray-500",
};
const difficultyColor = { Basic: "bg-green-600", Beginner: "bg-green-600", Intermediate: "bg-amber-500", Advanced: "bg-red-600" };

// ── Reusable card for DB-sourced lessons ────────────────────────────────────
const ProjectCard = memo(function ProjectCard({ title, description, img, href, skill_area, difficulty, estimated_minutes, tall = false }) {
  const badgeColor = skillBadgeColor[skill_area] || "bg-gray-500";
  const diffColor  = difficultyColor[difficulty]  || "bg-gray-500";
  const duration   = formatDuration(estimated_minutes);
  return (
    <Link to={href} className="group block rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white">
      <div className={`relative overflow-hidden ${tall ? "h-44" : "h-40"} bg-gradient-to-br from-orange-400 to-orange-600`}>
        {img && (
          <img src={img} alt={title} loading="lazy" decoding="async"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          {skill_area && <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${badgeColor}`}>{skill_area}</span>}
          {difficulty && <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${diffColor}`}>{difficulty}</span>}
        </div>
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-poppins font-bold text-sm text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-1">{title}</h3>
        {description && <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{description}</p>}
        {duration && <p className="text-xs text-orange-500 font-semibold pt-1 flex items-center gap-1"><Clock size={11} />{duration}</p>}
      </div>
    </Link>
  );
});

// ── Hardcoded static card (same markup style as LMS) ────────────────────────
function StaticHeroCard({ href, img, alt, badges, title, description }) {
  return (
    <Link to={href} className="block group">
      <div className="relative rounded-2xl overflow-hidden h-44 shadow-sm border border-gray-200 hover:shadow-md transition-all">
        <img src={img} alt={alt} loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => { e.currentTarget.style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 p-5 h-full flex flex-col justify-end">
          <div className="flex gap-2 mb-2">
            {badges.map((b, i) => <span key={i} className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${b.color}`}>{b.label}</span>)}
          </div>
          <h3 className="font-poppins font-bold text-lg text-white">{title}</h3>
          <p className="text-white/70 text-xs">{description}</p>
        </div>
      </div>
    </Link>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-3.5 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-100 rounded" />
        <div className="h-3 w-1/2 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

function SectionHeader({ title }) {
  return <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest pb-1 border-b border-gray-200">{title}</h2>;
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function PublicMakerLessons() {
  const [dbCards, setDbCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery()
      .then(data => setDbCards(data?.cards || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Only "general" (everything not hardcoded) goes in the All Projects grid
  const general = dbCards.filter(c => !STEM_IDS.has(c.id) && !COMMUNITY_IDS.has(c.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-2 sticky top-0 z-50 shadow-sm">
        <span className="text-lg font-extrabold text-orange-500 font-poppins">Silid</span>
        <span className="text-lg font-extrabold text-gray-800 font-poppins">LMS</span>
        <span className="text-xs text-gray-400 ml-1 hidden sm:block">Maker Projects</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

        {/* ── STEM Projects ─────────────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionHeader title="STEM Projects" />

          {/* All STEM projects — fully hardcoded for reliability */}
          {HARDCODED_STEM.map(p => (
            <StaticHeroCard key={p.href} href={p.href} img={p.img} alt={p.title} badges={p.badges} title={p.title} description={p.desc} />
          ))}
        </section>

        {/* ── Community Projects ────────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionHeader title="Community Projects" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* RC Car — hardcoded static */}
            <Link to="/share/maker/69ddcb95e60c3666ca2a34f8" className="block group">
              <div className="relative rounded-2xl overflow-hidden h-40 shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <img src="https://media.base44.com/images/public/69d386ad9523e2ce04536574/91c30fc60_CoverPhoto1.jpg" alt="3D Printed RC Car" loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => { e.currentTarget.style.display = "none"; }}
                />
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
            {/* uArm — hardcoded static */}
            <Link to="/share/maker/69ddcb95e60c3666ca2a34f9" className="block group">
              <div className="relative rounded-2xl overflow-hidden h-40 shadow-sm border border-gray-200 hover:shadow-md transition-all">
                <img src="https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/8764ae1e8_IMG_0296.jpeg" alt="UArm Robot Arm" loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => { e.currentTarget.style.display = "none"; }}
                />
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

          </div>
        </section>

        {/* ── All other published lessons (mirrors the "filtered" grid in LMS) */}
        {(loading || general.length > 0) && (
          <section className="space-y-4">
            <SectionHeader title="All Projects" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {loading
                ? [1, 2, 3].map(i => <CardSkeleton key={i} />)
                : general.map(c => (
                    <ProjectCard key={c.id} {...c} href={`/share/maker/${c.id}`} />
                  ))
              }
            </div>
          </section>
        )}

      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-6 text-center">
        <p className="text-xs text-gray-400">Powered by <span className="font-semibold text-orange-500">SilidLMS</span></p>
      </div>
    </div>
  );
}