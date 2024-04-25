import React from 'react';

const TwinklingStars = ({ numberOfStars = 100 }) => {
  const stars = Array.from({ length: numberOfStars }, (_, i) => ({
    id: i,
    style: {
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 3}s`
    }
  }));

  return (
    <div className="twinkling-stars">
      {stars.map(star => (
        <div key={star.id} className="star" style={star.style}></div>
      ))}
    </div>
  );
};

export default TwinklingStars;
