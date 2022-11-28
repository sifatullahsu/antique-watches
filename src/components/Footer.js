import React from 'react';
import { FaFacebook, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import logo from '../assets/images/logo.png';

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container px-5">
        <div className="content">
          <div className="flex justify-between items-end flex-wrap">
            <div className='basis-full md:basis-6/12'>
              <img src={logo} className='w-[200px]' alt="" />
              <div className='px-2 mt-5'>
                <h4>Antique Watches Ltd.</h4>
                <p className='mt-2'>SINCE 2011</p>
              </div>
            </div>
            <div className='basis-full md:basis-6/12 md:text-right mt-10 md:mt-0'>
              <div className="text-secondary font-semibold uppercase mb-2">Social</div>
              <div className="flex md:justify-end gap-5 text-2xl">
                <a href='https://www.facebook.com/sifatullahhh' target="_blank" rel="noreferrer">
                  <FaFacebook></FaFacebook>
                </a>
                <a href='https://www.linkedin.com/in/sifatullahsu/' target="_blank" rel="noreferrer">
                  <FaLinkedinIn></FaLinkedinIn>
                </a>
                <a href='https://github.com/sifatullahsu' target="_blank" rel="noreferrer">
                  <FaGithub></FaGithub>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;