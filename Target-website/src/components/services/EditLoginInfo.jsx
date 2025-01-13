import React, { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";

const EditLoginInfo = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [formData, setFormData] = useState({
    firstName: authState?.idToken?.claims?.given_name || "",
    lastName: authState?.idToken?.claims?.family_name || "",
    email: authState?.idToken?.claims?.email || "",
  });

  const [message, setMessage] = useState("");

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleEditLogin = async (e) => {
    e.preventDefault();
    setMessage("Updating your profile...");

    try {
      const userId = authState.idToken.claims.sub; // Get user ID from token
      console.log("userId", userId);

      const yourOktaDomain = import.meta.env.VITE_OKTA_DOMAIN;
      const resp = await fetch(      
       `https://${yourOktaDomain}/api/v1/users/${userId}`
       , {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `SSWS ${import.meta.env.VITE_OKTA_API_KEY}`,
          "Access-Control-Allow-Origin": "http://localhost:5173",
        },
        body: JSON.stringify({
          profile: {
            firstName: formData.firstName,
            email: formData.email,
            lastName: formData.lastName,
          },
        }),
      });

      if (!resp.ok) {
        const errorText = await resp.text(); // Read response as text for debugging
        throw new Error(`Error ${resp.status}: ${errorText}`);
      }

      const data = await resp.json();
      console.log(data);

      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Login Information</h2>
      <form onSubmit={handleEditLogin}>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default EditLoginInfo;
