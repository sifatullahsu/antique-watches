import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashLoading from '../components/DashLoading';
import Heading from '../components/Heading';
import { AuthContext } from '../contexts/AuthContextComp';

const DashPage = () => {
  const { userProfile } = useContext(AuthContext);
  const location = useLocation();

  const [dashData, setDashData] = useState({ totalPurchased: 0, totalCanceled: 0, pendingPayment: 0, totalSpend: 0 });

  const { data: orders = [], isLoading } = useQuery({
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


  useEffect(() => {

    let totalPurchased = 0;
    let totalCanceled = 0;
    let pendingPayment = 0;
    let totalSpend = 0;

    orders.forEach(order => {

      if (order.productInfo.itemStatus === 'unsold') {
        pendingPayment = pendingPayment + 1;
      }

      if (order.productInfo.itemStatus === 'sold' && order.userID === order?.purchased?.userID) {
        totalPurchased = totalPurchased + 1;
        totalSpend = totalSpend + parseInt(order.productPrice);
      }

      if (order.productInfo.itemStatus === 'sold' && order.userID !== order?.purchased?.userID) {
        totalCanceled = totalCanceled + 1;
      }

      setDashData(() => ({ totalPurchased, totalCanceled, pendingPayment, totalSpend }));
    });


  }, [orders]);


  function addLeadingZeros(num, totalLength) {
    return String(num).padStart(totalLength, '0');
  }


  if (isLoading) {
    return (
      <DashLoading></DashLoading>
    );
  }
  return (
    <div>
      <Heading
        title={`Welcome ${userProfile?.name},`}
        text='Here you will find all the options on sitebar.'
      ></Heading>

      <div className="stats bg-primary text-primary-content">

        <div className="stat">
          <div className="stat-title">Total Purchased</div>
          <div className="stat-value">{addLeadingZeros(dashData?.totalPurchased, 2)}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Canceled</div>
          <div className="stat-value">{addLeadingZeros(dashData?.totalCanceled, 2)}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Panding Payment</div>
          <div className="stat-value">{addLeadingZeros(dashData?.pendingPayment, 2)}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Spend</div>
          <div className="stat-value">${addLeadingZeros(dashData?.totalSpend.toLocaleString(), 2)}</div>
        </div>

      </div>
    </div>
  );
};

export default DashPage;