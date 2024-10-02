import React from "react";

const Textarea = ({
  id,
  label,
  name,
  placeholder,
  value,
  onChange,
  required,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-md font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <textarea
        id={id}
        className="mt-1 outline-none block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        name={name}
        rows="4"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Textarea;
