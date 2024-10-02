import React from "react";

const Select = ({
  id,
  error,
  name,
  label,
  options,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-md font-medium text-gray-700" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        name={name}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
