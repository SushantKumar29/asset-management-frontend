import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UploadForm from "@/components/forms/UploadForm";

const createMockFile = (name: string, type: string): File => {
  return new File([""], name, { type });
};

describe("UploadForm", () => {
  const mockOnSubmit = jest.fn();
  const originalError = console.error;
  beforeAll(() => {
    console.error = (...args) => {
      if (
        args[0]?.includes?.("not wrapped in act") ||
        args[0]?.includes?.("An update to UploadForm")
      ) {
        return;
      }
      originalError.call(console, ...args);
    };
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all form fields", () => {
    render(<UploadForm onSubmit={mockOnSubmit} isUploading={false} />);

    expect(screen.getByText(/files/i)).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/tags/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/add tags/i)).toBeInTheDocument();
  });

  it("should not add duplicate tags", async () => {
    render(<UploadForm onSubmit={mockOnSubmit} isUploading={false} />);

    const tagInput = screen.getByPlaceholderText(/add tags/i);

    await userEvent.type(tagInput, "react");
    await userEvent.keyboard("{Enter}");

    await userEvent.type(tagInput, "react");
    await userEvent.keyboard("{Enter}");

    const tags = screen.getAllByText("react");
    expect(tags).toHaveLength(1);
  });

  it("should not add empty tags", async () => {
    render(<UploadForm onSubmit={mockOnSubmit} isUploading={false} />);

    const tagInput = screen.getByPlaceholderText(/add tags/i);
    await userEvent.type(tagInput, "   ");
    await userEvent.keyboard("{Enter}");

    expect(screen.queryByText("react")).not.toBeInTheDocument();
  });

  it("should disable upload button when no files selected", () => {
    render(<UploadForm onSubmit={mockOnSubmit} isUploading={false} />);

    const uploadButton = screen.getByRole("button", { name: /upload 0 assets/i });
    expect(uploadButton).toBeDisabled();
  });

  it("should enable upload button when files are selected", async () => {
    render(<UploadForm onSubmit={mockOnSubmit} isUploading={false} />);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createMockFile("test.jpg", "image/jpeg");

    Object.defineProperty(fileInput, "files", {
      value: [file],
    });
    fileInput.dispatchEvent(new Event("change", { bubbles: true }));

    await screen.findByText("test.jpg");
    const uploadButton = screen.getByRole("button", { name: /upload 1 asset/i });
    expect(uploadButton).toBeEnabled();
  });

  it("should clear all files", async () => {
    render(<UploadForm onSubmit={mockOnSubmit} isUploading={false} />);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createMockFile("test.jpg", "image/jpeg");

    Object.defineProperty(fileInput, "files", {
      value: [file],
    });
    fileInput.dispatchEvent(new Event("change", { bubbles: true }));

    await screen.findByText("test.jpg");

    const clearButton = screen.getByText(/clear all/i);
    await userEvent.click(clearButton);

    expect(screen.queryByText("test.jpg")).not.toBeInTheDocument();
  });

  it("should show loading state when uploading", () => {
    render(<UploadForm onSubmit={mockOnSubmit} isUploading={true} />);

    const uploadButton = screen.getByRole("button", { name: /uploading/i });
    expect(uploadButton).toBeDisabled();
  });
});
