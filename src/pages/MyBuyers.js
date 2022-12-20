import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DashLoading from '../components/DashLoading';
import Heading from '../components/Heading';
import { AuthContext } from '../contexts/AuthContextComp';

const MyBuyers = () => {
  const { userProfile } = useContext(AuthContext);
  const location = useLocation();

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', location, userProfile],
    queryFn: async () => {
      if (userProfile?._id) {
        const res = await fetch(`http://localhost:5000/orders/author/${userProfile?._id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('antique-token')}`
          }
        });
        const data = await res.json();

        return data;
      }
      else {
        return [];
      }
    }
  });


  if (isLoading) {
    return (
      <DashLoading></DashLoading>
    );
  }

  return (
    <div>
      <Heading
        title='My Buyers'
      ></Heading>

      {
        orders?.length > 0 ?
          <div className="overflow-x-auto">
            <table className="table border w-full">
              <thead>
                <tr>
                  <th className='rounded-none'>No.</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>User Name</th>
                  <th>User Number</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  orders?.map((order, index) => {

                    if (!order?.productInfo) {
                      return (<tr key={order._id}>
                        <th>{index + 1}</th>
                        <td colSpan="5">This product deleted by author.</td>
                      </tr>);
                    }

                    return (
                      <tr key={order._id}>
                        <th>{index + 1}</th>
                        <td>{order.productInfo.name}</td>
                        <td>${order.productInfo.price}</td>
                        <td>{order.userName}</td>
                        <td>{order.userNumber}</td>
                        <td>{order.userlocation}</td>
                        <td><span
                          className={`text-white px-3 py-1 text-xs uppercase rounded-full ${order?.purchased?.status === 'true' ? 'bg-green-600' : 'bg-red-600'}`}
                        >{order?.purchased?.status === 'true' ? 'sold' : 'unsold'}</span></td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          :
          <h4>No buyers data found..</h4>
      }
    </div>
  );
};

export default MyBuyers;