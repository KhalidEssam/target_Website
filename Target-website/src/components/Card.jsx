import React from 'react';

const Card = ({ title, image, description }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default Card;
