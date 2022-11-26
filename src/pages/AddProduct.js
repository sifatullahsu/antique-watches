import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import toast from 'react-hot-toast';
import Heading from '../components/Heading';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../contexts/AuthContextComp';
import { useLocation, useNavigate } from 'react-router-dom';
import DashLoading from '../components/DashLoading';

const AddProduct = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const date = format(new Date(), 'Pp');

  const imageHostKey = process.env.REACT_APP_IMGBB_API;

  const { userProfile } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories', location],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/categories`);
      const data = await res.json();

      return data;
    }
  });

  const handleAddProduct = (formData) => {
    const {
      name, price, buyingPrice, condition, purchasedYear, number, location, description, image, category
    } = formData;

    console.log(image);

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
        const imgURL = data.data.url;

        const finalData = {
          name, price, buyingPrice, condition, purchasedYear, number, location, itemStatus: 'unsold', advertise: 'false',
          description, imgURL, category, author: userProfile._id, publishedDate: date
        }

        fetch('http://localhost:5000/products', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(finalData)
        })
          .then(res => res.json())
          .then(data => {
            toast.success('Producut added successful..');
            reset();
            navigate('/dashboard/my-products')
          })
      })
      .catch(err => console.log(err))
  }



  if (isLoading) {
    return (
      <DashLoading></DashLoading>
    );
  }

  return (
    <>
      <Heading
        title='Add Product'
      ></Heading>
      <form onSubmit={handleSubmit(handleAddProduct)}>

        <div className="form-control">
          <label className="label"><span className="label-text">Name</span></label>
          <input type='text' {...register("name", { required: true })} />
        </div>

        <div className='grid grid-cols-3 gap-4'>

          <div className="form-control">
            <label className="label"><span className="label-text">Selling Price</span></label>
            <input type='text' {...register("price", { required: true })} />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Buying Price</span></label>
            <input type='text' {...register("buyingPrice", { required: true })} />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Purchased Year</span></label>
            <input type='number' minLength='4' maxLength='4' {...register("purchasedYear", { required: true })} />
          </div>

        </div>

        <div className='grid grid-cols-2 gap-4'>

          <div className="form-control">
            <label className="label"><span className="label-text">Condition</span></label>
            <select {...register("condition", { required: true })}>
              <option value=''>select condition..</option>
              <option value='excellent'>Excellent</option>
              <option value='good'>Good</option>
              <option value='fair'>Fair</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Category</span></label>
            <select {...register("category", { required: true })} >
              <option value=''>select category..</option>
              {
                categories.map(category => <option value={category._id} key={category._id}>{category.catName}</option>)
              }
            </select>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Mobile Number</span></label>
            <input type='text' {...register("number", { required: true })} />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Location</span></label>
            <input type='text' {...register("location", { required: true })} />
          </div>

        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Description</span></label>
          <textarea  {...register("description", { required: true })} className="textarea textarea-bordered h-24" ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Image</span>
          </label>
          <input type="file"{...register("image", { required: true })} />
        </div>

        <button type="submit" className='btn btn-primary w-full mt-5'>Add Product</button>

      </form>
    </>
  );
};

export default AddProduct;