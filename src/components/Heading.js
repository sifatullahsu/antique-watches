import React from 'react';

const Heading = ({ title, text, isCenter }) => {
  return (
    <div className={`heading-section mb-5 ${isCenter ? 'text-center' : ''}`}>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className='seperator'></div>
    </div>
  );
};

export default Heading;