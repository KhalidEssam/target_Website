import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

const ProfileForm = () => {
  const user = useSelector((state) => state.user);
  const userInfo = user.userInfo;

  const allowedProfileFields = useMemo(
    () => [
      "login",
      "firstName",
      "lastName",
      "nickName",
      "displayName",
      "email",
      "secondEmail",
      "profileUrl",
      "preferredLanguage",
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
      "countryCode",
    ],
    []
  );

  const [profileData, setProfileData] = useState({});
  const [editedFields, setEditedFields] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = userInfo.sub;

  // Fetch the user's profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const resp = await fetch(`/api/profile/${userId}`, {
          method: "GET",
          headers: {
            Authorization: import.meta.env.VITE_OKTA_API_TOKEN,
          },
        });
  
        const profile = await resp.json();  
        if (!resp.ok) {
          throw new Error("Error fetching profile data");
        }
        const filteredProfile = Object.keys(profile)
          .filter((key) => allowedProfileFields.includes(key))
          .reduce((obj, key) => {
            obj[key] = profile[key];
            return obj;
          }, {});
  
  
        if (filteredProfile) {
          setProfileData(filteredProfile);
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
    console.log(editedFields);
    e.preventDefault();
    setLoading(true);
    editedFields.firstName ? editedFields.firstName = editedFields.firstName : editedFields.firstName = profileData.firstName;
    editedFields.lastName ? editedFields.lastName = editedFields.lastName : editedFields.lastName = profileData.lastName;

    const editedData = editedFields;

    try {
      const response = await fetch(`/api/profile/${userId}`, {
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
              value={profileData[key] || ""}
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