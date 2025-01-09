import { useSelector } from "react-redux";
import Vehicles from "./Vehicles";
// import "./Profile.css"; // CSS for styling

const Profile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  // Example services data
  const services = [
    { name: "Service 1", route: "/service-1", roles: ["Admin", "user"] },
    { name: "Service 2", route: "/service-2", roles: ["user"] },
    { name: "Service 3", route: "/service-3", roles: ["Admin"] },
  ];

  // Filter services based on user role
  const availableServices = services.filter((service) =>
    service.roles.some((role) => userInfo.groups.includes(role))
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
          <a href="/edit-login-info" className="edit-link">
            Edit Login Information
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-main">
        {/* Personal Information */}
        <div className="profile-section">
          <h5>Personal Information</h5>
          <p>Locale: {userInfo.locale}</p>
          <p>
            Website:{" "}
            <a
              href={userInfo.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userInfo.website}
            </a>
          </p>
          <p>Gender: {userInfo.gender}</p>
          <p>Birthdate: {userInfo.birthdate}</p>
        </div>

        {/* Available Services */}
        <div className="profile-section">
          <h5>Available Services</h5>
          {availableServices.length > 0 ? (
            <ul className="services-list">
              {availableServices.map((service) => (
                <li key={service.name}>
                  <a href={service.route} className="service-link">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No services available for your role.</p>
          )}
        </div>

        {/* Vehicles Component */}
        <Vehicles />
      </div>
    </div>
  );
};

export default Profile;
