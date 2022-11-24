import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContextComp';
import GoogleSignIn from './GoogleSignIn';

const Login = () => {
  const { userLogin } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const handleLogin = (formData) => {
    const { email, password } = formData;

    userLogin(email, password)
      .then(result => {
        toast.success('Login successfull..');
        reset();
      })
      .catch(err => {
        console.log(err);
        toast.error('Somthing is wrong..');
      })

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
      <GoogleSignIn></GoogleSignIn>
    </div>
  );
};

export default Login;