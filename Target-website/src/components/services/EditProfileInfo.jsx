import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

const ProfileForm = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const allowedProfileFields = [
    "login",
    "firstName",
    "lastName",
    "nickName",
    "displayName",
    "email",
    "secondEmail",
    "profileUrl",
    "preferredLanguage",
    "userType",
    "organization",
    "title",
    "division",
    "department",
    "costCenter",
    "employeeNumber",
    "mobilePhone",
    "primaryPhone",
    "streetAddress",
    "city",
    "state",
    "zipCode",
    "countryCode"
  ];

  const [profileData, setProfileData] = useState({
    login: "" || authState.idToken.claims.email ,
    firstName: "",
    lastName: "",
    nickName: "",
    displayName: "",
    email: "" || authState.idToken.claims.email,
    secondEmail: "" || "non-registered",
    profileUrl: "",
    preferredLanguage: "",
    userType: "",
    organization: "",
    title: "",
    division: "",
    department: "",
    costCenter: "",
    employeeNumber: "",
    mobilePhone: "" || "000",
    primaryPhone: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    countryCode: "",
  });
  const userId = authState.idToken.claims.sub;

  const [editedFields, setEditedFields] = useState({
    login: authState.idToken.claims.email,
    email: authState.idToken.claims.email,
  });
  const [loading, setLoading] = useState(false);

  // Fetch the user's profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const resp = await fetch(`http://127.0.0.1:3000/profile/${userId}`, {
          method: "GET",
          headers: {
            Authorization: import.meta.env.VITE_OKTA_API_TOKEN,
          },
        });
  
        const data = await resp.json();
        let profile = {};
        const newdata = JSON.parse(data);
        const updatedJsonData = Object.keys(newdata).reduce((acc, key) => {
            if (key === 'profile') {
            profile = newdata[key]; // Store the profile object
            //console.log(key);
            } else {
            acc[key] = newdata[key]; // Keep the other keys
            }
            return acc;
        }, {});

  
        console.log(profile);
  
        if (profile) {
        //   console.log(profile);
          setProfileData(profile);
        } else {
          console.error("Profile data is undefined");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchProfileData();
  }, [userId]);
  

  // Handle form changes and track edited fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field being edited is part of the profileData state
    setProfileData((prevData) => {
      if (name in prevData) {
        // Update only the valid fields
        const updatedData = { ...prevData, [name]: value };

        // Update edited fields only for valid keys
        setEditedFields((prev) => ({ ...prev, [name]: value }));

        return updatedData;
      }

      // If the field is not valid, return the previous state unchanged
      return prevData;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const editedData = editedFields;
    console.log(editedData);

    try {
      const response = await fetch(`http://127.0.0.1:3000/profile/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(profileData).map((key) => (
          <div key={key} className="mb-3">
            <label htmlFor={key} className="form-label">
              {key.replace(/([A-Z])/g, " $1").toUpperCase()}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={profileData[key]}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
