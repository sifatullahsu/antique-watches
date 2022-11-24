import React, { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextComp';

const DashSidebar = () => {

  const path = useLocation().pathname;
  const { user, userLogout } = useContext(AuthContext)

  return (
    <ul className='dashboard menu rounded-box'>
      <li><NavLink
        to='/dashboard'
        className={({ isActive }) => isActive && path === '/dashboard' ? 'active' : ''}
      >Dashboard</NavLink></li>
      <li><NavLink to='/dashboard/my-orders' >My Orders</NavLink></li>
      <li><NavLink to='/dashboard/add-a-product' >Add A Product</NavLink></li>
      <li><NavLink to='/dashboard/my-products' >My Products</NavLink></li>
      <li><NavLink to='/dashboard/my-buyers' >My Buyers</NavLink></li>
      <li><NavLink to='/dashboard/all-sellers' >All Sellers</NavLink></li>
      <li><NavLink to='/dashboard/all-buyers' >All Buyers</NavLink></li>
      <li><NavLink to='/dashboard/reported-items' >Reported Items</NavLink></li>
      <li><button>Logout</button></li>
    </ul>
  );
};

export default DashSidebar;