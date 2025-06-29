import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../../hooks/useTranslation';

const PageList = ({ pages, selectedPage, onPageSelect }) => {
  const { translate: t } = useTranslation();
  
  return (
    <div className="page-list-container">
      <h2 className="section-title">{t("AdminCustom.pages")}</h2>
      <div className="page-grid">
        {pages.map((page) => (
          <button
            key={page._id}
            onClick={() => onPageSelect(page)}
            className={`page-item ${selectedPage?.slug === page.slug ? 'selected' : ''}`}
          >
            <span className="page-name">{page.name}</span>
            <span className="page-slug">/{page.slug}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageList;
