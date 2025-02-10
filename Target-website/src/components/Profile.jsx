import MainContent from "./ProfileContent";
import { Route, Routes } from "react-router-dom";
import { serviceMetadata } from "./services/serviceMetadata";
import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserGallery from "./Gallery";

//services
import ProfileForm from "./services/EditProfileInfo";

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  // const { oktaAuth, authState } = useOktaAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const userId = userInfo.sub;

        

  // Filter services based on user role
  const availableServices = serviceMetadata.filter((service) =>
    service.roles.some(
      (role) => userInfo.groups.includes(role) || role === "Everyone"
    )
  );
  const validateFile = (file) => {
    if (!file) {
      console.error("No file selected");
      return false;
    }
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      console.error("Unsupported file type");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      console.error("File size exceeds 5MB");
      return false;
    }
    return true;
  };

  const handleImageUpload = async (e, itemId) => {
    const file = e.target?.files?.[0];
    if (!validateFile(file)) return;

    setIsLoading(true); // Start loading animation

    const formData = new FormData();
    formData.append("file", file);
    formData.append("itemId", itemId);
    try {
      const res = await fetch("/api/upload-single", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data.imageUrl);

      if (!res.ok) throw new Error(data.error);

      setImageUrl(data.imageUrl);
      const editedData = { picture: data.imageUrl };

        

      const response = await fetch(`/api/profile-asign/${userId}`, {
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
    

        console.log("Profile image updated successfully!");
    
    } catch (error) {
      console.error("Error updating profile image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container d-block d-md-flex">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <div className="profile-card">
          {userInfo.picture ? (
            <img
              src={userInfo.picture}
              alt={userInfo.name}
              className="profile-image"
            />
          ) : (
            <>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, "18927389712309121")}
                disabled={isLoading}
              />
              {isLoading && (
                <div className="loading-animation">Uploading...</div>
              )}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Profile"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </>
          )}
          <h5 className="profile-name">{userInfo.name}</h5>
          {userInfo.groups && (
            <p className="profile-role">Role: {userInfo.groups}</p>
          )}
          <p>Email: {userInfo.email}</p>
          <p>
            Profile:{" "}
            <a
              href={userInfo.profile}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userInfo.profile}
            </a>
          </p>
          <a href={`/profile/edit-profile-info`} className="edit-link">
            Edit profile Information
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="card profile-main">
        <Routes>
          <Route
            path="/"
            element={
              <MainContent
                userInfo={userInfo}
                availableServices={availableServices}
              />
            }
          />
          <Route path="edit-profile-info" element={<ProfileForm />} />
          {availableServices.map((service) => (
            <Route
              key={service.name}
              path={service.route}
              element={<service.component />}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
