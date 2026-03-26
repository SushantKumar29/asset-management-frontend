import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RecentActivityProps {
  activities: Array<{
    user: string;
    action: string;
    assetName: string;
    type: string;
    createdAt: string;
  }> | null;
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "upload":
      return "bg-success";
    case "view":
      return "bg-link";
    case "download":
      return "bg-warning";
    default:
      return "bg-muted-foreground";
  }
};

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions on your assets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities?.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 pb-3 border-b border-border last:border-0"
            >
              <div className={`w-2 h-2 mt-2 rounded-full ${getActivityColor(activity.type)}`} />
              <div className="flex-1">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user}</span> {activity.action}
                  <span className="font-medium"> {activity.assetName}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              </div>
              {activity.type === "upload" && (
                <Badge variant="outline" className="text-success">
                  New
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
