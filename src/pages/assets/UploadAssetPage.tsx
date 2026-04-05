import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { uploadAssets } from "@/slices/assets/thunks";
import type { AppDispatch, RootState } from "@/app/store";
import UploadForm from "@/components/forms/UploadForm";
import { useEffect } from "react";
import { BackToPrevious } from "@/shared/ui/BackButton";
import { PATHS } from "@/constants/path";

const UploadAssetPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATHS.login);
    }
  }, [isAuthenticated, navigate]);

  const handleUpload = async (formData: FormData) => {
    try {
      const result = await dispatch(uploadAssets(formData)).unwrap();
      if (result.message) {
        toast.success(result.message);
      } else {
        const fileCount = formData.getAll("files").length;
        toast.success(`${fileCount} asset(s) uploaded successfully!`);
      }
      navigate(PATHS.assets);
    } catch (error) {
      toast.error((error as string) || "Upload failed");
      throw error;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto container px-4 py-8">
        <BackToPrevious />
        <Card>
          <CardHeader>
            <CardTitle>Upload Assets</CardTitle>
            <CardDescription>Upload up to 10 digital assets to your library</CardDescription>
          </CardHeader>
          <CardContent>
            <UploadForm onSubmit={handleUpload} isUploading={false} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadAssetPage;
