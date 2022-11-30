import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import DashLoading from '../components/DashLoading';
import Heading from '../components/Heading';
import { AuthContext } from '../contexts/AuthContextComp';

const AddCategory = () => {

  const { user, userLoading, setUserLoading } = useContext(AuthContext);

  const { register, handleSubmit, reset } = useForm();
  const imageHostKey = process.env.REACT_APP_IMGBB_API;

  const handleAddCategory = (formData) => {
    const { catName, catImage } = formData;

    setUserLoading(true);

    if (catImage[0].type !== 'image/png') {
      return toast.error('Only image/png type is allowed');
    }

    const imageData = new FormData();
    imageData.append('image', catImage[0]);

    fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
      method: 'POST',
      body: imageData
    })
      .then(res => res.json())
      .then(data => {
        const imgURL = data.data.url;

        const finalData = {
          catName, catImage: imgURL
        }

        fetch('https://antique-watches.vercel.app/categories', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('antique-token')}`,
            email: user.email
          },
          body: JSON.stringify(finalData)
        })
          .then(res => res.json())
          .then(data => {
            toast.success('Category added successful..');
            reset();
            setUserLoading(false);
          })
          .catch(err => {
            toast.success('Somthing is wrong..');
            setUserLoading(false);
          })
      })
      .catch(err => {
        toast.success('Somthing is wrong..');
        setUserLoading(false);
      })
  }

  if (userLoading) {
    return (
      <DashLoading></DashLoading>
    );
  }

  return (
    <div>
      <Heading
        title='Add Category'
      ></Heading>
      <form onSubmit={handleSubmit(handleAddCategory)}>

        <div className="form-control">
          <label className="label"><span className="label-text">Category Name</span></label>
          <input type='text' {...register("catName", { required: true })} />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category Image</span>
          </label>
          <input type="file"{...register("catImage", { required: true })} />
        </div>

        <button type="submit" className='btn btn-primary w-full mt-5'>Add Category</button>

      </form>
    </div>
  );
};

export default AddCategory;