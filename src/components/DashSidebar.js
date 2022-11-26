import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextComp';

const DashSidebar = () => {

  const path = useLocation().pathname;
  const { userProfile, userLogout } = useContext(AuthContext);

  const handleUserLogout = () => {
    userLogout()
      .then(result => {
        toast.success('Logout successfull..')
      })
      .catch(err => {
        toast.error('Somthing is wrong..')
        console.log(err);
      })
  }

  return (
    <ul className='dashboard menu rounded-box'>
      <li><NavLink
        to='/dashboard'
        className={({ isActive }) => isActive && path === '/dashboard' ? 'active' : ''}
      >Dashboard</NavLink></li>
      <li><NavLink to='/dashboard/my-orders' >My Orders</NavLink></li>

      {
        userProfile?.role === 'seller' &&
        <>
          <span className='uppercase text-xs text-gray-700 mt-5 mb-3'>Seller Area</span>
          <li><NavLink to='/dashboard/add-product'>Add Product</NavLink></li>
          <li><NavLink to='/dashboard/my-products'>My Products</NavLink></li>
          <li><NavLink to='/dashboard/my-buyers'>My Buyers</NavLink></li>
        </>
      }

      {
        userProfile?.role === 'admin' &&
        <>
          <span className='uppercase text-xs text-gray-700 mt-5 mb-3'>Admin Area</span>
          <li><NavLink to='/dashboard/all-sellers' >All Sellers</NavLink></li>
          <li><NavLink to='/dashboard/all-buyers' >All Buyers</NavLink></li>
          <li><NavLink to='/dashboard/products' >Products</NavLink></li>
          <li><NavLink to='/dashboard/add-category' >Add Category</NavLink></li>
          <li><NavLink to='/dashboard/categories' >Categories</NavLink></li>
          <li><NavLink to='/dashboard/reported-items' >Reported Items</NavLink></li>
        </>
      }
      <span className='uppercase text-xs text-gray-700 mt-5 mb-3'>Action</span>
      <li><button onClick={handleUserLogout}>Logout</button></li>
    </ul >
  );
};

export default DashSidebar;