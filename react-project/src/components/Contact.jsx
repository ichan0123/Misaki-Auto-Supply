import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./Contact.css";

const Contact = ({ hideBackButton }) => {
  // If hideBackButton prop is not provided, determine if we're on the homepage
  const location = useLocation();
  const isHomePage = !hideBackButton
    ? location.pathname === "/"
    : hideBackButton;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="contact-page">
      <div className="page-header-with-back">
        {!isHomePage && (
          <button className="back-btn" onClick={goBack}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        )}
        <h1 className="contact-title">Contact</h1>
      </div>

      <div className="contact-content">
        <div className="contact-left">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20110.1751313668!2d120.66054035922888!3d15.023387081861323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3396f79c54210979%3A0x281c36e00dd26b7!2sMISAKI%20Auto%20Supply!5e1!3m2!1sen!2sph!4v1746639570982!5m2!1sen!2sph"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="contact-details">
            <div className="contact-info-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Del Pilar, San Fernando, Pampanga</span>
            </div>
            <div className="contact-info-item">
              <i className="fas fa-phone"></i>
              <span>09182246101</span>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <div className="company-description">
            <p>
              MISAKI Auto Supply is an auto parts surplus business located at
              Del Pilar General Hizon St., San Fernando, Pampanga. With years of
              experience under our belt in the automotive industry, we
              specialize in selling auto parts that are quality and low-cost for
              different types of vehicles.
            </p>
            <p>
              As we have a large selection of surplus parts for cars, our
              customers can find the auto part they need for their vehicle.
              MISAKI Auto Supply is committed to our customers by providing good
              customer service and fast delivery. For auto parts surplus, MISAKI
              Auto Supply is the place to go!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
