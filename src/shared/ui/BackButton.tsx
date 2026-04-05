import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { BackButtonProps } from "../types/ui";

export const BackButton = ({ to = "/", label = "Back" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button variant="ghost" size="sm" onClick={() => navigate(to)}>
      <ArrowLeft className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );
};

export const BackToPrevious = ({ label = "Back" }: { label?: string }) => {
  const navigate = useNavigate();

  return (
    <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
      <ArrowLeft className="h-4 w-4 mr-2" />
      {label}
    </Button>
  );
};
