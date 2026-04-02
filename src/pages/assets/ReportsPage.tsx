import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Download, FileBarChart } from "lucide-react";
import toast from "react-hot-toast";
import { createReport, fetchMyReports, downloadReport } from "@/slices/reports/thunks";
import { clearError } from "@/slices/reports/reportsSlice";
import type { AppDispatch, RootState } from "@/app/store";
import Loader from "@/shared/ui/Loader";
import { useNavigate } from "react-router";
import { BackToPrevious } from "@/shared/ui/BackButton";
import { PATHS } from "@/constants/path";

const ReportsPage = () => {
  const [reportType, setReportType] = useState("usage");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });
  const [generating, setGenerating] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { reports, loading, downloading, error } = useSelector((state: RootState) => state.reports);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATHS.login);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(fetchMyReports());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleGenerateReport = async () => {
    setGenerating(true);
    try {
      await dispatch(
        createReport({
          type: reportType,
          from: dateRange.from,
          to: dateRange.to,
        })
      ).unwrap();
      toast.success("Report generated successfully!");
      dispatch(fetchMyReports());
    } catch (error) {
      toast.error((error as string) || "Failed to generate report");
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async (reportId: string) => {
    try {
      const result = await dispatch(downloadReport(reportId)).unwrap();
      const url = window.URL.createObjectURL(result.blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to download report");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getReportTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      usage: "Usage Report",
      performance: "Performance Report",
      compliance: "Compliance Report",
      summary: "Summary Report",
    };
    return types[type] || type;
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading && reports.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto container px-4 py-8">
        <BackToPrevious />
        <Card>
          <CardHeader>
            <CardTitle>Generate Reports</CardTitle>
            <CardDescription>Create custom reports for asset analytics and usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usage">Usage Report</SelectItem>
                  <SelectItem value="performance">Performance Report</SelectItem>
                  <SelectItem value="compliance">Compliance Report</SelectItem>
                  <SelectItem value="summary">Summary Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Date Range</label>
              <div className="flex gap-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PPP") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => date && setDateRange({ ...dateRange, from: date })}
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex-1">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PPP") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => date && setDateRange({ ...dateRange, to: date })}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleGenerateReport} disabled={generating}>
                <FileBarChart className="mr-2 h-4 w-4" />
                {generating ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Previous Reports</CardTitle>
            <CardDescription>Your recently generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No reports generated yet</p>
            ) : (
              <div className="space-y-3">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {getReportTypeLabel(report.type)} -{" "}
                        {formatDate(report.dateRange?.from || report.createdAt)} to{" "}
                        {formatDate(report.dateRange?.to || report.createdAt)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Generated on {formatDate(report.createdAt)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(report.id)}
                      disabled={downloading}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
