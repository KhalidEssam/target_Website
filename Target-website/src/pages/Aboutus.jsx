import { useState } from "react";import { useTranslation } from "../hooks/useTranslation";

const AboutUs = () => {
    const [isClicked, setIsClicked] = useState(false);
    const { translate: t } = useTranslation();
    return (
        <>
        <div className="d-block d-md-flex" style={{ minHeight: "100vh" }}>
            <div className=" m-auto d-flex justify-content-center align-items-center card" style={{ maxWidth: "800px" }}>
                <div className="row g-0">
                    <div className="col-md-6">
                        <div className="card-body">
                            <h1 className="card-title">{t('common.aboutUs.title')}</h1>
                            <p className="card-text">{t('common.aboutUs.description')}</p>
                            <button onClick={() => setIsClicked(!isClicked)}>
                                {t('common.aboutUs.ownerInfoButton')}
                            </button>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img
                            src="https://res.cloudinary.com/dlup3gczf/image/upload/v1738617152/orfo21knbgkqdp67rquc.jpg"
                            alt="Random"
                            className="img-fluid"
                            style={{
                                transition: "all 0.5s ease-in-out",
                                transform: isClicked ? "scale(1.1)" : "scale(1)"
                            }}
                            onLoad={() => {
                                setIsClicked(false);
                            }}
                        />
                    </div>
                </div>    
            </div>
            
            <p className={isClicked ? "d-felx card col-md-4 m-auto" : "d-none" } >
            {t('common.aboutUs.ownerInfo')}
        </p>
        </div>
       

        </>
    );
};

export default AboutUs;
