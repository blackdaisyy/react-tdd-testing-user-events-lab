import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Test 1: Form elements are rendered
test('renders newsletter signup form with all required elements', () => {
  render(<App />);
  
  // Check for form inputs
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  
  // Check for interest checkboxes
  expect(screen.getByLabelText(/technology/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/design/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/business/i)).toBeInTheDocument();
});

// Test 2: User can type in name and email fields
test('allows user to type in name and email fields', async () => {
  render(<App />);
  
  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);
  
  // Use fireEvent for simpler input changes
  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  
  expect(nameInput).toHaveValue('John Doe');
  expect(emailInput).toHaveValue('john@example.com');
});

// Test 3: User can select interests
test('allows user to select multiple interests', () => {
  render(<App />);
  
  const techCheckbox = screen.getByLabelText(/technology/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  
  fireEvent.click(techCheckbox);
  fireEvent.click(designCheckbox);
  
  expect(techCheckbox).toBeChecked();
  expect(designCheckbox).toBeChecked();
});

// Test 4: Form submission shows success message
test('displays success message with user data after form submission', () => {
  render(<App />);
  
  // Fill out the form
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Smith' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
  fireEvent.click(screen.getByLabelText(/technology/i));
  fireEvent.click(screen.getByLabelText(/business/i));
  
  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));
  
  // Check for success message
  expect(screen.getByText(/thank you, jane smith!/i)).toBeInTheDocument();
  expect(screen.getByText(/you have subscribed with the email: jane@example.com/i)).toBeInTheDocument();
});

// Test 5: Success message includes selected interests (Bonus)
test('includes selected interests in success message', () => {
  render(<App />);
  
  // Fill out the form with specific interests
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Bob Wilson' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'bob@example.com' } });
  fireEvent.click(screen.getByLabelText(/design/i));
  fireEvent.click(screen.getByLabelText(/business/i));
  
  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));
  
  // Check for interests in success message
  expect(screen.getByText(/your interests: design, business/i)).toBeInTheDocument();
});

// Test 6: Form is hidden after submission
test('hides the form after successful submission', () => {
  render(<App />);
  
  // Fill out and submit the form
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Test User' } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
  fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));
  
  // Form should not be visible
  expect(screen.queryByLabelText(/name/i)).not.toBeInTheDocument();
  expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /subscribe/i })).not.toBeInTheDocument();
});