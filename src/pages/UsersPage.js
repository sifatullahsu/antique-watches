import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import ModalCom from '../components/ModalCom';
import { AuthContext } from '../contexts/AuthContextComp';

const UsersPage = () => {

  const { user, userLoading } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;


  let role = '';
  if (path === '/dashboard/all-sellers') role = 'seller';
  else if (path === '/dashboard/all-buyers') role = 'buyer';


  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users', role, location, user],
    queryFn: async () => {

      if (user?.uid) {
        const email = user.email;
        const res = await fetch(`http://localhost:5000/users/role/${role}`, {
          method: 'GET',
          headers: {
            authorization: `Bearer ${localStorage.getItem('antique-token')}`,
            email: email
          }
        });

        if (res.status === 401 || res.status === 403) {
          toast.error('Unauthorized Access..');
          navigate('/login');
          return [];
        }

        const data = await res.json();
        return data;
      }

      return []
    }
  });



  const [itemDelete, setItemDelete] = useState(null);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users?delete=${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('antique-token')}`,
        email: user.email
      }
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
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('antique-token')}`,
        email: user.email
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(data => {
        toast.success(`User ${isVerified === 'true' ? 'unverified' : 'verified'} successful...`);
        refetch();
      })
  }


  if (isLoading || userLoading) {
    return (
      <Loading></Loading>
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