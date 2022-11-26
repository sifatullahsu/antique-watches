import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import CategoryLoop from '../components/loops/CategoryLoop';

const AllCategoriesPage = () => {
  const location = useLocation();

  const { data: categories = [], isLoading, refetch } = useQuery({
    queryKey: ['categories', location],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/categories`);
      const data = await res.json();

      return data;
    }
  });

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

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