import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DashLoading from '../components/DashLoading';
import Heading from '../components/Heading';
import { AuthContext } from '../contexts/AuthContextComp';

const SettingsPage = () => {
  const { userProfile, setTestLoading } = useContext(AuthContext);
  console.log(userProfile);

  const { register, handleSubmit, reset } = useForm();
  const imageHostKey = process.env.REACT_APP_IMGBB_API;

  const updateProfileData = (data) => {
    fetch(`https://antique-watches.vercel.app/`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('antique-token')}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Profile update successful..');
        reset();
        setTestLoading(false)
      })
      .catch(err => {
        toast.error('Somthing is wrong..');
        setTestLoading(false);
      })
  }


  const handleUpdateProfile = (formData) => {
    const { name, image } = formData;

    setTestLoading(true);

    if (image[0].type !== 'image/png') {
      return toast.error('Only image/png type is allowed');
    }

    if (image) {
      const imageData = new FormData();
      imageData.append('image', image[0]);

      fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
        method: 'POST',
        body: imageData
      })
        .then(res => res.json())
        .then(data => {
          const imgURL = data.data.url;

          const finalData = { name, image: imgURL }
          updateProfileData(finalData);
        })
        .catch(err => console.log(err))
    }
    else {
      updateProfileData({ name });
    }
  }


  if (setTestLoading) {
    return (
      <DashLoading></DashLoading>
    );
  }

  return (
    <div>
      <Heading
        title='Account Settings'
      ></Heading>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>

        <div className="form-control">
          <label className="label"><span className="label-text">Full Name</span></label>
          <input type='text' {...register("name", { required: true })} />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Image</span>
          </label>
          <input type="file"{...register("image")} />
          <span className="label-text text-gray-400">Note: If you don't want to change the profile image. leave this field as it is. (EMPTY)</span>
        </div>

        <button type="submit" className='btn btn-primary w-full mt-5'>Update Profile</button>

      </form>
    </div>
  );
};

export default SettingsPage;