import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const privateKey = process.env.REACT_APP_PK;
const stripePromise = loadStripe(privateKey);

const CheckoutPage = () => {
  const order = useLoaderData();

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm order={order}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default CheckoutPage;