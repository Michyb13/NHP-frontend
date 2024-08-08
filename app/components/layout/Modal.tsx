import React from "react";

type ModalProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => Promise<void> | Promise<any> | void;
};

const Modal = ({ message, isOpen, onClose, onClick }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <p className="text-lg mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onClick}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
