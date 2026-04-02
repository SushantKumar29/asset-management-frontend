import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import type { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import { loginUser } from "@/slices/auth/thunks";
import LoginForm from "@/components/forms/LoginForm";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data: LoginFormValues) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error((err as Error)?.message || "Login failed");
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="mt-16 pt-16 flex items-center justify-center">
      <div className="w-full max-w-2xl border-primary border-t-4 rounded-xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome to Digital Asset Management
          </h1>
          <p className="text-sm sm:text-base">Login to continue</p>
        </div>

        <LoginForm onSubmit={handleLogin} />

        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-link font-medium">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
