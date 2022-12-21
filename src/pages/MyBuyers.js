import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { RiEyeFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import DashLoading from '../components/DashLoading';
import Heading from '../components/Heading';
import { AuthContext } from '../contexts/AuthContextComp';

const MyBuyers = () => {
  const { userProfile } = useContext(AuthContext);
  const location = useLocation();

  const { data: orders = [], isLoading } = useQuery({
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

  const [buyerDetails, setBuyerDetails] = useState(null);

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
                  <th>Status</th>
                  <th className='rounded-none text-right'>Actions</th>
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
                        <td>
                          <span className={`text-white px-3 py-1 text-xs uppercase rounded-full 
                          ${order?.purchased?.status === 'true' ? 'bg-green-600' : 'bg-red-600'}`}
                          >{order?.purchased?.status === 'true' ? 'sold' : 'unsold'}</span>
                        </td>
                        <td className='text-right'>
                          <label
                            htmlFor="buyer-details-modal"
                            className='btn btn-ghost btn-sm px-2'
                            onClick={() => setBuyerDetails(order)}
                          >
                            <RiEyeFill></RiEyeFill>
                          </label>
                        </td>
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

      {
        buyerDetails &&
        <>
          <input type="checkbox" id="buyer-details-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h5>Buyer details..</h5>

              <div className='mt-2'>
                <div className='font-semibold inline'>{buyerDetails?.productInfo?.name}</div>
                <div className='text-xs inline'> - ${buyerDetails?.productInfo?.price}</div>
              </div>
              <div className='mt-5'>
                <p><span className='text-xs font-semibold uppercase'>Number: </span>{buyerDetails.userNumber}</p>
                <p><span className='text-xs font-semibold uppercase'>Location: </span>{buyerDetails.userlocation}</p>
              </div>

              <p className='text-xs font-semibold uppercase mt-6 mb-1'>More Details</p>
              <div className='flex flex-nowrap justify-between items-end'>
                <div className='flex flex-nowrap items-end'>
                  <div className='basis-auto'>
                    <img src={buyerDetails.userInfo?.image} className='w-12 h-12' alt="" />
                  </div>
                  <div className='basis-auto pl-3'>
                    <div>
                      <h5 className='uppercase text-sm font-semibold text-primary-200 inline'>{buyerDetails.userInfo?.name}</h5>
                      {
                        buyerDetails.userInfo?.verified === 'true' &&
                        <FaCheckCircle className='text-blue-500 inline ml-2 -mt-1'></FaCheckCircle>
                      }
                    </div>
                    <span className='uppercase text-xs text-gray-400'>{buyerDetails.userInfo?.role}</span>
                  </div>
                </div>
                <label
                  htmlFor="buyer-details-modal"
                  className="btn btn-primary btn-sm"
                  onClick={() => setBuyerDetails(null)}
                >Cancel</label>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default MyBuyers;