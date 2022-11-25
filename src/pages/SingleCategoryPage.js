import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Heading from '../components/Heading';
import ProductLoop from '../components/loops/ProductLoop';

const SingleCategoryPage = () => {
  const products = useLoaderData();

  const [buyNow, setBuyNow] = useState(null);

  return (
    <main id='content'>
      <div className="container">
        <Heading
          title="Categories"
          text="All categories listed on Antique Watches"
        ></Heading>
        <ProductLoop products={products} setBuyNow={setBuyNow}></ProductLoop>




        <input type="checkbox" id="book-now-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>

            <p className="py-4">{buyNow?.name}</p>


            <div className="modal-action">
              <label
                htmlFor="book-now-modal"
                className='btn btn-primary btn-sm text-xs'
                onClick={() => setBuyNow(null)}
              >Yay!</label>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SingleCategoryPage;