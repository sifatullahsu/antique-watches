import React from 'react';
import ProductGrid from '../grid/ProductGrid';

const ProductLoop = ({ products }) => {

  return (
    <div className='grid grid-cols-2 gap-5'>
      {
        products.map(product => <ProductGrid key={product._id} product={product}></ProductGrid>)
      }
    </div>
  );
};

export default ProductLoop;