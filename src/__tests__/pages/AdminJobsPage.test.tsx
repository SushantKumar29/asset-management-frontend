import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AdminJobsPage from "@/pages/AdminJobsPage";

jest.mock("@/lib/axios", () => ({
  __esModule: true,
}));

jest.mock("@/components/jobs/JobList", () => ({
  __esModule: true,
  default: ({ jobs }: { jobs: unknown[] }) => <div>Jobs: {jobs.length}</div>,
}));

jest.mock("@/components/jobs/JobDetailDialog", () => ({
  __esModule: true,
  default: () => <div>Job Details Dialog</div>,
}));

jest.mock("@/shared/ui/Loader", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
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
  const renderWithProvider = (isAuthenticated = true, jobs: unknown[] = [], loading = false) => {
    const store = configureStore({
      reducer: {
        auth: () => ({ isAuthenticated }),
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

  it("should render jobs page when authenticated", () => {
    renderWithProvider(true, [{ id: 1 }, { id: 2 }]);
    expect(screen.getByText("Background Jobs")).toBeInTheDocument();
    expect(screen.getByText("Jobs: 2")).toBeInTheDocument();
  });

  it("should show loader when loading", () => {
    const store = configureStore({
      reducer: {
        auth: () => ({ isAuthenticated: true }),
        jobs: () => ({ jobs: [], loading: true, currentJob: null }),
      },
    });

    render(
      <Provider store={store}>
        <AdminJobsPage />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
