import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

const privateKey = process.env.REACT_APP_PK;

const stripePromise = loadStripe(privateKey);


const CheckoutPage = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
    </div>
  );
};

export default CheckoutPage;