import RubberBandCarProject from "./RubberBandCarProject";
import PublicProjectShell from "@/components/maker/PublicProjectShell";

export default function PublicRubberBandCar() {
  return (
    <PublicProjectShell>
      <RubberBandCarProject isPublic />
    </PublicProjectShell>
  );
}