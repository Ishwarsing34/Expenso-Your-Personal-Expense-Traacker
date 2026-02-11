import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm text-gray-700">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill bg-red-500 hover:bg-red-600 text-white"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
