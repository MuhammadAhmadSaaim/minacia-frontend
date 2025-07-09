import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const Toast = ({ message, visible, setVisible }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, setVisible]);

  return (
    <div
      className={`fixed top-6 right-6 min-w-[250px] max-w-sm px-4 py-3 bg-green-500 text-white rounded-md shadow-lg flex justify-between items-start gap-3 transition-all duration-500 z-50 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex-1 text-sm font-medium">
        {message}
      </div>
      <button
        className="text-white hover:text-gray-200 ml-2"
        onClick={() => setVisible(false)}
      >
        <IoClose size={20} />
      </button>
    </div>
  );
};

export default Toast;
