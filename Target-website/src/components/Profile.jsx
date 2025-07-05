import MainContent from "./ProfileContent";
import { Route, Routes } from "react-router-dom";
import { serviceMetadata } from "./services/serviceMetadata";
import { useOktaAuth } from "@okta/okta-react";
import { useTranslation } from "../hooks/useTranslation";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserGallery from "./Gallery";

//services
import ProfileForm from "./services/EditProfileInfo";

const Profile = () => {
  const { translate: t } = useTranslation();
  const userInfo = useSelector((state) => state.user.userInfo);
  // const { oktaAuth, authState } = useOktaAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const userId = userInfo.sub;

        

  // Filter services based on user role
  const availableServices = serviceMetadata.filter((service) =>
    service.roles.some(
      (role) => (userInfo.groups.includes(role) || role === "Everyone") && service.available === true 
    )
  );
  const validateFile = (file) => {
    if (!file) {
      console.error(t("common.profile.noFile"));
      return false;
    }
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      console.error(t("common.profile.unsupportedType"));
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      console.error(t("common.profile.fileSize"));
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
        alert(t("common.profile.success"));
      } else {
        alert(`${t("common.profile.error")}: ${result.error}`);
      }
    

        console.log("Profile image updated successfully!");
    
    } catch (error) {
      console.error("Error updating profile image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!userInfo) {
    return <div>{t("common.profile.loading")}</div>;
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
                <div className="loading-animation">{t("common.profile.uploading")}</div>
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
            <p className="profile-role">{t("common.profile.role")} {userInfo.groups}</p>
          )}
          <p>{t("common.profile.email")} {userInfo.email}</p>
          <p>
            {t("common.profile.profile")}{" "}
            <a
              href={userInfo.profile}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userInfo.profile}
            </a>
          </p>
          <a href={`/profile/edit-profile-info`} className="edit-link">
            {t("common.profile.editProfile")}
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
