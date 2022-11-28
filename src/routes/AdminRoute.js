import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { AuthContext } from '../contexts/AuthContextComp';

const AdminRoute = ({ children }) => {

  const location = useLocation();
  const { user, userLoading } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `https://antique-watches.vercel.app/users/uid/${user?.uid}`;

    if (user?.uid) {
      fetch(url, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('antique-token')}`
        },
      })
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          setUserProfile(data);
        })
        .catch(err => {
          setLoading(false);
        })
    }
    else if (user === null) {
      setLoading(false);
    }

  }, [user]);



  if ((userLoading || loading)) {
    return <Loading></Loading>
  }

  if (user && user?.uid && userProfile?.role === 'admin') {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;