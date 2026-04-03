import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/forms/LoginForm";

describe("LoginForm", () => {
  const mockOnSubmit = jest.fn();
  const originalError = console.error;
  beforeAll(() => {
    console.error = (...args) => {
      if (
        args[0]?.includes?.("not wrapped in act") ||
        args[0]?.includes?.("An update to LoginForm")
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
    render(<LoginForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    await userEvent.click(submitButton);

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should show invalid email error", async () => {
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    await userEvent.click(submitButton);

    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "invalid-email");

    await userEvent.click(submitButton);

    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("should submit form with valid data", async () => {
    mockOnSubmit.mockResolvedValue(undefined);
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalled();
    expect(mockOnSubmit.mock.calls[0][0]).toEqual({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("should show loading state while submitting", async () => {
    let resolveSubmit: (value: unknown) => void;
    const submitPromise = new Promise((resolve) => {
      resolveSubmit = resolve;
    });

    mockOnSubmit.mockReturnValue(submitPromise);
    render(<LoginForm onSubmit={mockOnSubmit} />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(submitButton);

    expect(screen.getByText(/logging in/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    resolveSubmit!(undefined);
  });
});
