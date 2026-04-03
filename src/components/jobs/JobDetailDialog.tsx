import { getStatusBadge } from "@/lib/utils";
import { formatDuration } from "@/lib/formatters";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
} from "@/components/ui/dialog";
import { JobDialogDetailProps } from "@/slices/jobs/types";
import { Badge } from "@/components/ui/badge";

const JobDetailDialog = ({ detailsOpen, handleCloseDetails, currentJob }: JobDialogDetailProps) => {
  return (
    <Dialog open={detailsOpen} onOpenChange={handleCloseDetails}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
          <DialogDescription>Detailed information about the background job</DialogDescription>
        </DialogHeader>
        {currentJob.job && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Job Type</p>
                <p className="font-medium capitalize">{currentJob.job.jobType}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge className={getStatusBadge(currentJob.job.status)}>
                  {currentJob.job.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Asset</p>
                <p className="font-medium">{currentJob.job.assetName || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Duration</p>
                <p className="font-medium">{formatDuration(currentJob.job.durationMs)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Started</p>
                <p className="text-sm">
                  {currentJob.job.startedAt
                    ? new Date(currentJob.job.startedAt).toLocaleString()
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-sm">
                  {currentJob.job.completedAt
                    ? new Date(currentJob.job.completedAt).toLocaleString()
                    : "—"}
                </p>
              </div>
            </div>

            {currentJob.job.error && (
              <div>
                <p className="text-sm text-muted-foreground">Error</p>
                <p className="text-sm text-error bg-error/10 p-2 rounded">{currentJob.job.error}</p>
              </div>
            )}

            {currentJob.logs.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Job Logs</p>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {currentJob.logs.map((log) => (
                    <div key={log.id} className="text-sm border-l-2 border-link pl-3">
                      <p className="font-medium">{log.step}</p>
                      <p className="text-muted-foreground">{log.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(log.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailDialog;
