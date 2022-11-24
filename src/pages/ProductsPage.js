import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ProductsPage = () => {
  const products = useLoaderData();

  return (
    <div>
      <h3>Products: {products?.length}</h3>
    </div>
  );
};

export default ProductsPage;