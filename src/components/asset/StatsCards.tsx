import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnalyticSummary } from "@/slices/analytics/types";
import { Eye, Download, Users, HardDrive } from "lucide-react";

const statsConfig = [
  {
    title: "Total Assets",
    key: "totalAssets",
    icon: HardDrive,
    color: "text-link",
    description: "Assets in library",
  },
  {
    title: "Total Views",
    key: "totalViews",
    icon: Eye,
    color: "text-link",
    description: "All-time views",
  },
  {
    title: "Total Downloads",
    key: "totalDownloads",
    icon: Download,
    color: "text-success",
    description: "All-time downloads",
  },
  {
    title: "Unique Users",
    key: "uniqueUsers",
    icon: Users,
    color: "text-warning",
    description: "Total unique users",
  },
] as const;

export const StatsCards = ({ summary }: { summary: AnalyticSummary | null }) => {
  const uniqueUsers = Number(summary?.uniqueViewers || 0) + Number(summary?.uniqueDownloaders || 0);

  const getValue = (key: string) => {
    if (key === "uniqueUsers") return uniqueUsers;
    return summary?.[key as keyof typeof summary] || 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat) => {
        const Icon = stat.icon;
        const value = getValue(stat.key);

        return (
          <Card key={stat.key}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {typeof value === "number" ? value.toLocaleString() : value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
