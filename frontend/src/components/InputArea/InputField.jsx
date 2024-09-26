import React from "react";

export const InputField = ({
  label,
  type = "text",
  placeholder,
  id,
  name,
  value,
  onChange,
  accept,
  disabled = false,
  error = null,
  key,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-md  font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        accept={accept}
        disabled={disabled}
        key={key}
        error={error}
        className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring focus:ring-blue-500 sm:p-2 md:p-3"
        aria-label={label}
      />
      <span className="text-red-500 ">{error ? error : ""}</span>
    </div>
  );
};
