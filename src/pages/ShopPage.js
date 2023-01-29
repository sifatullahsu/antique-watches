import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import ProductLoop from '../components/loops/ProductLoop';
import { AuthContext } from '../contexts/AuthContextComp';

const ShopPage = () => {

  const { userProfile } = useContext(AuthContext);
  const location = useLocation();

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products', location, userProfile],
    queryFn: async () => {
      const url = `https://antique-watches.vercel.app/shop/products/?userID=${userProfile?._id}`;
      const res = await fetch(url);
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
          title="All Products"
          text="Here listed all Antique Watches"
        ></Heading>
        <ProductLoop
          products={products}
          refetch={refetch}
        ></ProductLoop>
      </div>
    </main>
  );
};

export default ShopPage;