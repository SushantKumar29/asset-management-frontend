import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupForm from "@/components/forms/SignupForm";

describe("SignupForm", () => {
  const mockOnSubmit = jest.fn();
  const originalError = console.error;
  beforeAll(() => {
    console.error = (...args) => {
      if (
        args[0]?.includes?.("not wrapped in act") ||
        args[0]?.includes?.("An update to SignupForm")
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
    render(<SignupForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole("button", { name: /sign up/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    const passwordErrors = await screen.findAllByText(/password is required/i);
    expect(passwordErrors.length).toBe(2);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should show password mismatch error", async () => {
    render(<SignupForm onSubmit={mockOnSubmit} />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmInput = screen.getByLabelText(/confirm password/i);

    await userEvent.type(passwordInput, "password123");
    await userEvent.type(confirmInput, "password456");

    const submitButton = screen.getByRole("button", { name: /sign up/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/passwords do not match/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should submit form with valid data", async () => {
    mockOnSubmit.mockResolvedValue(undefined);
    render(<SignupForm onSubmit={mockOnSubmit} />);

    await userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    await userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password123");

    const submitButton = screen.getByRole("button", { name: /sign up/i });
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalled();
    expect(mockOnSubmit.mock.calls[0][0]).toEqual({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
    });
  });

  it("should show loading state while submitting", async () => {
    let resolveSubmit: (value: unknown) => void;
    const submitPromise = new Promise((resolve) => {
      resolveSubmit = resolve;
    });

    mockOnSubmit.mockReturnValue(submitPromise);
    render(<SignupForm onSubmit={mockOnSubmit} />);

    await userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    await userEvent.type(screen.getByLabelText(/email/i), "john@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password123");

    const submitButton = screen.getByRole("button", { name: /sign up/i });
    await userEvent.click(submitButton);

    expect(screen.getByText(/signing up/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    resolveSubmit!(undefined);
  });
});
