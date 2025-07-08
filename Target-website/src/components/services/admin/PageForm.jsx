import React from 'react';
import { useTranslation } from '../../../hooks/useTranslation';

const PageForm = ({ page, onInputChange, onSubmit }) => {
  const { translate: t } = useTranslation();

  return (
    <div className="page-form-container">
      <h2 className="section-title">{t("AdminCustom.createPage")}</h2>
      <form className="page-form">
        <div className="form-group">
          <label htmlFor="pageName">{t("AdminCustom.pageName")}</label>
          <input
            type="text"
            id="pageName"
            placeholder={t("AdminCustom.enterPageName")}
            value={page.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pageSlug">{t("AdminCustom.pageSlug")}</label>
          <input
            type="text"
            id="pageSlug"
            placeholder={t("AdminCustom.enterPageSlug")}
            value={page.slug}
            onChange={(e) => onInputChange('slug', e.target.value)}
            required
          />
        </div>
        <button type="button" className="btn-primary bg-primary" onClick={onSubmit}>
          {t("AdminCustom.createPage")}
        </button>
      </form>
    </div>
  );
};

export default PageForm;
