import React from 'react';
import ProductGrid from '../grid/ProductGrid';

const ProductLoop = ({ products, setBuyNow }) => {

  return (
    <div className='grid grid-cols-2 gap-5'>
      {
        products.map(product => <ProductGrid key={product._id} product={product} setBuyNow={setBuyNow}></ProductGrid>)
      }
    </div>
  );
};

export default ProductLoop;