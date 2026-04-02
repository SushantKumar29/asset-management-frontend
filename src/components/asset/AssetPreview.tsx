import { useDispatch } from "react-redux";
import { formatMimeType } from "@/lib/formatters";
import { FileText, File, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AssetPreviewProps } from "@/shared/types/asset";
import { trackUsage } from "@/slices/usage/thunks";
import { USAGE_ACTIONS, USAGE_CHANNELS } from "@/constants/assets";
import type { AppDispatch } from "@/app/store";

const AssetPreview = ({ asset, user, onDelete }: AssetPreviewProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isOwner = user?.id === asset.ownerId;
  const type = formatMimeType(asset.mimeType);

  const handleDownload = async () => {
    await dispatch(
      trackUsage({
        assetId: asset.id,
        action: USAGE_ACTIONS.download,
        channel: USAGE_CHANNELS.web,
      })
    );

    const link = document.createElement("a");
    link.href = asset.path;
    link.download = asset.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPreviewComponent = () => {
    switch (type) {
      case "image":
        return (
          <img
            src={asset.path}
            alt={asset.name}
            className="max-w-full max-h-100 object-contain rounded-lg"
          />
        );
      case "video":
        return (
          <video controls className="max-w-full max-h-100 rounded-lg">
            <source src={asset.path} />
          </video>
        );
      case "audio":
        return (
          <audio controls className="w-full">
            <source src={asset.path} />
          </audio>
        );
      case "document":
        return (
          <div className="text-center">
            <File className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-4">Document preview not available</p>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              View or Download Document
            </Button>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Preview not available</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        );
    }
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Asset preview and quick actions</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            {user && isOwner && (
              <Button variant="destructive" size="sm" onClick={onDelete}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center aspect-video bg-muted/30 rounded-lg p-8">
          {getPreviewComponent()}
        </div>
      </CardContent>
    </Card>
  );
};

export default AssetPreview;
