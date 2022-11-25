import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Heading from '../components/Heading';

const MyOrderPage = () => {
  const orders = useLoaderData();
  console.log(orders);

  return (
    <div>
      <Heading
        title='All Orders'
      ></Heading>

    </div>
  );
};

export default MyOrderPage;