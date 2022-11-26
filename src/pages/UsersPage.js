import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import DashLoading from '../components/DashLoading';
import Heading from '../components/Heading';
import ModalCom from '../components/ModalCom';

const UsersPage = () => {

  const location = useLocation();
  const path = location.pathname;

  let role = '';
  if (path === '/dashboard/all-sellers') role = 'seller';
  else if (path === '/dashboard/all-buyers') role = 'buyer';

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users', role, location],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users/role/${role}`);
      const data = await res.json();

      return data;
    }
  });


  const [itemDelete, setItemDelete] = useState(null);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users?delete=${id}`, {
      method: 'DELETE',
      headers: {}
    })
      .then(res => res.json())
      .then(data => {
        toast.success('User delete successful...');
        refetch();
      })
  }

  const handleVarified = (id, isVerified) => {
    const data = isVerified === 'true' ? 'false' : 'true';
    const update = { verified: data }

    fetch(`http://localhost:5000/users?update=${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(data => {
        toast.success(`User ${isVerified === 'true' ? 'unverified' : 'verified'} successful...`);
        refetch();
      })
  }


  if (isLoading) {
    return (
      <DashLoading></DashLoading>
    );
  }

  return (
    <div>
      <Heading
        title={users[0]?.role === 'seller' ? 'All Sellers' : 'All Buyers'}
      ></Heading>
      <div className="overflow-x-auto">
        <table className="table border w-full">
          <thead>
            <tr>
              <th className='rounded-none'>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className='text-right'>Verified</th>
              <th className='rounded-none text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users?.map((user, index) => {
                return (
                  <tr key={user._id}>
                    <th>{index + 1}</th>
                    <td><img className='w-14 border' src={user.image} alt="" /></td>
                    <td className='font-semibold'>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td className='text-right'>
                      <input
                        type="checkbox"
                        className="toggle toggle-sm border-gray-200"
                        defaultChecked={user.verified === 'true' ? 'checked' : undefined}
                        onChange={() => handleVarified(user._id, user.verified)}
                      />
                    </td>
                    <td className='text-right'>
                      {/* <button className='btn btn-ghost btn-sm px-2'><FaEdit></FaEdit></button> */}
                      <label
                        htmlFor="delete-modal"
                        className='btn btn-ghost btn-sm px-2'
                        onClick={() => setItemDelete(user)}
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
          title="Would you like to delete the user?"
          text="You won't be able to undo it again..."
          itemDelete={itemDelete}
          setItemDelete={setItemDelete}
          handleDelete={handleDelete}
        ></ModalCom>
      }

    </div>
  );
};

export default UsersPage;