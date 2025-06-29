import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';

const SectionForm = ({ section, onInputChange, onTypeChange, onSubmit }) => {
  const { translate: t } = useTranslation();

  return (
    <div className="section-form-container">
      <h2 className="section-title">
        {t("AdminCustom.addSection")}
      </h2>
      <form className="section-form">
        <div className="form-group">
          <label htmlFor="sectionName">{t("AdminCustom.sectionName")}</label>
          <input
            type="text"
            id="sectionName"
            placeholder={t("AdminCustom.enterSectionName")}
            value={section.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sectionType">{t("AdminCustom.sectionType")}</label>
          <select
            id="sectionType"
            value={section.type}
            onChange={(e) => onTypeChange(e.target.value)}
            required
          >
            <option value="text">{t("AdminCustom.text")}</option>
            <option value="image">{t("AdminCustom.image")}</option>
            <option value="slider">{t("AdminCustom.slider")}</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">{t("AdminCustom.description")}</label>
          <textarea
            id="description"
            rows="3"
            placeholder={t("AdminCustom.enterDescription")}
            value={section.content?.description || ''}
            onChange={(e) => onInputChange('description', e.target.value)}
          ></textarea>
        </div>
        <button type="button" className="btn-primary" onClick={onSubmit}>
          {t("AdminCustom.addSection")}
        </button>
      </form>
    </div>
  );
};

export default SectionForm;
