import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Heading from '../components/Heading';
import Hero from '../components/Hero';
import Loading from '../components/Loading';
import CategoryLoop from '../components/loops/CategoryLoop';
import ProductLoop from '../components/loops/ProductLoop';
import { AuthContext } from '../contexts/AuthContextComp';
import icon1 from '../assets/images/icon1.png';
import icon2 from '../assets/images/icon2.png';
import icon3 from '../assets/images/icon3.png';
import handwithwatch from '../assets/images/handwithwatch.jpg';


const HomePage = () => {

  const location = useLocation();
  const { userProfile } = useContext(AuthContext);


  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products', location, userProfile],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/products/advertise?userID=${userProfile._id}`);
      const data = await res.json();

      return data;
    }
  });

  const { data: categories = [], isLoading: isLoadingCat } = useQuery({
    queryKey: ['categories', location],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/categories`);
      const data = await res.json();

      return data;
    }
  });


  if (isLoading || isLoadingCat) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <main>
      <Hero></Hero>
      {
        products.length > 0 &&
        <section className='content'>
          <div className="container">
            <Heading
              title='Advertise Items'
            ></Heading>
            <ProductLoop
              products={products}
              refetch={refetch}
              isSlider={true}
            ></ProductLoop>
          </div>
        </section>
      }

      <section className='content bg-primary'>
        <div className="container mb-14">
          <Heading
            title='Categories'
            isDark={true}
          ></Heading>
          <CategoryLoop categories={categories}></CategoryLoop>
        </div>
      </section>

      <section className='content'>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:mb-10">
            <div className='relative'>
              <div className='hidden md:block md:absolute -top-32 p-4 bg-white'>
                <img src={handwithwatch} className='w-full' alt="" />
              </div>
            </div>
            <div className='text-center md:text-left'>
              <img src={icon1} className='inline' alt="" />
              <h4 className='mt-2 mb-4'>Best Services</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            <div className='text-center md:text-left'>
              <img src={icon2} className='inline' alt="" />
              <h4 className='mt-2 mb-4'>Best Services</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
            <div className='text-center md:text-left'>
              <img src={icon3} className='inline' alt="" />
              <h4 className='mt-2 mb-4'>Best Services</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;