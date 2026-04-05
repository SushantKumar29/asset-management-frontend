import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Upload, BarChart3, FileText } from "lucide-react";
import { PATHS } from "@/constants/path";

const QuickActions = () => {
  const actions = [
    {
      id: "upload",
      to: PATHS.assetsUpload,
      label: "Upload New Asset",
      icon: Upload,
      variant: "default",
    },
    {
      id: "assets",
      to: PATHS.assets,
      label: "View All Assets",
      icon: FolderOpen,
      variant: "outline",
    },
    {
      id: "reports",
      to: PATHS.reports,
      label: "Generate Reports",
      icon: FileText,
      variant: "outline",
    },
    {
      id: "analytics",
      to: PATHS.analytics,
      label: "View Analytics",
      icon: BarChart3,
      variant: "outline",
    },
  ];

  return (
    <Card className="lg:col-span-2 mt-8">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.id} to={action.to}>
                <Button
                  variant={action.variant as "outline" | "default"}
                  className={action.variant === "default" ? "bg-link hover:bg-link-hover" : ""}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
