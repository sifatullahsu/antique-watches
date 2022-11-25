import React from 'react';
import CategoryGrid from '../grid/CategoryGrid';

const CategoryLoop = ({ categories }) => {
  return (
    <div className='grid grid-cols-3 gap-5'>
      {
        categories.map(category => <CategoryGrid key={category._id} category={category}></CategoryGrid>)
      }
    </div>
  );
};

export default CategoryLoop;