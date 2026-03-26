import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import SignupForm from "@/components/forms/SignupForm";
import type { SignupFormData } from "@/lib/validations/signup";
import type { AppDispatch, RootState } from "@/app/store";
import { registerUser } from "@/slices/auth/thunks";

const SignupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = async (data: SignupFormData) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success("Signup successful");
      navigate("/login");
    } catch (err) {
      toast.error((err as Error)?.message || "Signup failed");
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
          <p className="text-sm sm:text-base">Create your account</p>
        </div>
        <SignupForm onSubmit={handleSignup} />
      </div>
    </div>
  );
};

export default SignupPage;
