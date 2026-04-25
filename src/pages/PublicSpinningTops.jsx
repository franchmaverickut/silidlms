import SpinningTopsProject from "./SpinningTopsProject";
import PublicProjectShell from "@/components/maker/PublicProjectShell";

export default function PublicSpinningTops() {
  return (
    <PublicProjectShell>
      <SpinningTopsProject isPublic />
    </PublicProjectShell>
  );
}