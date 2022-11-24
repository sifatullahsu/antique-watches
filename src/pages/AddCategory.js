import React from 'react';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import Heading from '../components/Heading';

const AddCategory = () => {
  const { register, handleSubmit, reset } = useForm();
  const imageHostKey = process.env.REACT_APP_IMGBB_API;

  const handleAddCategory = (formData) => {
    const { catName, catImage } = formData;

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

        fetch('http://localhost:5000/categories', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(finalData)
        })
          .then(res => res.json())
          .then(data => {
            toast.success('Category added successful..');
            reset();
          })
      })
      .catch(err => console.log(err))
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