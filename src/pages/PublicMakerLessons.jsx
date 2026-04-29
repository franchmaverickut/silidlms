import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { appParams } from "@/lib/app-params";
import { Clock } from "lucide-react";

// ── Constants — must match LMS MakerLessons page exactly ────────────────────

const COMMUNITY_IDS = new Set(["69ddcb95e60c3666ca2a34f8", "69ddcb95e60c3666ca2a34f9"]);
const STEM_PROJECT_TITLES = new Set([
  "Puzzle Cubes", "Functional Wrenches", "Balloon Dragsters",
  "Egyptian Obelisks", "Self-Watering Planters", "Whistles", "Suspension Bridges",
]);

// ── Static cards (hardcoded images / routes that don't live in the DB) ──────

const STATIC_STEM = [
  {
    id: "static-spinning-tops",
    title: "Spinning Tops",
    description: "Design & 3D print a spinning top — spin for as long as possible!",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/a7884a6b9_SpinningTopscover.png",
    href: "/share/spinning-tops",
    skill_area: "3D Printing",
    difficulty: "Beginner",
    estimated_minutes: 240,
  },
  {
    id: "static-rubber-band-car",
    title: "Rubber Band Car Challenge",
    description: "Build, race, and redesign a rubber band-powered car.",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/73050b285_RubberbandCarCoverPhoto.png",
    href: "/share/rubber-band-car",
    skill_area: "Robotics",
    difficulty: "Beginner",
    estimated_minutes: 25,
  },
  {
    id: "static-emoji-tokens",
    title: "Emoji Tokens",
    description: "Design & 3D print emoji tokens for a feedback or communication system.",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/4dc8cba41_EmojiTokenCover.png",
    href: "/share/emoji-tokens",
    skill_area: "3D Printing",
    difficulty: "Beginner",
    estimated_minutes: 180,
  },
];

const STATIC_COMMUNITY = [
  {
    id: "69ddcb95e60c3666ca2a34f8",
    title: "3D Printed RC Car",
    description: "Design, print, and assemble a fully functional RC car.",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/91c30fc60_CoverPhoto1.jpg",
    href: "/share/maker/69ddcb95e60c3666ca2a34f8",
    skill_area: "3D Printing",
    difficulty: "Advanced",
  },
  {
    id: "69ddcb95e60c3666ca2a34f9",
    title: "UArm Palletizing Robot Arm",
    description: "Build a miniature robotic arm with Arduino.",
    img: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/8764ae1e8_IMG_0296.jpeg",
    href: "/share/maker/69ddcb95e60c3666ca2a34f9",
    skill_area: "Robotics",
    difficulty: "Advanced",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

async function fetchGallery() {
  const base = appParams.appBaseUrl || "";
  const ver  = appParams.functionsVersion || "prod";
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
  if (minutes >= 60) {
    const h = Math.round(minutes / 60);
    return `${h} hr${h !== 1 ? "s" : ""}`;
  }
  return `${minutes} min`;
}

const skillBadgeColor = {
  "3D Printing": "bg-orange-500",
  "Robotics": "bg-blue-600",
  "Prompt Engineering": "bg-pink-600",
  "Coding": "bg-green-600",
  "Electronics": "bg-yellow-600",
  "Digital Creativity": "bg-purple-600",
  "Other": "bg-gray-500",
};

const difficultyColor = {
  Basic: "bg-green-600",
  Beginner: "bg-green-600",
  Intermediate: "bg-amber-500",
  Advanced: "bg-red-600",
};

// ── Card component ───────────────────────────────────────────────────────────

const ProjectCard = memo(function ProjectCard({ title, description, img, href, skill_area, difficulty, estimated_minutes }) {
  const badgeColor = skillBadgeColor[skill_area] || "bg-gray-500";
  const diffColor  = difficultyColor[difficulty] || "bg-gray-500";
  const duration   = formatDuration(estimated_minutes);

  return (
    <Link
      to={href}
      className="group block rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
        {img && (
          <img
            src={img}
            alt={title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={e => { e.currentTarget.style.display = "none"; }}
          />
        )}
        {/* Gradient overlay — always present so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${badgeColor}`}>
            {skill_area}
          </span>
          {difficulty && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${diffColor}`}>
              {difficulty}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-1">
        <h3 className="font-poppins font-bold text-sm text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-1">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{description}</p>
        )}
        {duration && (
          <p className="text-xs text-orange-500 font-semibold pt-1 flex items-center gap-1">
            <Clock size={11} /> {duration}
          </p>
        )}
      </div>
    </Link>
  );
});

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
  return (
    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest pb-1 border-b border-gray-200">
      {title}
    </h2>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PublicMakerLessons() {
  const [dbCards, setDbCards]     = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    fetchGallery()
      .then(data => {
        setDbCards(data?.cards || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Split DB cards into categories — mirrors LMS logic exactly
  // STEM_PROJECT_TITLES = DB lessons that belong under the STEM section
  // COMMUNITY_IDS       = DB lessons that belong under Community
  // Everything else     = general "All Projects" grid
  const dbStem      = dbCards.filter(c => STEM_PROJECT_TITLES.has(c.title) && !COMMUNITY_IDS.has(c.id));
  const dbCommunity = dbCards.filter(c => COMMUNITY_IDS.has(c.id));
  const dbGeneral   = dbCards.filter(c => !STEM_PROJECT_TITLES.has(c.title) && !COMMUNITY_IDS.has(c.id));

  // Merge community: static cards first, then any DB community cards not already in static list
  const staticCommunityIds = new Set(STATIC_COMMUNITY.map(c => c.id));
  const extraCommunity = dbCommunity.filter(c => !staticCommunityIds.has(c.id));
  const communityCards = [
    ...STATIC_COMMUNITY,
    ...extraCommunity.map(c => ({ ...c, href: `/share/maker/${c.id}` })),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-2 sticky top-0 z-50 shadow-sm">
        <span className="text-lg font-extrabold text-orange-500 font-poppins">Silid</span>
        <span className="text-lg font-extrabold text-gray-800 font-poppins">LMS</span>
        <span className="text-xs text-gray-400 ml-1 hidden sm:block">Maker Projects</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

        {/* ── STEM Projects ───────────────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionHeader title="STEM Projects" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Always-visible static cards */}
            {STATIC_STEM.map(p => <ProjectCard key={p.id} {...p} />)}

            {/* DB-sourced STEM project titles */}
            {loading
              ? [1, 2].map(i => <CardSkeleton key={`stem-sk-${i}`} />)
              : dbStem.map(c => (
                  <ProjectCard
                    key={c.id}
                    {...c}
                    href={`/share/maker/${c.id}`}
                  />
                ))
            }

            {/* General published lessons that aren't STEM titles or community */}
            {!loading && dbGeneral.map(c => (
              <ProjectCard
                key={c.id}
                {...c}
                href={`/share/maker/${c.id}`}
              />
            ))}
          </div>
        </section>

        {/* ── Community Projects ──────────────────────────────────────────── */}
        <section className="space-y-4">
          <SectionHeader title="Community Projects" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {communityCards.map(p => <ProjectCard key={p.id} {...p} />)}
            {loading && [1].map(i => <CardSkeleton key={`comm-sk-${i}`} />)}
          </div>
        </section>

      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-6 text-center">
        <p className="text-xs text-gray-400">
          Powered by <span className="font-semibold text-orange-500">SilidLMS</span>
        </p>
      </div>
    </div>
  );
}