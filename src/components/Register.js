import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthContextComp';
import GoogleSignIn from './GoogleSignIn';

const Register = () => {
  const { userRegister } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const handleRegister = (formData) => {
    const { name, email, password, image, isSeller } = formData;

    userRegister(email, password)
      .then(result => {
        if (result.user.uid) {
          const uid = result.user.uid;
          const role = isSeller ? 'seller' : 'buyer';
          const data = { name, email, image, role, uid }

          fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(data => {
              if (data.acknowledged) {
                console.log(data);
                toast.success('User successfully created..')
                reset();
              }
            })
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Somthing is wrong..')
      })



  }


  return (
    <div>
      <form onSubmit={handleSubmit(handleRegister)}>

        <div className="form-control">
          <label className="label"><span className="label-text">Full Name</span></label>
          <input type='text' {...register("name", { required: true })} />
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
          <input type='url' {...register("image", { required: true })} />
        </div>

        <div className="mt-5">
          <div className="label justify-start items-center">
            <input type="checkbox" {...register("isSeller")} className="toggle" />
            <span className="label-text ml-3 mt-1">Create seller account?</span>
          </div>
        </div>

        <button type="submit" className='btn btn-primary w-full mt-5'>Register Now</button>

      </form>
      <div className="flex flex-col"><div className="divider my-6">OR</div></div>
      <GoogleSignIn></GoogleSignIn>
    </div>
  );
};

export default Register;