import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import AppLayout from '@/components/layout/AppLayout';

// Pages
import Dashboard from '@/pages/Dashboard';
import Courses from '@/pages/Courses';
import CourseDetail from '@/pages/CourseDetail';
import CourseEditor from '@/pages/CourseEditor';
import CourseBuilder from '@/pages/CourseBuilder';
import LessonViewer from '@/pages/LessonViewer';
import TeacherDashboard from '@/pages/TeacherDashboard';
import Submissions from '@/pages/Submissions';
import Achievements from '@/pages/Achievements';
import AdminPanel from '@/pages/AdminPanel';
import MakerLessons from '@/pages/MakerLessons';
import MakerLessonViewer from '@/pages/MakerLessonViewer';
import MakerLessonBuilder from '@/pages/MakerLessonBuilder';
import SpinningTopsProject from '@/pages/SpinningTopsProject';
import EmojiTokensProject from '@/pages/EmojiTokensProject';
import RubberBandCarProject from '@/pages/RubberBandCarProject';
import PublicCourseViewer from '@/pages/PublicCourseViewer';
import PublicMakerLessonViewer from '@/pages/PublicMakerLessonViewer';
import PublicSpinningTops from '@/pages/PublicSpinningTops';
import PublicEmojiTokens from '@/pages/PublicEmojiTokens';
import PublicRubberBandCar from '@/pages/PublicRubberBandCar';
import PublicMakerLessons from '@/pages/PublicMakerLessons';
import PublicCourses from '@/pages/PublicCourses';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <p className="text-muted-foreground text-sm font-medium">Loading SilidLMS...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/new" element={<CourseEditor />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses/:id/edit" element={<CourseEditor />} />
        <Route path="/courses/:id/builder" element={<CourseBuilder />} />
        <Route path="/lessons/:id" element={<LessonViewer />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/submissions" element={<Submissions />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/maker" element={<MakerLessons />} />
        <Route path="/maker/new" element={<MakerLessonBuilder />} />
        <Route path="/maker/:id" element={<MakerLessonViewer />} />
        <Route path="/maker/:id/edit" element={<MakerLessonBuilder />} />
        <Route path="/maker/spinning-tops" element={<SpinningTopsProject />} />
        <Route path="/maker/emoji-tokens" element={<EmojiTokensProject />} />
        <Route path="/maker/rubber-band-car" element={<RubberBandCarProject />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route path="/share/course/:id" element={<PublicCourseViewer />} />
          <Route path="/share/maker/:id" element={<PublicMakerLessonViewer />} />
          <Route path="/share/maker" element={<PublicMakerLessons />} />
          <Route path="/share/courses" element={<PublicCourses />} />
          <Route path="/share/spinning-tops" element={<PublicSpinningTops />} />
          <Route path="/share/emoji-tokens" element={<PublicEmojiTokens />} />
          <Route path="/share/rubber-band-car" element={<PublicRubberBandCar />} />
          <Route path="*" element={
            <AuthProvider>
              <AuthenticatedApp />
            </AuthProvider>
          } />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App