import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Distribution } from "@/slices/analytics/types";

export const TypeDistribution = ({ distributions }: { distributions: Distribution[] | null }) => {
  if (!distributions?.length) {
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

  const maxCount = Math.max(...distributions.map((t) => t.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets by Type</CardTitle>
        <CardDescription>Distribution by file type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {distributions.map((item) => (
            <TypeItem key={item.type} item={item} maxCount={maxCount} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const TypeItem = ({ item, maxCount }: { item: Distribution; maxCount: number }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="capitalize">{item.type}</span>
      <div className="flex gap-4">
        <span>{item.count} assets</span>
        <span className="text-muted-foreground">{item.totalViews} views</span>
      </div>
    </div>
    <Progress value={(item.count / maxCount) * 100} className="h-2" />
  </div>
);
