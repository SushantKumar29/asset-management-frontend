import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatMimeType } from "@/lib/formatters";
import type { PopularAssets } from "@/slices/analytics/types";

export const TopAssets = ({ assets }: { assets: PopularAssets[] | null }) => {
  const assetsPresent = assets && assets?.length > 0;
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Top Performing Assets</CardTitle>
        <CardDescription>Most viewed and downloaded assets</CardDescription>
      </CardHeader>
      <CardContent>
        {assetsPresent ? (
          <div className="space-y-4">
            {assets.map((asset) => (
              <AssetItem key={asset.id} asset={asset} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">No asset data available</p>
        )}
      </CardContent>
    </Card>
  );
};

const AssetItem = ({ asset }: { asset: PopularAssets }) => (
  <div className="flex items-center justify-between">
    <div className="flex-1">
      <p className="font-medium text-foreground">{asset.name}</p>
      <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
        <span>{formatMimeType(asset.mimeType)}</span>
        <span>{asset.views} views</span>
        <span>{asset.downloads} downloads</span>
      </div>
    </div>
  </div>
);
