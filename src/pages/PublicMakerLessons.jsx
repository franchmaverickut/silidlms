import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import PublicProjectShell from "@/components/maker/PublicProjectShell";
import { Clock } from "lucide-react";

// Static STEM projects (hardcoded)
const STEM_STATIC = [
  {
    id: "static-spinning-tops",
    title: "Spinning Tops",
    desc: "Design & 3D print a spinning top — spin for as long as possible!",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/a7884a6b9_SpinningTopscover.png",
    href: "/share/spinning-tops",
    badge: "3D Printing",
    badgeColor: "bg-purple-600",
    difficulty: "Basic",
    duration: "4 hours",
  },
  {
    id: "static-rubber-band-car",
    title: "Rubber Band Car Challenge",
    desc: "Build, race, and redesign a rubber band-powered car.",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/73050b285_RubberbandCarCoverPhoto.png",
    href: "/share/rubber-band-car",
    badge: "Engineering",
    badgeColor: "bg-blue-600",
    difficulty: "Basic",
    duration: "25 min",
  },
  {
    id: "static-emoji-tokens",
    title: "Emoji Tokens",
    desc: "Design & 3D print emoji tokens for a feedback or communication system.",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/4dc8cba41_EmojiTokenCover.png",
    href: "/share/emoji-tokens",
    badge: "3D Printing",
    badgeColor: "bg-yellow-500",
    difficulty: "Basic",
    duration: "3 hours",
  },
];

// Static Community projects (hardcoded)
const COMMUNITY_STATIC = [
  {
    id: "69ddcb95e60c3666ca2a34f8",
    title: "3D Printed RC Car",
    desc: "Design, print, and assemble a fully functional RC car.",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/91c30fc60_CoverPhoto1.jpg",
    href: "/share/maker/69ddcb95e60c3666ca2a34f8",
    badge: "3D Printing",
    badgeColor: "bg-orange-500",
    difficulty: "Advanced",
    duration: null,
  },
  {
    id: "69ddcb95e60c3666ca2a34f9",
    title: "UArm Palletizing Robot Arm",
    desc: "Build a miniature robotic arm with Arduino.",
    img: "https://base44.app/api/apps/69d386ad9523e2ce04536574/files/mp/public/69d386ad9523e2ce04536574/8764ae1e8_IMG_0296.jpeg",
    href: "/share/maker/69ddcb95e60c3666ca2a34f9",
    badge: "Robotics",
    badgeColor: "bg-blue-700",
    difficulty: "Advanced",
    duration: null,
  },
];

// All IDs already handled statically
const STATIC_IDS = new Set([
  "69ddcb95e60c3666ca2a34f8",
  "69ddcb95e60c3666ca2a34f9",
]);

// DB lesson titles that belong to STEM (matching MakerLessons page logic)
const STEM_DB_TITLES = new Set([
  "Puzzle Cubes", "Functional Wrenches", "Balloon Dragsters",
  "Egyptian Obelisks", "Self-Watering Planters", "Whistles", "Suspension Bridges",
]);

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

function formatDuration(minutes) {
  if (!minutes) return null;
  if (minutes >= 60) {
    const h = Math.round(minutes / 60);
    return `${h} hour${h !== 1 ? "s" : ""}`;
  }
  return `${minutes} min`;
}

function ProjectCard({ title, desc, img, href, badge, badgeColor, difficulty, duration, skillArea }) {
  const resolvedBadgeColor = badgeColor || skillBadgeColor[skillArea] || "bg-gray-500";
  const resolvedDiffColor = difficultyColor[difficulty] || "bg-gray-500";

  return (
    <Link
      to={href}
      className="group block rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white"
    >
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600">
        {img && (
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${resolvedBadgeColor}`}>
            {badge || skillArea}
          </span>
          {difficulty && (
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${resolvedDiffColor}`}>
              {difficulty}
            </span>
          )}
        </div>
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-poppins font-bold text-sm text-gray-900 group-hover:text-orange-500 transition-colors">
          {title}
        </h3>
        {desc && <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{desc}</p>}
        {duration && (
          <p className="text-xs text-orange-500 font-semibold pt-1 flex items-center gap-1">
            <Clock size={11} /> {duration}
          </p>
        )}
      </div>
    </Link>
  );
}

function SectionHeader({ title }) {
  return (
    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest pb-1 border-b border-gray-200">
      {title}
    </h2>
  );
}

export default function PublicMakerLessons() {
  const [stemDb, setStemDb] = useState([]);
  const [communityDb, setCommunityDb] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.MakerLesson.filter({ status: "published" }, "-created_date", 100)
      .then(lessons => {
        const stem = [];
        const community = [];
        lessons.forEach(l => {
          if (STATIC_IDS.has(l.id)) return; // skip already-hardcoded
          if (STEM_DB_TITLES.has(l.title)) {
            stem.push(l);
          } else {
            // Default: STEM unless tagged as community
            stem.push(l);
          }
        });
        setStemDb(stem);
        setCommunityDb(community);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <PublicProjectShell>
      <div className="max-w-4xl mx-auto space-y-10">
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-orange-400/30 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* STEM Projects */}
            <section className="space-y-4">
              <SectionHeader title="STEM Projects" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {STEM_STATIC.map(p => (
                  <ProjectCard key={p.id} {...p} />
                ))}
                {stemDb.map(l => (
                  <ProjectCard
                    key={l.id}
                    title={l.title}
                    desc={l.description}
                    img={l.thumbnail_url || l.hero_image_url}
                    href={`/share/maker/${l.id}`}
                    skillArea={l.skill_area}
                    difficulty={l.difficulty}
                    duration={formatDuration(l.estimated_minutes)}
                  />
                ))}
              </div>
            </section>

            {/* Community Projects */}
            <section className="space-y-4">
              <SectionHeader title="Community Projects" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {COMMUNITY_STATIC.map(p => (
                  <ProjectCard key={p.id} {...p} />
                ))}
                {communityDb.map(l => (
                  <ProjectCard
                    key={l.id}
                    title={l.title}
                    desc={l.description}
                    img={l.thumbnail_url || l.hero_image_url}
                    href={`/share/maker/${l.id}`}
                    skillArea={l.skill_area}
                    difficulty={l.difficulty}
                    duration={formatDuration(l.estimated_minutes)}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </PublicProjectShell>
  );
}