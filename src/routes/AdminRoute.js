import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { AuthContext } from '../contexts/AuthContextComp';

const AdminRoute = ({ children }) => {

  const { user, userProfile, userLoading } = useContext(AuthContext);
  const location = useLocation();

  if ((userLoading)) {
    return <Loading></Loading>
  }

  if (user && user?.uid && userProfile?.role === 'admin') {
    return children;
  }

  // toast.error('Unauthorize Access. Please Login..');
  return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;