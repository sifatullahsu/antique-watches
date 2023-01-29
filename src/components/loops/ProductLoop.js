import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthContextComp';
import ProductGrid from '../grid/ProductGrid';
import BuyNowModal from '../BuyNowModal';
import ComplaintModal from '../ComplaintModal';
import Slider from '../Slider';



const ProductLoop = ({ products, refetch, isSlider }) => {

  const { userProfile } = useContext(AuthContext);

  const { register, handleSubmit, reset } = useForm();
  const { register: orderRegister, handleSubmit: orderHandleSubmit, reset: orderReset } = useForm();

  const [buyNow, setBuyNow] = useState(null);
  const [complaint, setComplaint] = useState(null);

  const handleBooking = (data) => {

    fetch('https://antique-watches.vercel.app/orders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('antique-token')}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Booking successful..');
        orderReset();
        refetch();
      })
  }

  const handleConplaint = (data) => {

    fetch('https://antique-watches.vercel.app/complaints', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('antique-token')}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Complaint submitted successful..');
        reset();
      })
  }

  return (
    <>
      {
        !isSlider &&
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {
            products.map(product => <ProductGrid
              key={product?._id}
              product={product}
              setBuyNow={setBuyNow}
              setComplaint={setComplaint}
              userProfile={userProfile}
            ></ProductGrid>)
          }
        </div>
      }

      {
        isSlider &&
        <Slider
          products={products}
          setBuyNow={setBuyNow}
          setComplaint={setComplaint}
          userProfile={userProfile}
        ></Slider>
      }








      {
        buyNow?._id &&
        <BuyNowModal
          buyNow={buyNow}
          userProfile={userProfile}
          orderHandleSubmit={orderHandleSubmit}
          handleBooking={handleBooking}
          orderRegister={orderRegister}
          setBuyNow={setBuyNow}
          orderReset={orderReset}
        ></BuyNowModal>
      }
      {
        complaint?._id &&
        <>
          <ComplaintModal
            complaint={complaint}
            userProfile={userProfile}
            handleSubmit={handleSubmit}
            handleConplaint={handleConplaint}
            register={register}
            setComplaint={setComplaint}
          ></ComplaintModal>
        </>
      }
    </>
  );
};

export default ProductLoop;