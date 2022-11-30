import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

const privateKey = process.env.REACT_APP_PK;
const stripePromise = loadStripe(privateKey);

const CheckoutPage = ({ order }) => {

  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm order={order}></CheckoutForm>
      </Elements>
    </>
  );
};

export default CheckoutPage;