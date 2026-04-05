import { LoginFormData } from "@/lib/validations/login";
import { SignupFormData } from "@/lib/validations/signup";

export type LoginFormProps = {
  onSubmit: (data: LoginFormData) => Promise<void>;
};

export type SignupFormProps = {
  onSubmit: (data: SignupFormData) => Promise<void>;
};

export interface UploadFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isUploading: boolean;
}
