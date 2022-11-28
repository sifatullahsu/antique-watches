import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = ({ category }) => {

  const { _id, catName, catImage } = category;

  return (
    <div className='bg-white border'>
      <img src={catImage} className='border-b' alt="" />
      <div className='flex justify-between px-5 py-4'>
        <div className='basis-auto'>
          <h4>{catName}</h4>
        </div>
        <div className='basis-16 text-right'>
          <Link to={`/categories/${_id}`} className='btn btn-primary btn-sm text-xs'>View</Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;