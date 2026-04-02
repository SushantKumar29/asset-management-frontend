import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Tag } from "lucide-react";
import { formatBytes, formatDate } from "@/lib/formatters";
import type { Asset } from "@/slices/assets/types";
import { getStatusBadge } from "@/lib/utils";

interface AssetMetadataProps {
  asset: Asset;
  tags: Array<{ id: string; name: string }> | null;
}

const AssetMetadata = ({ asset, tags }: AssetMetadataProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Asset information and details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Owner</p>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback>{asset.ownerName?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{asset.ownerName || "Unknown"}</span>
          </div>
        </div>

        <Separator />
        <div>
          <p className="text-sm font-medium mb-2">Description</p>
          <p className="text-sm text-muted-foreground">
            {asset.description || "No description provided"}
          </p>
        </div>
        <Separator />

        <div>
          <p className="text-sm text-muted-foreground mb-1">File Info</p>
          <div className="space-y-1 text-sm">
            <p>Type: {asset.mimeType}</p>
            <p>Size: {formatBytes(asset.fileSize)}</p>
            <p>Format: {asset.mimeType?.split("/")[1]?.toUpperCase()}</p>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground mb-1">Status</p>
          <Badge className={getStatusBadge(asset.status)}>{asset.status}</Badge>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground mb-1">Dates</p>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>Created: {formatDate(asset.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <span>Updated: {formatDate(asset.updatedAt)}</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm text-muted-foreground mb-2">Tags</p>
          <div className="flex flex-wrap gap-2">
            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag.name}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No tags</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetMetadata;
