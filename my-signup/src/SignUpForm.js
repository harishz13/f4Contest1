import React, { useState } from "react";

function SignUpForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "email":
        errorMessage = !/\S+@\S+\.\S+/.test(value) ? "Invalid email address" : "";
        break;
      case "password":
        errorMessage = value.length < 8 ? "Password must be at least 8 characters long" : "";
        break;
      case "confirmPassword":
        errorMessage = value !== formData.password ? "Passwords do not match" : "";
        break;
      default:
        break;
    }
    setFormErrors({
      ...formErrors,
      [`${name}Error`]: errorMessage,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let isFormValid = true;
    Object.values(formErrors).forEach((error) => {
      if (error) {
        isFormValid = false;
      }
    });
    if (isFormValid) {
      alert("Form submitted Successfully");
      // Do something with the form data
      console.log(formData);
    } else {
      alert("Form cannot be submitted");
    }
  };
  
  const getBorderStyle = (name) => {
    if (formErrors[`${name}Error`]) {
      return { border: "2px solid red" };
    } else if (formData[name]) {
      return { border: "2px solid green" };
    } else {
      return {};
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={getBorderStyle("email")}
        />
        {formErrors.emailError && <div className="Err">{formErrors.emailError}</div>}
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          style={getBorderStyle("password")}
        />
        {formErrors.passwordError && <div className="Err">{formErrors.passwordError}</div>}
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          style={getBorderStyle("confirmPassword")}
        />
        {formErrors.confirmPasswordError && (
          <div className="Err">{formErrors.confirmPasswordError}</div>
        )}
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUpForm;
