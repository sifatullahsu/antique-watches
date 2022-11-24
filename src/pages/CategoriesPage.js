import React from 'react';
import { useLoaderData } from 'react-router-dom';

const CategoriesPage = () => {
  const categories = useLoaderData();

  return (
    <div>
      <h3>Categories: {categories?.length}</h3>
    </div>
  );
};

export default CategoriesPage;