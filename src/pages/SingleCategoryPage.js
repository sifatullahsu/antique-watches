import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import Heading from '../components/Heading';
import ProductLoop from '../components/loops/ProductLoop';
import { AuthContext } from '../contexts/AuthContextComp';

const SingleCategoryPage = () => {
  const products = useLoaderData();
  const { userProfile } = useContext(AuthContext);

  const [buyNow, setBuyNow] = useState(null);
  const [complaint, setComplaint] = useState(null);

  const { register, handleSubmit, reset } = useForm();
  const { register: orderRegister, handleSubmit: orderHandleSubmit, reset: orderReset } = useForm();

  const handleConplaint = (data) => {

    fetch('http://localhost:5000/complaints', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Complaint submitted successful..');
        reset();
      })
  }

  const handleBooking = (data) => {

    fetch('http://localhost:5000/orders', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Booking successful..');
        orderReset();
      })
  }


  return (
    <main id='content'>
      <div className="container">
        <Heading
          title="Categories"
          text="All categories listed on Antique Watches"
        ></Heading>
        <ProductLoop products={products} setBuyNow={setBuyNow} setComplaint={setComplaint}></ProductLoop>

        {
          buyNow?._id &&
          <>
            <input type="checkbox" id="book-now-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <h4>Booking Form</h4>

                <form onSubmit={orderHandleSubmit(handleBooking)}>
                  {/* Booking Form */}

                  <input defaultValue={userProfile?._id} {...orderRegister("userID", { required: true })} readOnly hidden />
                  <input defaultValue={buyNow?._id} {...orderRegister("productID", { required: true })} readOnly hidden />

                  <div className='grid grid-cols-2 gap-x-5 gap-y-0'>
                    <div className="form-control sm">
                      <label className="label"><span className="label-text">Name</span></label>
                      <input defaultValue={userProfile?.name} {...orderRegister("userName", { required: true })} readOnly />
                    </div>

                    <div className="form-control sm">
                      <label className="label"><span className="label-text">Email</span></label>
                      <input defaultValue={userProfile?.email} {...orderRegister("userEmail", { required: true })} readOnly />
                    </div>

                    <div className="form-control sm">
                      <label className="label"><span className="label-text">Product Name</span></label>
                      <input defaultValue={buyNow?.name} {...orderRegister("productName", { required: true })} readOnly />
                    </div>

                    <div className="form-control sm">
                      <label className="label"><span className="label-text">Product Price</span></label>
                      <input defaultValue={buyNow?.price} {...orderRegister("productPrice", { required: true })} readOnly />
                    </div>

                  </div>

                  <div className="form-control sm">
                    <label className="label"><span className="label-text">Your Mobile Number</span></label>
                    <input type='tel' {...orderRegister("userNumber", { required: true })} />
                  </div>

                  <div className="form-control sm">
                    <label className="label"><span className="label-text">Pick Up Location</span></label>
                    <input {...orderRegister("userlocation", { required: true })} />
                  </div>


                  <button type="submit" className='btn btn-primary btn-sm w-full mt-5'>Confirm Booking</button>
                </form>


                <div className="modal-action">
                  <label
                    htmlFor="book-now-modal"
                    className='btn btn-primary btn-sm text-xs'
                    onClick={() => setBuyNow(null)}
                  >Cancle</label>
                </div>
              </div>
            </div>
          </>
        }

        {
          complaint?._id && userProfile?.email &&
          <>
            <input type="checkbox" id="complaint-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box">
                <h4 className="">Report to admin!</h4>
                <h5 className="py-4">{complaint?.name}</h5>
                <form onSubmit={handleSubmit(handleConplaint)}>

                  <input defaultValue={complaint?._id} {...register("productID", { required: true })} readOnly hidden />
                  <input defaultValue={userProfile?._id} {...register("userID", { required: true })} readOnly hidden />

                  <div className="form-control">
                    <label className="label"><span className="label-text">Reason for complaint</span></label>
                    <textarea {...register("reason", { required: true })} className="textarea textarea-bordered h-24"></textarea>
                  </div>

                  <button type="submit" className='btn btn-primary w-full mt-5'>Report to Admin</button>

                </form>
                <div className="modal-action">
                  <label
                    htmlFor="complaint-modal"
                    className='btn btn-primary btn-sm text-xs'
                    onClick={() => setComplaint(null)}
                  >Cancel</label>
                </div>
              </div>
            </div>
          </>
        }





      </div>
    </main>
  );
};

export default SingleCategoryPage;