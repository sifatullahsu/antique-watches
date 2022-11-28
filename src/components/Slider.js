import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductGrid from './grid/ProductGrid';

const Slider = ({ products, setBuyNow, setComplaint, userProfile }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={25}
      slidesPerGroup={2}

      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
      }}
    >

      {
        products.map(product => {
          return (
            <SwiperSlide key={product._id}>
              <ProductGrid
                product={product}
                setBuyNow={setBuyNow}
                setComplaint={setComplaint}
                userProfile={userProfile}
              ></ProductGrid>
            </SwiperSlide>
          );
        })
      }
    </Swiper >
  );
};

export default Slider;