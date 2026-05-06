import QuickClipsProject from "./QuickClipsProject";
import PublicProjectShell from "@/components/maker/PublicProjectShell";

export default function PublicQuickClips() {
  return (
    <PublicProjectShell>
      <QuickClipsProject isPublic={true} />
    </PublicProjectShell>
  );
}