import React from 'react';
import { Link } from 'react-router-dom';
import cover from '../assets/images/cover.webp';

const Hero = () => {
  return (
    <div className="hero lg:min-h-screen py-20 md:py-32 lg:py-0" style={{ backgroundImage: `url("${cover}")` }}>
      <div className="hero-overlay bg-opacity-30"></div>
      <div className="container text-neutral-content px-5">
        <div className="max-w-md">
          <h1 className="text-[40px] md:text-[60px] text-secondary mb-5">The Watch Everyone's Desire</h1>
          <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <Link to='/login' className="btn btn-outline btn-secondary">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;