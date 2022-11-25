import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Heading from '../components/Heading';
import ProductLoop from '../components/loops/ProductLoop';

const SingleCategoryPage = () => {
  const products = useLoaderData();

  return (
    <main id='content'>
      <div className="container">
        <Heading
          title="Categories"
          text="All categories listed on Antique Watches"
        ></Heading>
        <ProductLoop products={products}></ProductLoop>
      </div>
    </main>
  );
};

export default SingleCategoryPage;