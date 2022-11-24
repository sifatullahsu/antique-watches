import React from 'react';
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import Heading from '../components/Heading';

const AddProduct = () => {

  const location = useLocation();
  const date = format(new Date(), 'Pp');
  const isAddNew = location.pathname === '/dashboard/add-a-product' ? true : false;

  const { register, handleSubmit } = useForm();




  const handleAddProduct = (formData) => {

  }

  return (
    <>
      <Heading
        title='Add New Product'
      ></Heading>
      <form onSubmit={handleSubmit(handleAddProduct)}>

        <div className="form-control">
          <label className="label"><span className="label-text">Name</span></label>
          <input type='text' {...register("name", { required: true })} />
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <div className="form-control">
            <label className="label"><span className="label-text">Price</span></label>
            <input type='text' {...register("price", { required: true })} />
          </div>

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
            <label className="label"><span className="label-text">Purchased Year</span></label>
            <input type='number' minLength='4' maxLength='4' {...register("purchasedYear", { required: true })} />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>

          <div className="form-control">
            <label className="label"><span className="label-text">Mobile Number</span></label>
            <input type='text' {...register("number", { required: true })} />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Location</span></label>
            <input type='text' {...register("location", { required: true })} />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Item Status</span></label>
            <select defaultValue='unsold' {...register("itemStatus", { required: true })}>
              <option value=''>select status..</option>
              <option value='unsold'>Unsold</option>
              <option value='sold'>Sold</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Advertise</span></label>
            <select defaultValue={false} {...register("advertise", { required: true })}>
              <option value=''>select advertise..</option>
              <option value={true}>Enable</option>
              <option value={false}>Disable</option>
            </select>
          </div>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Description</span></label>
          <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24"></textarea>
        </div>

        <button type="submit" className='btn btn-primary w-full mt-5'>Add Product</button>

      </form>
    </>
  );
};

export default AddProduct;