import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssetById, deleteAsset } from "@/slices/assets/thunks";
import { fetchAssetTags } from "@/slices/tags/thunks";
import { fetchAssetUsage, trackUsage } from "@/slices/usage/thunks";
import type { AppDispatch, RootState } from "@/app/store";
import toast from "react-hot-toast";
import Loader from "@/shared/ui/Loader";
import AssetPreview from "@/components/asset/AssetPreview";
import AssetMetadata from "@/components/asset/AssetMetadata";
import AssetTabs from "@/components/asset/AssetTabs";
import { USAGE_ACTIONS, USAGE_CHANNELS } from "@/constants/assets";
import { BackToPrevious } from "@/shared/ui/BackButton";
import { PATHS } from "@/constants/path";

const AssetDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { currentAsset, loading } = useSelector((state: RootState) => state.assets);
  const { tags } = useSelector((state: RootState) => state.tags);
  const { usageStats } = useSelector((state: RootState) => state.usage);
  const [activeTab, setActiveTab] = useState("details");
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATHS.login);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (id) {
      dispatch(fetchAssetById(id));
      dispatch(fetchAssetTags(id));
      dispatch(fetchAssetUsage(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && currentAsset && !hasTrackedRef.current) {
      dispatch(
        trackUsage({ assetId: id, action: USAGE_ACTIONS.view, channel: USAGE_CHANNELS.web })
      );
      hasTrackedRef.current = true;
    }
  }, [dispatch, id, currentAsset]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this asset?")) {
      try {
        await dispatch(deleteAsset(id!)).unwrap();
        toast.success("Asset deleted successfully");
        navigate(PATHS.assets);
      } catch {
        toast.error("Failed to delete asset");
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading && !currentAsset) {
    return <Loader />;
  }

  if (!currentAsset) {
    return (
      <div className="mt-16 pt-16 flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Asset not found</p>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="mx-auto container px-4 py-8">
        <BackToPrevious />
        <div className="flex items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-foreground">{currentAsset.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AssetPreview asset={currentAsset} user={user} onDelete={handleDelete} />
          <AssetMetadata asset={currentAsset} tags={tags} />
        </div>

        <div className="mt-6">
          <AssetTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            asset={currentAsset}
            usageStats={usageStats}
          />
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsPage;
