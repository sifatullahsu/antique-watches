import React from 'react';
import errorImage from '../assets/images/error.png';

const Error = () => {
  return (
    <div className='container'>
      <div className="content max-w-xl mx-auto">
        <img src={errorImage} className='w-full' alt="" />
      </div>
    </div>
  );
};

export default Error;