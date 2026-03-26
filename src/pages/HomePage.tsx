import type { RootState } from "@/app/store";
import Dashboard from "@/components/Dashboard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const HomePage = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default HomePage;
