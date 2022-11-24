import React from 'react';
import { Outlet } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import Footer from '../components/Footer';
import Header from '../components/Header';

const DashTemp = () => {

  return (
    <>
      <Header></Header>
      <main id='content'>
        <div className="container">
          <div className='flex flex-wrap'>
            <div className='basis-1/4 px-3'>
              <div className='bg-primary text-white p-5 rounded-md'>
                <DashSidebar></DashSidebar>
              </div>
            </div>
            <div className='basis-3/4 px-3'>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default DashTemp;