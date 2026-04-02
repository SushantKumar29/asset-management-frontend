import type { RootState } from "@/app/store";
import Dashboard from "@/components/Dashboard";
import { PATHS } from "@/constants/path";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATHS.login);
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }
  return <Dashboard />;
};

export default HomePage;
