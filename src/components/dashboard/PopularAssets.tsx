import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Image, Video, FileText, Music, FolderOpen } from "lucide-react";
import { formatMimeType } from "@/lib/formatters";
import type { PopularAssetsProps } from "@/slices/assets/types";

const getTypeIcon = (type: string) => {
  switch (formatMimeType(type)) {
    case "image":
      return <Image className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    case "document":
      return <FileText className="h-4 w-4" />;
    case "audio":
      return <Music className="h-4 w-4" />;
    default:
      return <FolderOpen className="h-4 w-4" />;
  }
};

const PopularAssets = ({ assets }: PopularAssetsProps) => {
  return (
    <Card className="lg:col-span-2 mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Most Popular Assets</CardTitle>
            <CardDescription>Based on usage and views</CardDescription>
          </div>
          <Link to="/assets">
            <Button variant="ghost" size="sm" className="text-link hover:text-link-hover">
              View All
              <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assets?.map((asset) => {
            return (
              <div
                key={asset.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getTypeIcon(asset.mimeType)}
                  <div>
                    <p className="font-medium text-foreground">{asset.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {asset.type} • {asset.views} views • {asset.downloads} downloads
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularAssets;
