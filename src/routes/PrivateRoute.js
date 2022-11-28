import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import DashLoading from '../components/DashLoading';
import Loading from '../components/Loading';
import { AuthContext } from '../contexts/AuthContextComp';

const PrivateRoute = ({ children, role }) => {
  const { user, userLoading } = useContext(AuthContext);
  const location = useLocation();

  const { data: userProfile = {}, isLoading } = useQuery({
    queryKey: ['userProfile', user],
    queryFn: async () => {
      if (user?.uid) {
        const res = await fetch(`http://localhost:5000/users/uid/${user?.uid}`);
        const data = await res.json();

        return data;
      }
      return {}
    }
  });

  // console.log(userProfile);

  if ((userLoading || isLoading)) {
    return <Loading></Loading>
  }

  if (userProfile._id && role === 'any') {
    return children;
  }
  else if (userProfile._id && userProfile.role === 'seller' && role === 'seller') {
    return children;
  }
  else if (userProfile._id && userProfile.role === 'admin' && role === 'admin') {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;