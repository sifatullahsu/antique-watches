import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Heading from '../components/Heading';
import CategoryLoop from '../components/loops/CategoryLoop';

const AllCategoriesPage = () => {
  const categories = useLoaderData();

  return (
    <main id='content'>
      <div className="container">
        <Heading
          title="Categories"
          text="All categories listed on Antique Watches"
        ></Heading>
        <CategoryLoop categories={categories}></CategoryLoop>
      </div>
    </main>
  );
};

export default AllCategoriesPage;