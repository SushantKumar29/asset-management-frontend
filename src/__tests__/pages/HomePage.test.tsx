import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import HomePage from "@/pages/HomePage";
import authReducer from "@/slices/auth/authSlice";

jest.mock("@/lib/axios", () => ({
  __esModule: true,
}));

jest.mock("@/components/Dashboard", () => ({
  __esModule: true,
  default: () => <div>Dashboard Component</div>,
}));

const mockNavigate = jest.fn();

jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

describe("HomePage", () => {
  const renderWithProviders = (isAuthenticated: boolean) => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated,
          user: null,
          token: null,
          loading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to login if not authenticated", () => {
    renderWithProviders(false);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
    expect(screen.queryByText("Dashboard Component")).not.toBeInTheDocument();
  });

  it("should render Dashboard if authenticated", () => {
    renderWithProviders(true);
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(screen.getByText("Dashboard Component")).toBeInTheDocument();
  });
});
