import React, { useState } from "react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(4).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers
    if (!/^\d*$/.test(value) || value.length > 1) return;

    // Update OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < 3) {
      // Change 5 to 3 since we have 4 inputs
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move back to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`OTP Entered: ${otp.join("")}`);
    // Here you can add your submit logic
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Verify OTP</h2>
        <div className="flex justify-between mb-4 space-x-2">
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
