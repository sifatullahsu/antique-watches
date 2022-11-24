import React from 'react';

const ModalCom = ({ title, text, itemDelete, setItemDelete, handleDelete }) => {

  const handleAction = (isDelete) => {
    if (isDelete) {
      handleDelete(itemDelete._id);
    }

    setItemDelete(null);
  }

  return (
    <div>
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h4 className="font-bold text-lg">{title}</h4>
          <p className="py-4">{text}</p>
          <div className="modal-action">

            <label
              htmlFor="delete-modal"
              className="btn btn-primary btn-sm"
              onClick={() => handleAction(true)}
            >Ok</label>

            <label
              htmlFor="delete-modal"
              className="btn btn-primary btn-sm"
              onClick={() => handleAction(false)}
            >Cancel</label>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCom;