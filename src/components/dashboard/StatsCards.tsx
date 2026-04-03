import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBytes } from "@/lib/formatters";
import type { StatsCardsProps } from "@/slices/dashboard/types";
import {
  FolderOpen,
  Clock,
  CheckCircle2,
  XCircle,
  HardDrive,
  Image,
  Video,
  FileText,
  Music,
} from "lucide-react";

const StatsCards = ({ summary, distribution }: StatsCardsProps) => {
  const stats = [
    {
      title: "Total Assets",
      value: summary?.totalAssets || 0,
      icon: FolderOpen,
      color: "text-link",
      bgColor: "bg-link/10",
      description: "All assets in library",
    },
    {
      title: "Pending",
      value: summary?.pending || 0,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
      description: "Awaiting processing",
    },
    {
      title: "Processed",
      value: summary?.processed || 0,
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
      description: "Successfully processed",
    },
    {
      title: "Failed",
      value: summary?.failed || 0,
      icon: XCircle,
      color: "text-error",
      bgColor: "bg-error/10",
      description: "Processing failed",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Card className="hover:shadow-lg transition-all hover:-translate-y-1 md:col-span-2 lg:col-span-4">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Storage Summary
          </CardTitle>
          <div className="p-2 rounded-lg bg-muted">
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Size</div>
              <div className="text-xl font-bold text-foreground">
                {formatBytes(summary?.totalSizeBytes || 0)}
              </div>
            </div>

            <div className="flex-1">
              <div className="text-sm text-muted-foreground mb-2">Asset Distribution</div>
              <div className="flex gap-4">
                {distribution?.map((item) => (
                  <div key={item.type} className="flex items-center gap-2">
                    {item.type === "image" && <Image className="h-4 w-4 text-link" />}
                    {item.type === "video" && <Video className="h-4 w-4 text-link" />}
                    {item.type === "document" && <FileText className="h-4 w-4 text-link" />}
                    {item.type === "audio" && <Music className="h-4 w-4 text-link" />}
                    <span className="text-sm font-medium">
                      {item.type}: {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
