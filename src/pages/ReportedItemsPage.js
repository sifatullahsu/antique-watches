import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import { RiEyeFill } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import DashLoading from '../components/DashLoading';
import Heading from '../components/Heading';
import ModalCom from '../components/ModalCom';
import { AuthContext } from '../contexts/AuthContextComp';

const ReportedItemsPage = () => {

  const { user, userLoading } = useContext(AuthContext);

  const location = useLocation();

  const { data: complaints = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['complaints', location, user],
    queryFn: async () => {

      if (user?.uid) {
        const res = await fetch(`https://antique-watches.vercel.app/complaints`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('antique-token')}`,
            email: user.email
          }
        });
        const data = await res.json();

        return data;
      }

      return [];

    }
  });


  const [itemDelete, setItemDelete] = useState(null);
  const [complaintReport, setComplaintReport] = useState(null);

  const handleDelete = (id) => {
    fetch(`https://antique-watches.vercel.app/complaints?delete=${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('antique-token')}`,
        email: user.email
      }
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Complaint delete successful...');
        refetch();
      })
  }

  if (isLoading || userLoading) {
    return (
      <DashLoading></DashLoading>
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
                    <td>{complaint.productInfo?.name}</td>
                    <td>{complaint?.userInfo?.email}</td>
                    <td className='text-right'>
                      <label
                        htmlFor="view-complaint-modal"
                        className='btn btn-ghost btn-sm px-2'
                        onClick={() => setComplaintReport(complaint)}
                      >
                        <RiEyeFill></RiEyeFill>
                      </label>
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

      {
        complaintReport?._id &&
        <>
          <input type="checkbox" id="view-complaint-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h5>Complaint details..</h5>

              <div className='mt-2'>
                <div className='font-semibold inline'>{complaintReport?.productInfo?.name}</div>
                <div className='text-xs inline'> - ${complaintReport?.productInfo?.price}</div>
              </div>
              <p className='pt-5'><span className='text-xs font-semibold uppercase'>Reason: </span>{complaintReport.reason}</p>


              <div className='flex flex-nowrap justify-between items-end mt-6'>
                <div className='flex flex-nowrap'>
                  <div className='basis-auto'>
                    <img src={complaintReport.userInfo?.image} className='w-12 h-12' alt="" />
                  </div>
                  <div className='basis-auto pl-3'>
                    <div>
                      <h5 className='uppercase text-sm font-semibold text-primary-200 inline'>{complaintReport.userInfo?.name}</h5>
                      {
                        complaintReport.userInfo?.verified === 'true' &&
                        <FaCheckCircle className='text-blue-500 inline ml-2 -mt-1'></FaCheckCircle>
                      }
                    </div>
                    <span className='uppercase text-xs text-gray-400'>{complaintReport.userInfo?.role}</span>
                  </div>
                </div>
                <label
                  htmlFor="view-complaint-modal"
                  className="btn btn-primary btn-sm"
                  onClick={() => setComplaintReport(null)}
                >Cancel</label>
              </div>
            </div>
          </div>
        </>
      }

    </div>
  );
};

export default ReportedItemsPage;