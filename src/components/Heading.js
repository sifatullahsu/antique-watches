import React from 'react';

const Heading = ({ title, text, isCenter, isDark }) => {
  return (
    <div className={`heading-section mb-5 ${isCenter ? 'text-center' : ''} ${isDark ? 'text-white' : ''}`}>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className={`seperator ${isDark ? 'bg-white' : 'bg-primary'}`}></div>
    </div >
  );
};

export default Heading;