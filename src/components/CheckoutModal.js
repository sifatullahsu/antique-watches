import React from 'react';
import CheckoutPage from '../pages/CheckoutPage';


const CheckoutModal = ({ order, setCheckoutItem }) => {

  return (
    <>
      <input type="checkbox" id="checkout-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h4>Product Checkout</h4>
          <h5 className='mt-3'>{order.productName}</h5>
          <p>${order.productPrice}</p>
          <div className='mt-10 mb-14'>
            <CheckoutPage order={order}></CheckoutPage>
          </div>

          <div className="modal-action">
            <label
              htmlFor="checkout-modal"
              className="btn btn-primary btn-sm"
              onClick={() => setCheckoutItem(null)}
            >Cancle</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;