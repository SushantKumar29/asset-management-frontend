import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SignupPage from "@/pages/SignupPage";

jest.mock("@/lib/axios", () => ({
  __esModule: true,
}));

jest.mock("@/components/forms/SignupForm", () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: (data: unknown) => void }) => (
    <button
      onClick={() => onSubmit({ email: "test@test.com", password: "123456", name: "Test User" })}
    >
      Submit Signup
    </button>
  ),
}));

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const mockRegisterUser = jest.fn();
jest.mock("@/slices/auth/thunks", () => ({
  registerUser: (...args: unknown[]) => mockRegisterUser(...args),
}));

describe("SignupPage", () => {
  const renderWithProvider = (isAuthenticated = false) => {
    const store = configureStore({
      reducer: {
        auth: () => ({ isAuthenticated, loading: false, error: null }),
      },
    });

    render(
      <Provider store={store}>
        <SignupPage />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to home if already authenticated", () => {
    renderWithProvider(true);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should render signup form when not authenticated", () => {
    renderWithProvider(false);
    expect(screen.getByText("Submit Signup")).toBeInTheDocument();
  });

  it("should handle signup submission", async () => {
    mockRegisterUser.mockReturnValue({
      unwrap: () => Promise.resolve({ user: { id: 1 } }),
    });

    renderWithProvider(false);
    await userEvent.click(screen.getByText("Submit Signup"));

    expect(mockRegisterUser).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "123456",
      name: "Test User",
    });
  });
});
