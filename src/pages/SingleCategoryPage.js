import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import ProductLoop from '../components/loops/ProductLoop';
import { AuthContext } from '../contexts/AuthContextComp';

const SingleCategoryPage = () => {

  const location = useLocation();
  const propsID = location?.pathname.split('/categories/')[1];
  const { userProfile } = useContext(AuthContext);


  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products', location, userProfile],
    queryFn: async () => {
      if (userProfile?._id) {
        const res = await fetch(`http://localhost:5000/products/categories?catID=${propsID}&userID=${userProfile._id}`);
        const data = await res.json();

        return data;
      }
      return []
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
        <ProductLoop
          products={products}
          refetch={refetch}
        ></ProductLoop>
      </div>
    </main>
  );
};

export default SingleCategoryPage;