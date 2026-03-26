import { Spinner } from "@/components/ui/spinner";

const Loader = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Spinner className="size-20" />
    </div>
  );
};

export default Loader;
