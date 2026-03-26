import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FolderOpen, Upload, BarChart3, FileText } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      to: "/assets/upload",
      label: "Upload New Asset",
      icon: Upload,
      variant: "default",
    },
    {
      to: "/assets",
      label: "View All Assets",
      icon: FolderOpen,
      variant: "outline",
    },
    {
      to: "/reports",
      label: "Generate Reports",
      icon: FileText,
      variant: "outline",
    },
    {
      to: "/analytics",
      label: "View Analytics",
      icon: BarChart3,
      variant: "outline",
    },
  ];

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.to}>
                <Button
                  variant={action.variant as "outline" | "default"}
                  className={
                    action.variant === "default" ? "bg-link hover:bg-link-hover text-white" : ""
                  }
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
