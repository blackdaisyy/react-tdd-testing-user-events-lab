import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: {
      technology: false,
      design: false,
      business: false
    }
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      interests: {
        ...prev.interests,
        [name]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const getSelectedInterests = () => {
    return Object.entries(formData.interests)
      .filter(([_, isSelected]) => isSelected)
      .map(([interest]) => interest)
      .join(", ");
  };

  if (isSubmitted) {
    const selectedInterests = getSelectedInterests();
    return (
      <div className="newsletter-section">
        <h2>Thank You for Subscribing!</h2>
        <div className="success-message">
          <p>Thank you, {formData.name}!</p>
          <p>You have subscribed with the email: {formData.email}</p>
          {selectedInterests && (
            <p>Your interests: {selectedInterests}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-section">
      <h2>Subscribe to Our Newsletter</h2>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <fieldset>
            <legend>Interests:</legend>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="technology"
                  checked={formData.interests.technology}
                  onChange={handleCheckboxChange}
                />
                Technology
              </label>
              <label>
                <input
                  type="checkbox"
                  name="design"
                  checked={formData.interests.design}
                  onChange={handleCheckboxChange}
                />
                Design
              </label>
              <label>
                <input
                  type="checkbox"
                  name="business"
                  checked={formData.interests.business}
                  onChange={handleCheckboxChange}
                />
                Business
              </label>
            </div>
          </fieldset>
        </div>

        <button type="submit" className="subscribe-btn">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default App;