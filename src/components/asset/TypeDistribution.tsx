import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Distribution } from "@/slices/analytics/types";

export const TypeDistribution = ({ distribution }: { distribution: Distribution[] | null }) => {
  if (!distribution?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Assets by Type</CardTitle>
          <CardDescription>Distribution by file type</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">No type data available</p>
        </CardContent>
      </Card>
    );
  }

  const maxCount = Math.max(...distribution.map((t) => t.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets by Type</CardTitle>
        <CardDescription>Distribution by file type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {distribution.map((type) => (
            <TypeItem key={type.type} type={type} maxCount={maxCount} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const TypeItem = ({ type, maxCount }: { type: Distribution; maxCount: number }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="capitalize">{type.type}</span>
      <div className="flex gap-4">
        <span>{type.count} assets</span>
        <span className="text-muted-foreground">{type.totalViews} views</span>
      </div>
    </div>
    <Progress value={(type.count / maxCount) * 100} className="h-2" />
  </div>
);
