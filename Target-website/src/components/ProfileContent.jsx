
import { useTranslation } from '../hooks/useTranslation';
import { useSelector } from 'react-redux';

export const MainContent = ( { userInfo, availableServices } ) => {
    const { translate: t } = useTranslation();
    const isDarkMode = useSelector((state) => state.theme.isDarkMode);
      return (
        < >
        {/* Personal Information */}
        {/* <div className="profile-section">
          <h5>{t('common.profile.mainContent.personalInfo')}</h5>
          <p>{t('common.profile.mainContent.locale')}: {userInfo.locale}</p>
          <p>
            {t('common.profile.mainContent.website')}:{" "}
            <a
              href={userInfo.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {userInfo.website}
            </a>
          </p>
          <p>{t('common.profile.mainContent.gender')}: {userInfo.gender}</p>
          <p>{t('common.profile.mainContent.birthdate')}: {userInfo.birthdate}</p>
        </div> */}

        {/* Available Services */}
        <div className="profile-section" style={{  color: isDarkMode ? 'white' : 'black' }}>
          <h5>{t('common.profile.mainContent.availableServices')}</h5>
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
            <p>{t('common.profile.mainContent.noServices')}</p>
          )}
        </div>

        {/* Vehicles Component */}
      </>
    );
};

export default MainContent;