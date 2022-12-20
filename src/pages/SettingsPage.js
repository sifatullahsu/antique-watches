import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import DashLoading from '../components/DashLoading';
import Heading from '../components/Heading';
import { AuthContext } from '../contexts/AuthContextComp';

const SettingsPage = () => {
  const { userProfile, testLoading, setTestLoading, refetchUser, setRefetchUser, userProfileLoading } = useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_IMGBB_API;

  const updateProfileData = (data) => {
    fetch(`http://localhost:5000/users/me?id=${userProfile._id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('antique-token')}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        setRefetchUser(!refetchUser);
        toast.success('Profile update successful..');
        setTestLoading(false)
      })
      .catch(err => {
        toast.error('Somthing is wrong..');
        setTestLoading(false);
      })
  }


  const handleUpdateProfile = (event) => {
    event.preventDefault();

    setTestLoading(true);

    const form = event.target;
    const name = form.name.value;
    const image = form.image.files[0];


    /* if (image[0]?.type !== 'image/png' && image.length > 0) {
      return toast.error('Only image/png type is allowed');
    } */

    if (image) {
      const imageData = new FormData();
      imageData.append('image', image);

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


  if (testLoading || userProfileLoading) {
    return (
      <DashLoading></DashLoading>
    );
  }

  return (
    <div>
      <Heading
        title='Account Settings'
      ></Heading>

      <form onSubmit={handleUpdateProfile}>

        <div className="form-control">
          <label className="label"><span className="label-text">Full Name</span></label>
          <input type='text' defaultValue={userProfile.name} name="name" required />
        </div>

        <div className='flex justify-between items-center'>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Your Image</span>
            </label>
            <input type="file" name='image' />
            <span className="label-text text-gray-400">Note: If you don't want to change the profile image. leave this field as it is. (EMPTY)</span>
          </div>
          <div>
            <img src={userProfile.image} className="w-10 border" alt="" />
          </div>
        </div>

        <button type="submit" className='btn btn-primary w-full mt-5'>Update Profile</button>

      </form>
    </div>
  );
};

export default SettingsPage;