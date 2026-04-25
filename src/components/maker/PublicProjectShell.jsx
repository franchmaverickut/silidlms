import { Link } from "react-router-dom";

export default function PublicProjectShell({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold text-orange-500 font-poppins">Silid</span>
          <span className="text-lg font-extrabold text-gray-800 font-poppins">LMS</span>
          <span className="ml-2 text-xs text-gray-400 hidden sm:block">Maker Projects</span>
        </div>
        <a
          href="/"
          className="text-xs text-orange-500 font-semibold hover:underline"
        >
          Sign in →
        </a>
      </div>

      {/* Content */}
      <div className="py-6 px-4">
        {children}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 py-6 text-center">
        <p className="text-xs text-gray-400">Powered by <span className="font-semibold text-orange-500">SilidLMS</span></p>
      </div>
    </div>
  );
}