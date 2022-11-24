import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextComp';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn = ({ from, setLoading }) => {
  const { userSocialLogin } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleGoogleSignIn = () => {

    setLoading(true);

    userSocialLogin('google')
      .then(res => {
        toast.success('Successfully logged in!!');
      })
      .catch(err => {
        setLoading(false);
        toast.error('Something is wrong!!');
      })
  }

  return (
    <>
      <button onClick={handleGoogleSignIn} className='btn btn-primary w-full'>
        <FcGoogle className='inline mr-2'></FcGoogle> Login With Google
      </button>
    </>
  );
};

export default GoogleSignIn;