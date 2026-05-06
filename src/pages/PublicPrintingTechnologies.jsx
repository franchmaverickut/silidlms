import PrintingTechnologiesProject from "./PrintingTechnologiesProject";
import PublicProjectShell from "@/components/maker/PublicProjectShell";

export default function PublicPrintingTechnologies() {
  return (
    <PublicProjectShell>
      <PrintingTechnologiesProject isPublic={true} />
    </PublicProjectShell>
  );
}