import { Link } from "react-router-dom";
import PublicProjectShell from "@/components/maker/PublicProjectShell";

const PROJECTS = [
  {
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
    title: "Emoji Tokens",
    desc: "Design & 3D print emoji tokens for a feedback or communication system.",
    img: "https://media.base44.com/images/public/69d386ad9523e2ce04536574/4dc8cba41_EmojiTokenCover.png",
    href: "/share/emoji-tokens",
    badge: "3D Printing",
    badgeColor: "bg-yellow-500",
    difficulty: "Basic",
    duration: "3 hours",
  },
  {
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

const difficultyColor = {
  Basic: "bg-green-600",
  Advanced: "bg-red-600",
};

export default function PublicMakerLessons() {
  return (
    <PublicProjectShell>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <Link
              key={project.href}
              to={project.href}
              className="group block rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all bg-white"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${project.badgeColor}`}>
                    {project.badge}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${difficultyColor[project.difficulty]}`}>
                    {project.difficulty}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-poppins font-bold text-sm text-gray-900 group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{project.desc}</p>
                {project.duration && (
                  <p className="text-xs text-orange-500 font-semibold pt-1">⏱ {project.duration}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PublicProjectShell>
  );
}