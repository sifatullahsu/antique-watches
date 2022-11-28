import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextComp';
import GoogleSignIn from './GoogleSignIn';
import Loading from './Loading';

const Login = () => {
  const { userLogin, getUserJwt, userLoading, setUserLoading } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = (formData) => {
    reset();
    const { email, password } = formData;

    userLogin(email, password)
      .then(result => {
        toast.success('Login successfull..');
        getUserJwt(result.user.email)
          .then(data => {
            localStorage.setItem('antique-token', data.token);
            navigate(from, { replace: true });
          })
      })
      .catch(err => {
        toast.error('Somthing is wrong..');
        setUserLoading(false);
      })

  }

  if (userLoading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>

        <div className="form-control">
          <label className="label"><span className="label-text">Email</span></label>
          <input type='mail' {...register("email", { required: true })} />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Password</span></label>
          <input type='password' {...register("password", { required: true })} />
        </div>

        <button type="submit" className='btn btn-primary w-full mt-5'>Login Now</button>

      </form>

      <div className="flex flex-col"><div className="divider my-6">OR</div></div>
      <GoogleSignIn from={from}></GoogleSignIn>
    </div>
  );
};

export default Login;