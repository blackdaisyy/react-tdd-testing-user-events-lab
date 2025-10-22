import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [],
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const interestsList = [
    "Web Development",
    "Data Science",
    "Mobile Development",
    "Design",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCheckboxChange = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      interests: [],
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="App">
        {/* Your existing portfolio content */}
        <section className="newsletter-success">
          <h2>Thank You!</h2>
          <p>
            Thank you, <strong>{formData.name}</strong>, for signing up for our
            newsletter!
          </p>
          <p>
            We've sent a confirmation email to <strong>{formData.email}</strong>
            .
          </p>
          {formData.interests.length > 0 && (
            <div>
              <p>We'll send you updates about your selected interests:</p>
              <ul>
                {formData.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </div>
          )}
          <button onClick={resetForm} className="signup-button">
            Sign Up Again
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Your existing portfolio content */}

      <section className="newsletter-section">
        <h2>Newsletter Signup</h2>
        <p>Stay updated with the latest news and trends in tech!</p>

        <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className={errors.name ? "error" : ""}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <fieldset>
              <legend>Select your interests:</legend>
              {interestsList.map((interest) => (
                <div key={interest} className="checkbox-group">
                  <input
                    type="checkbox"
                    id={interest.toLowerCase().replace(" ", "-")}
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleCheckboxChange(interest)}
                  />
                  <label htmlFor={interest.toLowerCase().replace(" ", "-")}>
                    {interest}
                  </label>
                </div>
              ))}
            </fieldset>
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;
