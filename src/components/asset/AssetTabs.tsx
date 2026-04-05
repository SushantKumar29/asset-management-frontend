import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Activity,
  Eye,
  Download,
  User,
  CheckCircle2,
  XCircle,
  Loader2,
  Clock,
} from "lucide-react";
import type { AssetTabsProps } from "@/shared/types/asset";

const ProcessingStatus = ({ status }: { status: object }) => {
  const getStatusIcon = (value: boolean | string) => {
    if (value === true) return <CheckCircle2 className="h-4 w-4 text-success" />;
    if (value === false) return <XCircle className="h-4 w-4 text-error" />;
    if (value === "pending") return <Clock className="h-4 w-4 text-warning" />;
    if (value === "processing") return <Loader2 className="h-4 w-4 text-primary animate-spin" />;
    return null;
  };

  const formatLabel = (key: string) => {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <div className="space-y-2">
      {Object.entries(status).map(([key, value]) => (
        <div
          key={key}
          className="flex items-center justify-between py-1 border-b border-border last:border-0"
        >
          <span className="text-sm font-medium">{formatLabel(key)}</span>
          <div className="flex items-center gap-2">
            {typeof value === "boolean" ? (
              <>{getStatusIcon(value)}</>
            ) : (
              <>
                {getStatusIcon(value)}
                <span className="text-sm text-muted-foreground capitalize">{value}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const AssetTabs = ({ activeTab, onTabChange, asset, usageStats }: AssetTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="details" className="gap-2">
          <FileText className="h-4 w-4" />
          Details
        </TabsTrigger>
        <TabsTrigger value="activity" className="gap-2">
          <Activity className="h-4 w-4" />
          Activity
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="mt-6">
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-1">Processing Status</p>
                  <ProcessingStatus status={asset.processingStatus} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="activity" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity Stats</CardTitle>
            <CardDescription>Usage metrics for this asset</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Eye className="h-8 w-8 text-link mx-auto mb-2" />
                <p className="text-2xl font-bold">{usageStats?.views || 0}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Download className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-2xl font-bold">{usageStats?.downloads || 0}</p>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <User className="h-8 w-8 text-warning mx-auto mb-2" />
                <p className="text-2xl font-bold">{usageStats?.uniqueUsers || 0}</p>
                <p className="text-sm text-muted-foreground">Unique Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AssetTabs;
