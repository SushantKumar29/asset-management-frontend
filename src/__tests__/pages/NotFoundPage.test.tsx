import { render, screen } from "@testing-library/react";
import NotFoundPage from "@/pages/NotFoundPage";
import { PATHS } from "@/constants/path";

jest.mock("react-router", () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

const renderNotFoundPage = () => {
  return render(<NotFoundPage />);
};

describe("NotFoundPage", () => {
  it("renders 404 heading", () => {
    renderNotFoundPage();
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders 'Page Not Found' message", () => {
    renderNotFoundPage();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("renders descriptive text", () => {
    renderNotFoundPage();
    expect(screen.getByText(/The page you're looking for doesn't exist/i)).toBeInTheDocument();
  });

  it("renders a link to home page", () => {
    renderNotFoundPage();
    const homeLink = screen.getByRole("link", { name: /go back home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", PATHS.root);
  });
});
