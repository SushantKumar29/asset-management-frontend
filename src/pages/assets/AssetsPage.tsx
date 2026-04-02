import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, Eye, Download, Trash2, X } from "lucide-react";
import { fetchAssets, deleteAsset } from "@/slices/assets/thunks";
import type { AppDispatch, RootState } from "@/app/store";
import toast from "react-hot-toast";
import { formatBytes, formatMimeType } from "@/lib/formatters";
import Loader from "@/shared/ui/Loader";
import { BackToPrevious } from "@/shared/ui/BackButton";
import { PATHS } from "@/constants/path";

const AssetsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { assets, pagination, loading } = useSelector((state: RootState) => state.assets);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATHS.root);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const params: { search?: string; type?: string } = {};
    if (debouncedSearch && debouncedSearch.length >= 3) {
      params.search = debouncedSearch;
    }
    if (typeFilter && typeFilter !== "all") {
      params.type = typeFilter;
    }
    dispatch(fetchAssets(params));
  }, [dispatch, debouncedSearch, typeFilter]);

  const handleClearSearch = () => {
    setSearch("");
    setDebouncedSearch("");
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await dispatch(deleteAsset(id)).unwrap();
        toast.success("Asset deleted successfully");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete asset");
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading && assets.length === 0) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto container px-4 py-8">
        <BackToPrevious />
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Assets</h1>
            <p className="text-muted-foreground mt-1">Total: {pagination.total} assets</p>
          </div>
          <Link to="/assets/upload">
            <Button>Upload New</Button>
          </Link>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-10"
                />
                {search && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {assets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {search ? "No assets match your search" : "No assets found"}
            </p>
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium">
                          <Link to={`/assets/${asset.id}`} className="hover:text-link">
                            {asset.name}
                          </Link>
                        </TableCell>
                        <TableCell>{formatMimeType(asset.mimeType) || "file"}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {formatBytes(asset.fileSize || 0)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {asset.views || 0}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {asset.downloads || 0}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(asset.createdAt as string).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(asset.id, asset.name)}
                            className="text-error hover:text-error"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AssetsPage;
