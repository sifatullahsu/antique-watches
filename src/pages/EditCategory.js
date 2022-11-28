import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';

const EditCategory = () => {

  const navigate = useNavigate();
  const imageHostKey = process.env.REACT_APP_IMGBB_API;

  const location = useLocation();
  const id = location.pathname.split('/dashboard/categories/')[1];

  const { data: categories = [] } = useQuery({
    queryKey: ['categories', location],
    queryFn: async () => {
      const res = await fetch(`https://antique-watches.vercel.app/categories/id/${id}`);
      const data = await res.json();

      return data;
    }
  });


  const updateCategoryData = (data, form) => {
    fetch(`https://antique-watches.vercel.app/categories?update=${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Category update successful..');
        form.reset();
        navigate('/dashboard/categories');
      })
  }

  const handleEditCategory = (event) => {
    event.preventDefault();

    const form = event.target;
    const catName = form.catName.value;
    const catImage = form.catImage.files[0];

    if (catImage) {
      const imageData = new FormData();
      imageData.append('image', catImage);

      fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
        method: 'POST',
        body: imageData
      })
        .then(res => res.json())
        .then(data => {
          const imgURL = data.data.url;

          const finalData = { catName, catImage: imgURL }
          updateCategoryData(finalData, form);
        })
        .catch(err => console.log(err))
    }
    else {
      updateCategoryData({ catName }, form);
    }
  }

  return (
    <div>
      <Heading
        title='Edit Category'
      ></Heading>
      <form onSubmit={handleEditCategory}>

        <div className="form-control">
          <label className="label"><span className="label-text">Category Name</span></label>
          <input type='text' defaultValue={categories.catName} name='catName' required />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category Image</span>
          </label>
          <input type="file" name='catImage' />
          <span className="label-text text-gray-400">Note: If you don't want to change the category image. leave this field as it is. (EMPTY)</span>
        </div>

        <button type="submit" className='btn btn-primary w-full mt-5'>Add Category</button>

      </form>
    </div>
  );
};

export default EditCategory;