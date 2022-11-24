import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import Heading from '../components/Heading';
import ModalCom from '../components/ModalCom';



const ProductsPage = () => {
  const products = useLoaderData();
  const [itemDelete, setItemDelete] = useState(null);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/products?delete=${id}`, {
      method: 'DELETE',
      headers: {}
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Product delete successful...')
      })
  }





  return (
    <div>
      <Heading
        title='All Products'
      ></Heading>
      <div className="overflow-x-auto">
        <table className="table border w-full">
          <thead>
            <tr>
              <th className='rounded-none'>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Status</th>
              <th className='rounded-none text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              products?.map((product, index) => {
                return (
                  <tr key={product._id}>
                    <th>{index + 1}</th>
                    <td><img className='w-14 border' src={product.imgURL} alt="" /></td>
                    <td className='font-semibold'>{product.name}</td>
                    <td><span
                      className={`text-white px-3 py-1 rounded-full ${product.itemStatus === 'unsold' ? 'bg-red-600' : 'bg-green-600'}`}
                    >{product.itemStatus}</span></td>
                    <td className='text-right'>
                      <button className='btn btn-ghost btn-sm px-2'><FaEdit></FaEdit></button>
                      <label
                        htmlFor="delete-modal"
                        className='btn btn-ghost btn-sm px-2'
                        onClick={() => setItemDelete(product)}
                      >
                        <FaTrashAlt></FaTrashAlt>
                      </label>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
      {
        (itemDelete?._id) &&
        <ModalCom
          title="Would you like to delete the product?"
          text="You won't be able to undo it again..."
          itemDelete={itemDelete}
          setItemDelete={setItemDelete}
          handleDelete={handleDelete}
        ></ModalCom>
      }

    </div>
  );
};

export default ProductsPage;