import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextComp';
import GoogleSignIn from './GoogleSignIn';

const Register = () => {
  const { userRegister } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const imageHostKey = process.env.REACT_APP_IMGBB_API;

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';


  const handleRegister = (formData) => {
    const { name, email, password, image, isSeller } = formData;

    if (image[0].type !== 'image/png') {
      return toast.error('Only image/png type is allowed');
    }

    const imageData = new FormData();
    imageData.append('image', image[0]);


    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: 'POST',
      body: imageData
    })
      .then(res => res.json())
      .then(data => {
        const imageURL = data.data.url;

        userRegister(email, password)
          .then(result => {
            if (result.user.uid) {
              const uid = result.user.uid;
              const role = isSeller ? 'seller' : 'buyer';
              const data = { name, email, image: imageURL, role, verified: 'false', uid }

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
                    // console.log(data);
                    toast.success('User successfully created..')
                    reset();
                    navigate(from)
                  }
                })
            }
          })
          .catch(err => {
            console.log(err);
            toast.error('Somthing is wrong..')
          })
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
          <label className="label">
            <span className="label-text">Profile Picture</span>
          </label>
          <input type="file"{...register("image", { required: true })} />
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