import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import ModalCom from '../components/ModalCom';
import { AuthContext } from '../contexts/AuthContextComp';

const MyOrderPage = () => {
  const location = useLocation();
  const { userProfile } = useContext(AuthContext);


  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', location, userProfile],
    queryFn: async () => {
      if (userProfile?._id) {
        const res = await fetch(`https://antique-watches.vercel.app/orders/userid/${userProfile?._id}`, {
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

  const [itemDelete, setItemDelete] = useState(null);


  const handleDelete = (id) => {
    fetch(`https://antique-watches.vercel.app/orders?delete=${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('antique-token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Complaint delete successful...');
        refetch();
      })
  }


  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <div>
      <Heading
        title='All Orders'
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
                  <th>Status</th>
                  <th className='text-right'>Payment</th>
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
                        <td><span
                          className={`text-white px-3 py-1 text-xs uppercase rounded-full ${order.productInfo.itemStatus === 'unsold' ? 'bg-red-600' : 'bg-green-600'}`}
                        >{order.productInfo.itemStatus}</span></td>
                        <td className='text-right'>
                          {
                            order.productInfo.itemStatus === 'unsold' &&
                            <Link
                              className='btn btn-primary btn-sm text-xs py-1'
                              to={`/dashboard/checkout/${order._id}`}
                            >Pay Now</Link>
                          }
                          {
                            order.productInfo.itemStatus === 'sold' && order.userID === order?.purchased?.userID &&
                            <span className='text-white px-3 py-1 text-xs uppercase rounded-full bg-green-600'>Purchased</span>
                          }
                          {
                            order.productInfo.itemStatus === 'sold' && order.userID !== order?.purchased?.userID &&
                            <span className='text-white px-3 py-1 text-xs uppercase rounded-full bg-red-600'>Canceled</span>
                          }

                        </td>
                        <td className='text-right'>
                          {
                            order.productInfo.itemStatus === 'sold' && order.userID !== order?.purchased?.userID &&
                            <label
                              htmlFor="delete-modal"
                              className='btn btn-ghost btn-sm px-2'
                              onClick={() => setItemDelete(order)}
                            >
                              <FaTrashAlt></FaTrashAlt>
                            </label>
                          }

                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
          :
          <h4>No orders data found..</h4>
      }

      {
        (itemDelete?._id) &&
        <ModalCom
          title="Would you like to delete the order?"
          text="You won't be able to undo it again..."
          itemDelete={itemDelete}
          setItemDelete={setItemDelete}
          handleDelete={handleDelete}
        ></ModalCom>
      }
    </div >
  );
};

export default MyOrderPage;