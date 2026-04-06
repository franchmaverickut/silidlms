import { Card } from "@/components/ui/card";

export default function StatsCard({ icon: Icon, label, value, color = "primary", trend }) {
  const colorMap = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/15 text-secondary",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <Card className="p-5 border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <p className="text-2xl font-poppins font-bold text-foreground mt-1">{value}</p>
          {trend && <p className="text-xs text-secondary font-medium mt-1">{trend}</p>}
        </div>
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
      </div>
    </Card>
  );
}