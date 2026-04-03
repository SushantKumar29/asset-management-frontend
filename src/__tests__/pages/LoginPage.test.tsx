import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import LoginPage from "@/pages/LoginPage";

const mockLoginUser = jest.fn();
jest.mock("@/slices/auth/thunks", () => ({
  loginUser: (...args: unknown[]) => mockLoginUser(...args),
  registerUser: jest.fn(),
}));

jest.mock("@/lib/axios", () => ({
  __esModule: true,
}));

jest.mock("@/components/forms/LoginForm", () => ({
  __esModule: true,
  default: ({ onSubmit }: { onSubmit: (data: unknown) => void }) => (
    <button onClick={() => onSubmit({ email: "test@test.com", password: "123456" })}>
      Submit Login
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

describe("LoginPage", () => {
  const renderWithProvider = (isAuthenticated = false) => {
    const store = configureStore({
      reducer: {
        auth: (
          state = { isAuthenticated, loading: false, error: null },
          action: { type: string }
        ) => {
          if (action.type === "auth/login/fulfilled") {
            return { ...state, isAuthenticated: true };
          }
          return state;
        },
      },
    });

    render(
      <Provider store={store}>
        <LoginPage />
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

  it("should render login form when not authenticated", () => {
    renderWithProvider(false);
    expect(screen.getByText("Submit Login")).toBeInTheDocument();
  });

  it("should handle login submission", async () => {
    mockLoginUser.mockReturnValue({
      unwrap: () => Promise.resolve({ user: { id: 1 }, token: "token" }),
    });

    renderWithProvider(false);
    await userEvent.click(screen.getByText("Submit Login"));

    expect(mockLoginUser).toHaveBeenCalledWith({ email: "test@test.com", password: "123456" });
  });
});
