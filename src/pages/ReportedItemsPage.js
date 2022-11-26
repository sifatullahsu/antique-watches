import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Heading from '../components/Heading';
import ModalCom from '../components/ModalCom';

const ReportedItemsPage = () => {

  const location = useLocation();

  const { data: complaints = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['complaints', location],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/complaints`);
      const data = await res.json();

      return data;
    }
  });

  const [itemDelete, setItemDelete] = useState(null);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/complaints?delete=${id}`, {
      method: 'DELETE',
      headers: {}
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Complaint delete successful...');
        refetch();
      })
  }

  if (isLoading) {
    return (
      <div className='p-10 bg-primary' >loading</div>
    );
  }

  if (isError) {
    return (
      <div>Check your inyernet connection..</div>
    );
  }

  return (
    <div>
      <Heading
        title='All Reports'
      ></Heading>

      <div className="overflow-x-auto">
        <table className="table border w-full">
          <thead>
            <tr>
              <th className='rounded-none'>No.</th>
              <th>Product Name</th>
              <th>User Email</th>
              <th className='rounded-none text-right'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              complaints?.map((complaint, index) => {
                return (
                  <tr key={complaint._id}>
                    <th>{index + 1}</th>
                    <td>{complaint.productInfo.name}</td>
                    <td>{complaint.userInfo.email}</td>
                    <td className='text-right'>
                      <button className='btn btn-ghost btn-sm px-2'><FaEdit></FaEdit></button>
                      <label
                        htmlFor="delete-modal"
                        className='btn btn-ghost btn-sm px-2'
                        onClick={() => setItemDelete(complaint)}
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
          title="Would you like to delete the complaint?"
          text="You won't be able to undo it again..."
          itemDelete={itemDelete}
          setItemDelete={setItemDelete}
          handleDelete={handleDelete}
        ></ModalCom>
      }

    </div>
  );
};

export default ReportedItemsPage;