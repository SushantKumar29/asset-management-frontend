import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AdminJobsPage from "@/pages/AdminJobsPage";
import { ROLES } from "@/constants/auth";

// Simple mocks - NO circular references
jest.mock("@/lib/axios", () => ({
  __esModule: true,
}));

jest.mock("@/components/jobs/JobList", () => ({
  __esModule: true,
  default: ({ jobs }: { jobs: unknown[] }) => <div data-testid="job-list">Jobs: {jobs.length}</div>,
}));

jest.mock("@/components/jobs/JobDetailDialog", () => ({
  __esModule: true,
  default: () => <div data-testid="job-dialog">Job Details Dialog</div>,
}));

jest.mock("@/shared/ui/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Loading...</div>,
}));

jest.mock("@/shared/ui/BackButton", () => ({
  BackToPrevious: () => <div>Back Button</div>,
}));

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("@/slices/jobs/thunks", () => ({
  fetchJobs: () => () => Promise.resolve(),
  fetchJobDetails: () => () => Promise.resolve(),
}));

jest.mock("@/slices/jobs/jobsSlice", () => ({
  clearCurrentJob: () => ({ type: "clear" }),
}));

describe("AdminJobsPage", () => {
  const renderWithProvider = (
    isAuthenticated = true,
    jobs: unknown[] = [],
    loading = false,
    userRole = ROLES.admin
  ) => {
    const store = configureStore({
      reducer: {
        auth: () => ({
          isAuthenticated,
          user: { role: userRole },
        }),
        jobs: () => ({ jobs, loading, currentJob: null }),
      },
    });

    render(
      <Provider store={store}>
        <AdminJobsPage />
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should redirect to login if not authenticated", () => {
    renderWithProvider(false);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("should redirect to home if user is not admin", () => {
    renderWithProvider(true, [], false, ROLES.user);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should render jobs page when authenticated and admin", () => {
    renderWithProvider(true, [{ id: 1 }, { id: 2 }]);
    expect(screen.getByText("Background Jobs")).toBeInTheDocument();
    expect(screen.getByTestId("job-list")).toHaveTextContent("Jobs: 2");
  });

  it("should show filter dropdown", () => {
    renderWithProvider(true, [{ id: 1 }]);
    // Look for the select element by its role or placeholder text
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    // Or look for the trigger button
    expect(screen.getByText(/all jobs/i)).toBeInTheDocument();
  });

  it("should show refresh button", () => {
    renderWithProvider(true, [{ id: 1 }]);
    expect(screen.getByText("Refresh")).toBeInTheDocument();
  });

  it("should show loader when loading and no jobs", () => {
    const store = configureStore({
      reducer: {
        auth: () => ({
          isAuthenticated: true,
          user: { role: ROLES.admin },
        }),
        jobs: () => ({ jobs: [], loading: true, currentJob: null }),
      },
    });

    render(
      <Provider store={store}>
        <AdminJobsPage />
      </Provider>
    );

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should not show loader when loading but jobs exist", () => {
    renderWithProvider(true, [{ id: 1 }], true);
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    expect(screen.getByTestId("job-list")).toHaveTextContent("Jobs: 1");
  });

  it("should return null while checking authentication", () => {
    const store = configureStore({
      reducer: {
        auth: () => ({ isAuthenticated: false, user: null }),
        jobs: () => ({ jobs: [], loading: false, currentJob: null }),
      },
    });

    const { container } = render(
      <Provider store={store}>
        <AdminJobsPage />
      </Provider>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
