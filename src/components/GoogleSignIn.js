import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextComp';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn = ({ from }) => {
  const { userSocialLogin } = useContext(AuthContext);
  // const navigate = useNavigate();


  const handleGoogleSignIn = () => {
    userSocialLogin('google')
      .then(res => {
        const user = {
          name: res.user.displayName,
          email: res.user.email,
          image: res.user.photoURL,
          role: 'buyer',
          verified: 'false',
          uid: res.user.uid
        }

        fetch('http://localhost:5000/users/social', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)
        })
          .then(res => res.json())
          .then(data => {
            if (data.acknowledged) {
              toast.success('Successfully logged in!!');
            }
          })
      })
      .catch(err => {
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