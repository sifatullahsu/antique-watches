import React from 'react';
import toast from 'react-hot-toast';
import Heading from '../components/Heading';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const EditProduct = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/dashboard/my-products/')[1] || location.pathname.split('/dashboard/products/')[1];


  const imageHostKey = process.env.REACT_APP_IMGBB_API;

  const { data: query = {}, isLoading } = useQuery({
    queryKey: ['query', location],
    queryFn: async () => {
      const res = await fetch(`https://antique-watches.vercel.app/products/id/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('antique-token')}`
        }
      });
      const data = await res.json();

      return data;
    }
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(`https://antique-watches.vercel.app/categories`);
      const data = await res.json();

      return data;
    }
  });



  const updateProductsDataFromBD = (formData, form) => {
    fetch(`https://antique-watches.vercel.app/products?update=${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('antique-token')}`
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.acknowledged) {
          toast.success('Producut update successful..');
          form.reset();
          navigate('/dashboard/my-products');
        }
        else {
          toast.error('You are not authorized user..');
          form.reset();
          navigate('/login');
        }

      })
  }


  const handleEditProduct = (event) => {
    event.preventDefault();

    const form = event.target;

    const name = form.name.value;
    const price = form.price.value;
    const buyingPrice = form.buyingPrice.value;
    const purchasedYear = form.purchasedYear.value;
    const condition = form.condition.value;
    const category = form.category.value;
    const number = form.number.value;
    const location = form.location.value;
    const description = form.description.value;
    const image = form.image.files[0];

    const formData = {
      name, price, buyingPrice, purchasedYear, condition, category, number, location, description
    }

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

          const finalData = { ...formData, imgURL }
          updateProductsDataFromBD(finalData, form);
        })
        .catch(err => console.log(err))
    }
    else {
      updateProductsDataFromBD(formData, form);
    }
  }

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <>
      <Heading
        title='Edit Product'
      ></Heading>
      <form onSubmit={handleEditProduct}>

        <div className="form-control">
          <label className="label"><span className="label-text">Name</span></label>
          <input type='text' name='name' defaultValue={query.name} required />
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <div className="form-control">
            <label className="label"><span className="label-text">Selling Price</span></label>
            <input type='text' name='price' defaultValue={query.price} required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Buying Price</span></label>
            <input type='text' name='buyingPrice' defaultValue={query.buyingPrice} required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Purchased Year</span></label>
            <input type='number' minLength='4' maxLength='4' name='purchasedYear' defaultValue={query.purchasedYear} required />
          </div>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {
            query?.condition &&

            <div className="form-control">
              <label className="label"><span className="label-text">Condition</span></label>
              <select name='condition' defaultValue={query.condition} required>
                <option value=''>select condition..</option>
                <option value='excellent'>Excellent</option>
                <option value='good'>Good</option>
                <option value='fair'>Fair</option>
              </select>
            </div>
          }

          {
            query?.category &&

            <div className="form-control">
              <label className="label"><span className="label-text">Category</span></label>
              <select name='category' defaultValue={query.category} >
                <option value=''>select category..</option>
                {
                  categories.map(category => <option value={category._id} key={category._id}>{category.catName}</option>)
                }
              </select>
            </div>
          }



          <div className="form-control">
            <label className="label"><span className="label-text">Mobile Number</span></label>
            <input type='text' name='number' defaultValue={query.number} required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Location</span></label>
            <input type='text' name='location' defaultValue={query.location} required />
          </div>

        </div>

        <div className="form-control">
          <label className="label"><span className="label-text">Description</span></label>
          <textarea name='description' className="textarea textarea-bordered h-24"
            defaultValue={query.description} required></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Image</span>
          </label>
          <input type="file" name='image' />
          <span className="label-text text-gray-400">Note: If you don't want to change the product image. leave this field as it is. (EMPTY)</span>
        </div>

        <button type="submit" className='btn btn-primary w-full mt-5'>Update Product</button>

      </form>
    </>
  );
};

export default EditProduct;