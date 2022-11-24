import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../contexts/AuthContextComp';
import GoogleSignIn from './GoogleSignIn';

const Register = () => {
  const { userRegister } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const handleRegister = (data) => {
    console.log(data);

  }


  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>

        <div className="form-control">
          <label className="label"><span className="label-text">Full Name</span></label>
          <input type='text' {...register("displayName", { required: true })} />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Email</span></label>
          <input type='mail' {...register("email", { required: true })} />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Password</span></label>
          <input type='password' {...register("password", { required: true })} />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">ImgaeURL</span></label>
          <input type='url' {...register("imageURL", { required: true })} />
        </div>

        <button type="submit" className='btn btn-primary w-full mt-5'>Register Now</button>

      </form>
      <div className="flex flex-col"><div className="divider my-6">OR</div></div>
      <GoogleSignIn></GoogleSignIn>
    </div>
  );
};

export default Register;