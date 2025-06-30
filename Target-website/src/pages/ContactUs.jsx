import React from "react";
import { useTranslation } from "../hooks/useTranslation";
const ContactUs = () => {
  const { translate: t } = useTranslation();
  return (
    <div className=" mt-vh contact-us">
      {/* Banner Section */}
      <div className="contact-banner  ">
        <h1>{t("common.contactUs.title")}</h1>
        <p>{t("common.contactUs.subtitle")}</p>
      </div>

      {/* Map and Info Section */}
      <div className="contact-details">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d862.6387950359159!2d31.169266969643026!3d30.135539498429868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x14586900352dece1%3A0x6014ccdae4d73984!2sTarget%20for%20engineering%2C%20Saqil%2C%20Ossim%2C%20Giza%20Governorate%203677616!3m2!1d30.1355395!2d31.1699107!5e0!3m2!1sen!2seg!4v1737137842085!5m2!1sen!2seg"
            width="100%"
            height="300"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Company Location"
          ></iframe>
        </div>
        <div className="info-container">
          <h3>{t("common.contactUs.ourLocation")}</h3>
          <p>{t("common.contactUs.address")}</p>
          <h3>{t("common.contactUs.contactInformation")}</h3>
          <p>{t("common.contactUs.email")}</p>
          <p>{t("common.contactUs.phone")}</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact-form">
        <h2>{t("common.contactUs.title")}</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const name = formData.get("name");
          const email = formData.get("email");
          const message = formData.get("message");

          const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
          const subject = "Message from website contact form";

          const mailto = `mailto:Info@target-for-engineering.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          window.location.href = mailto;
        }}>
          <div className="form-group">
            <label>{t("common.contactUs.name")}</label>
            <input type="text" name="name" placeholder={t("common.contactUs.name")} required />
          </div>
          <div className="form-group">
            <label>{t("common.contactUs.emailField")}</label>
            <input type="email" name="email" placeholder={t("common.contactUs.emailPlaceholder")} required />
          </div>
          <div className="form-group">
            <label>{t("common.contactUs.message")}</label>
            <textarea rows="5" name="message" placeholder={t("common.contactUs.messagePlaceholder")} required></textarea>
          </div>
          <button type="submit" >{t("common.contactUs.sendMessage")}</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
