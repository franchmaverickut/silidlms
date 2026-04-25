export default function PublicProjectShell({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-50 shadow-sm">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-orange-500 border border-gray-200 hover:border-orange-300 rounded-lg px-3 py-1.5 transition-colors flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold text-orange-500 font-poppins">Silid</span>
          <span className="text-lg font-extrabold text-gray-800 font-poppins">LMS</span>
          <span className="ml-1 text-xs text-gray-400 hidden sm:block">Maker Projects</span>
        </div>
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