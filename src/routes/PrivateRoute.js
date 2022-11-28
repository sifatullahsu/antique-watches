import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { AuthContext } from '../contexts/AuthContextComp';

const PrivateRoute = ({ children, role }) => {
  const { user, userLoading } = useContext(AuthContext);
  const location = useLocation();

  if ((userLoading)) {
    return <Loading></Loading>
  }

  if (user && user?.uid) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;