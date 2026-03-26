import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { uploadAssets } from "@/slices/assets/thunks";
import type { AppDispatch } from "@/app/store";
import UploadForm from "@/components/forms/UploadForm";

const UploadAssetPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleUpload = async (formData: FormData) => {
    try {
      const result = await dispatch(uploadAssets(formData)).unwrap();
      if (result.message) {
        toast.success(result.message);
      } else {
        const fileCount = formData.getAll("files").length;
        toast.success(`${fileCount} asset(s) uploaded successfully!`);
      }
      navigate("/assets");
    } catch (error) {
      toast.error((error as string) || "Upload failed");
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8">
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
