import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';

const SectionList = ({ sections, onUpdateSection }) => {
  const { translate: t } = useTranslation();

  return (
    <div className="section-list-container">
      <h2 className="section-title">{t("AdminCustom.sections")}</h2>
      <div className="section-grid">
        {sections.map((section) => (
          <div key={section._id} className="section-item">
            <div className="section-header">
              <h3>{section.name}</h3>
              <span className="section-type">{t(`AdminCustom.${section.type}`)}</span>
            </div>
            <div className="section-controls">
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={section.isVisible}
                  onChange={(e) => onUpdateSection(section._id, e.target.checked)}
                />
                <span className="slider"></span>
              </label>
              <span className="status-text">
                {section.isVisible ? t("AdminCustom.visible") : t("AdminCustom.hidden")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionList;
