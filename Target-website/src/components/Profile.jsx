import { useSelector } from "react-redux";
import MainContent from "./ProfileContent";
import { Route, Routes } from "react-router-dom";
import { serviceMetadata } from "./services/serviceMetadata";

//services

import EditLoginInfo from "./services/EditLoginInfo";

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);


  // Filter services based on user role
  const availableServices = serviceMetadata.filter((service) =>
    service.roles.some((role) => userInfo.groups.includes(role) || role === "Everyone")
  );
  

  if (!userInfo) {
    return <div>Loading...</div>;
    
  }

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="profile-sidebar">
        <div className="profile-card">
          <img
            src={userInfo.picture}
            alt={userInfo.name}
            className="profile-image"
          />
          <h5 className="profile-name">{userInfo.name}</h5>
          {userInfo.groups && <p className="profile-role">Role: {userInfo.groups}</p>}
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
          <a href={`/profile/edit-login-info`} className="edit-link">
            Edit Login Information
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="card profile-main">
        <Routes>
          {/* <Route path="/" element={<EditLoginInfo />} /> */}
          <Route path="/" element={<MainContent userInfo={userInfo} availableServices={availableServices} />} />
          <Route path="edit-login-info" element={<EditLoginInfo/>} />
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
