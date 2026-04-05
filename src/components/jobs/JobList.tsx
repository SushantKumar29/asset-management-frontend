import { getStatusBadge } from "@/lib/utils";
import { formatDuration } from "@/lib/formatters";
import { Eye } from "lucide-react";
import { Job } from "@/slices/jobs/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const JobList = ({
  jobs,
  handleViewDetails,
}: {
  jobs: Job[];
  handleViewDetails: (id: string) => void;
}) => {
  console.log("🚀 ~ AdminJobsPage ~ jobs:", jobs);

  return (
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
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(job.id)}>
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
  );
};

export default JobList;
