import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Import jest-dom for custom matchers
import "@testing-library/jest-dom";

describe("Newsletter Signup Form", () => {
  // Test 1: Form elements are rendered
  test("renders newsletter signup form with all required elements", () => {
    render(<App />);

    // Check for form heading
    expect(
      screen.getByRole("heading", { name: /newsletter signup/i })
    ).toBeInTheDocument();

    // Check for name input
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();

    // Check for email input
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter your email/i)
    ).toBeInTheDocument();

    // Check for interests checkboxes
    expect(screen.getByText(/select your interests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/web development/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data science/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile development/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/design/i)).toBeInTheDocument();

    // Check for submit button
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  // Test 2: Form inputs can be filled
  test("allows users to fill in form inputs", () => {
    render(<App />);

    // Fill in name
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");

    // Fill in email
    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    expect(emailInput.value).toBe("john@example.com");
  });

  // Test 3: Checkboxes can be checked and unchecked
  test("allows users to select and deselect interests", () => {
    render(<App />);

    const webDevCheckbox = screen.getByLabelText(/web development/i);
    const dataScienceCheckbox = screen.getByLabelText(/data science/i);

    // Initially unchecked
    expect(webDevCheckbox.checked).toBe(false);
    expect(dataScienceCheckbox.checked).toBe(false);

    // Check checkboxes
    fireEvent.click(webDevCheckbox);
    fireEvent.click(dataScienceCheckbox);

    // Should be checked
    expect(webDevCheckbox.checked).toBe(true);
    expect(dataScienceCheckbox.checked).toBe(true);

    // Uncheck one
    fireEvent.click(webDevCheckbox);
    expect(webDevCheckbox.checked).toBe(false);
    expect(dataScienceCheckbox.checked).toBe(true);
  });

  // Test 4: Form submission shows success message
  test("shows success message with user data after form submission", () => {
    render(<App />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Jane Smith" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "jane@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/web development/i));
    fireEvent.click(screen.getByLabelText(/design/i));

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Check for success message
    expect(
      screen.getByRole("heading", { name: /thank you!/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/jane smith/i)).toBeInTheDocument();
    expect(screen.getByText(/jane@example.com/i)).toBeInTheDocument();

    // Check that form is hidden after submission
    expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
  });

  // Test 5: Success message includes selected interests (Bonus)
  test("includes selected interests in the success message", () => {
    render(<App />);

    // Fill out the form with specific interests
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Bob Johnson" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "bob@example.com" },
    });
    fireEvent.click(screen.getByLabelText(/data science/i));
    fireEvent.click(screen.getByLabelText(/mobile development/i));

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Check for interests in success message
    expect(screen.getByText(/data science/i)).toBeInTheDocument();
    expect(screen.getByText(/mobile development/i)).toBeInTheDocument();
    expect(screen.queryByText(/web development/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/design/i)).not.toBeInTheDocument();
  });

  // Test 6: Form validation - required fields
  test("requires name and email fields", () => {
    render(<App />);

    // Try to submit without filling required fields
    const submitButton = screen.getByRole("button", { name: /sign up/i });
    fireEvent.click(submitButton);

    // Should show validation messages
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();

    // Form should not be submitted
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  // Test 7: Email validation
  test("validates email format", () => {
    render(<App />);

    // Fill form with invalid email
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "invalid-email" },
    });

    // Try to submit
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Should show email validation error
    expect(
      screen.getByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
  });

  // Test 8: Form can be reset and filled again
  test("allows user to sign up again after success", () => {
    render(<App />);

    // Fill and submit form first time
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "First User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "first@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    // Verify success message
    expect(screen.getByText(/first user/i)).toBeInTheDocument();

    // Click "Sign Up Again"
    fireEvent.click(screen.getByRole("button", { name: /sign up again/i }));

    // Form should be visible again and empty
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i).value).toBe("");
    expect(screen.getByLabelText(/email/i).value).toBe("");
  });
});
