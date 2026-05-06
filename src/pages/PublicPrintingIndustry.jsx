import PrintingIndustryProject from "./PrintingIndustryProject";
import PublicProjectShell from "@/components/maker/PublicProjectShell";

export default function PublicPrintingIndustry() {
  return (
    <PublicProjectShell>
      <PrintingIndustryProject isPublic={true} />
    </PublicProjectShell>
  );
}