import React from 'react';

const BuyNowModal = ({ buyNow, userProfile, orderHandleSubmit, handleBooking, orderRegister, setBuyNow, orderReset }) => {
  return (
    <>
      <input type="checkbox" id="book-now-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h4>Booking Form</h4>

          <form onSubmit={orderHandleSubmit(handleBooking)}>

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
              onClick={() => {
                setBuyNow(null);
                orderReset();
              }}
            >Cancle</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyNowModal;