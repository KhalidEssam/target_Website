
export const MainContent = ( { userInfo, availableServices } ) => {
    return (
        < >
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
                  <a href={window.location + service.route} className="service-link">
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
      </>
    );
};

export default MainContent;