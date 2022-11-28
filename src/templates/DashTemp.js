import React, { useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ScrollToTop from '../components/ScrollToTop';
import { AuthContext } from '../contexts/AuthContextComp';

const DashTemp = () => {
  const { userProfile, userLoading, userProfileLoading } = useContext(AuthContext);

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Header></Header>
      {
        userProfile?._id && !userLoading && !userProfileLoading ?
          <main id='content'>
            <div className="container">
              <div className='flex flex-wrap lg:flex-nowrap'>
                <div className='basis-full lg:basis-1/4  lg:px-3 mb-10 lg:mb-0'>
                  <div className='bg-primary text-white p-5 rounded-md'>
                    <DashSidebar></DashSidebar>
                  </div>
                </div>
                <div className='basis-full lg:basis-3/4 max-w-full px-3'>
                  <Outlet></Outlet>
                </div>
              </div>
            </div>
          </main>
          :
          <Outlet></Outlet>
      }
      <Footer></Footer>
    </>
  );
};

export default DashTemp;