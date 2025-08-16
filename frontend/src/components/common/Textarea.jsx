import React from 'react';

const Textarea = ({ label, ...props }) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-2 font-medium">{label}</label>}
      <textarea 
        className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200"
        {...props}
      />
    </div>
  );
};

export default Textarea;