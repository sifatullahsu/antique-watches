import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductGrid = ({ product }) => {

  const {
    _id,
    name,
    price,
    purchasedYear,
    condition,
    category,
    number,
    location,
    itemStatus,
    advertise,
    description,
    imgURL,
    author,
    authorInfo,
    publishedDate
  } = product;

  console.log(product);


  /* 
  picture, 
  name, 
  location, 
  resale price, original price, 
  years of use, 
  the time when it got posted, 
  the seller's name; if the seller is verified, there will be a blue tick next to their name and a 
  Book now button
*/
  return (
    <div className='product border p-5 relative'>
      <img src={imgURL} className='w-32 absolute top-0 right-0 border-l border-b' alt="" />

      <h4>{name}</h4>
      <div>
        <span>Resell Price: ${price}</span>
        <span>Original Price: ${price}</span>
      </div>
      <p>{location}</p>
      <p>Published Time: {publishedDate}</p>

      <div className='flex flex-nowrap items-end justify-between mt-10'>
        <div className='author flex flex-nowrap'>
          <div className='basis-auto'>
            <img src={authorInfo.image} className='w-12 h-12' alt="" />
          </div>
          <div className='basis-auto pl-3'>
            <div>
              <h5 className='uppercase font-semibold text-primary-200 inline'>{authorInfo.name}</h5>
              {
                authorInfo.verified === 'true' &&
                <FaCheckCircle className='text-blue-500 inline ml-2 -mt-1'></FaCheckCircle>
              }
            </div>
            <span className='uppercase text-xs text-gray-400'>{authorInfo.role === 'seller' ? 'SELLER' : null}</span>
          </div>
        </div>
        <Link className='btn btn-primary btn-sm text-xs'>Book now</Link>
      </div>

    </div >
  );
};

export default ProductGrid;