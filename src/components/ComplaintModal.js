import React from 'react';

const ComplaintModal = ({ complaint, userProfile, handleSubmit, handleConplaint, register, setComplaint }) => {

  return (
    <>
      <input type="checkbox" id="complaint-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h4 className="">Report to admin!</h4>
          <h5 className="py-4">{complaint?.name}</h5>
          <form onSubmit={handleSubmit(handleConplaint)}>

            <input defaultValue={complaint?._id} {...register("productID", { required: true })} readOnly hidden />
            <input defaultValue={userProfile?._id} {...register("userID", { required: true })} readOnly hidden />

            <div className="form-control">
              <label className="label"><span className="label-text">Reason for complaint</span></label>
              <textarea
                {...register("reason", { required: true })}
                className="textarea textarea-bordered h-24"
                disabled={complaint?.currentUser?.loggedIn ? false : true}
              ></textarea>
            </div>

            <button
              type="submit"
              className='btn btn-primary btn-sm w-full mt-5'
              disabled={complaint?.currentUser?.loggedIn ? false : true}
            >Report to Admin</button>

            {
              !complaint?.currentUser?.loggedIn &&
              <label className="label"><span className="label-text text-warning">Please loggedIn for complain..</span></label>
            }

          </form>
          <div className="modal-action">
            <label
              htmlFor="complaint-modal"
              className='btn btn-primary btn-sm text-xs'
              onClick={() => setComplaint(null)}
            >Cancel</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComplaintModal;