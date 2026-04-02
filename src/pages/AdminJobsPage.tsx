import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RefreshCw, Eye } from "lucide-react";
import { fetchJobs, fetchJobDetails } from "@/slices/jobs/thunks";
import { clearCurrentJob } from "@/slices/jobs/jobsSlice";
import type { AppDispatch, RootState } from "@/app/store";
import { formatDuration } from "@/lib/formatters";
import { getStatusBadge } from "@/lib/utils";
import { useNavigate } from "react-router";
import Loader from "@/shared/ui/Loader";
import { BackToPrevious } from "@/shared/ui/BackButton";
import { PATHS } from "@/constants/path";

const AdminJobsPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { jobs, currentJob, loading } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATHS.login);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(fetchJobs({ status: statusFilter !== "all" ? statusFilter : undefined }));
  }, [dispatch, statusFilter]);

  const refresh = () => {
    dispatch(fetchJobs({ status: statusFilter !== "all" ? statusFilter : undefined }));
  };

  const handleViewDetails = async (jobId: string) => {
    setDetailsOpen(true);
    await dispatch(fetchJobDetails(jobId));
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    dispatch(clearCurrentJob());
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading && jobs.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto container px-4 py-8">
        <BackToPrevious />
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Background Jobs</h1>
            <p className="text-muted-foreground mt-1">
              Monitor and track background processing tasks
            </p>
          </div>
          <Button variant="outline" onClick={refresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Queue</CardTitle>
            <CardDescription>Recent background jobs and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Type</TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Started</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium capitalize">{job.jobType}</TableCell>
                      <TableCell>{job.assetName || "—"}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(job.status)}>{job.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {job.startedAt ? new Date(job.startedAt).toLocaleTimeString() : "—"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {job.status === "running" ? "..." : formatDuration(job.durationMs)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewDetails(job.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

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
                    <p className="text-sm text-error bg-error/10 p-2 rounded">
                      {currentJob.job.error}
                    </p>
                  </div>
                )}

                {currentJob.logs.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Job Logs</p>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {currentJob.logs.map((log, index) => (
                        <div key={index} className="text-sm border-l-2 border-link pl-3">
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
      </div>
    </div>
  );
};

export default AdminJobsPage;
