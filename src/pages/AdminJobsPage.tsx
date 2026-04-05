import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { fetchJobs, fetchJobDetails } from "@/slices/jobs/thunks";
import { clearCurrentJob } from "@/slices/jobs/jobsSlice";
import type { AppDispatch, RootState } from "@/app/store";
import { useNavigate } from "react-router";
import Loader from "@/shared/ui/Loader";
import { BackToPrevious } from "@/shared/ui/BackButton";
import { PATHS } from "@/constants/path";
import JobDetailDialog from "@/components/jobs/JobDetailDialog";
import JobList from "@/components/jobs/JobList";
import { ROLES } from "@/constants/auth";

const AdminJobsPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { jobs, currentJob, loading } = useSelector((state: RootState) => state.jobs);
  const isAdmin = user?.role === ROLES.admin;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATHS.login);
    }
    if (!isAdmin) {
      navigate(PATHS.root);
    }
  }, [isAuthenticated, navigate, isAdmin]);

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

  if (!isAuthenticated || !isAdmin) {
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

        <JobList jobs={jobs} handleViewDetails={handleViewDetails} />

        <JobDetailDialog
          detailsOpen={detailsOpen}
          handleCloseDetails={handleCloseDetails}
          currentJob={currentJob}
        />
      </div>
    </div>
  );
};

export default AdminJobsPage;
