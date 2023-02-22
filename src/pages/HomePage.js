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

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

import testimonial1 from '../assets/images/testimonial-img-01.jpg';
import testimonial2 from '../assets/images/testimonial-img-02.jpg';
import testimonial3 from '../assets/images/testimonial-img-03.jpg';

import achievement1 from '../assets/images/achievement1.png';
import achievement2 from '../assets/images/achievement2.png';
import achievement3 from '../assets/images/achievement3.png';
import achievement4 from '../assets/images/achievement4.png';

const HomePage = () => {

  const location = useLocation();
  const { userProfile } = useContext(AuthContext);


  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products', location, userProfile],
    queryFn: async () => {
      const res = await fetch(`https://antique-watches.vercel.app/products/advertise?userID=${userProfile._id}`);
      const data = await res.json();

      return data;
    }
  });

  const { data: categories = [], isLoading: isLoadingCat } = useQuery({
    queryKey: ['categories', location],
    queryFn: async () => {
      const res = await fetch(`https://antique-watches.vercel.app/categories`);
      const data = await res.json();

      return data;
    }
  });

  const testimonials = [
    {
      name: 'Jhon Doe',
      designation: 'CEO',
      img: testimonial1,
      testimonials: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt vero harum corporis unde molestiae iusto debitis modi deleniti neque doloremque, rerum nesciunt culpa cumque odit minus! Nulla odit cumque illum dolore, dolores ipsam, qui numquam blanditiis impedit atque, eveniet vitae. Magnam voluptatum exercitationem libero ducimus excepturi totam modi est. Ratione?'
    },
    {
      name: 'Jhon Doe',
      designation: 'CEO',
      img: testimonial2,
      testimonials: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt vero harum corporis unde molestiae iusto debitis modi deleniti neque doloremque, rerum nesciunt culpa cumque odit minus! Nulla odit cumque illum dolore, dolores ipsam, qui numquam blanditiis impedit atque, eveniet vitae. Magnam voluptatum exercitationem libero ducimus excepturi totam modi est. Ratione?'
    },
    {
      name: 'Jhon Doe',
      designation: 'CEO',
      img: testimonial3,
      testimonials: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt vero harum corporis unde molestiae iusto debitis modi deleniti neque doloremque, rerum nesciunt culpa cumque odit minus! Nulla odit cumque illum dolore, dolores ipsam, qui numquam blanditiis impedit atque, eveniet vitae. Magnam voluptatum exercitationem libero ducimus excepturi totam modi est. Ratione?'
    },
  ]


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

      <section className='content bg-primary'>
        <div className="container">
          <Heading
            title='Our Achievement'
            isDark={true}
          ></Heading>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5'>
            <div className='bg-accent py-4 px-8 lg:px-10 rounded'><img src={achievement1} alt="" /></div>
            <div className='bg-accent py-4 px-8 lg:px-10 rounded'><img src={achievement2} alt="" /></div>
            <div className='bg-accent py-4 px-8 lg:px-10 rounded'><img src={achievement3} alt="" /></div>
            <div className='bg-accent py-4 px-8 lg:px-10 rounded'><img src={achievement4} alt="" /></div>
          </div>
        </div>
      </section>

      <section className='content'>
        <div className="container">
          <Swiper
            slidesPerView={1}
            spaceBetween={25}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {
              testimonials.map((testimonial, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className='text-center max-w-3xl mx-auto px-5'>
                      <img src={testimonial.img} alt="" className='w-24 rounded-full mx-auto mb-5' />
                      <p>{testimonial.testimonials}</p>
                      <h5 className=' mt-5'>{testimonial.name}</h5>
                      <span className='uppercase text-xs text-gray-400'>{testimonial.designation}</span>
                    </div>
                  </SwiperSlide>
                );
              })
            }
          </Swiper >
        </div>
      </section>


    </main>
  );
};

export default HomePage;