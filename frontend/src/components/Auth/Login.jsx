import React from "react";
import { Link } from "react-router-dom";
import { InputField } from "../InputArea/InputField";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert("Logging in...");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="hidden md:flex md:w-1/2">
          <img
            src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlM18zZF9yZW5kZXJfY2hhcmFjdGVyX29mX2FfYmxhY2tfc3R1ZGVudF9jYXJ0b29uX180ZDY5MmRiZi0xOGEwLTQ1MjUtODMyZC05MmFhOWMwYzhjNmMucG5n.png"
            alt="Student"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8 w-full md:w-1/2 text-gray-800 dark:text-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Student Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <InputField
                label="Email"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <InputField
                label="Password"
                type="password"
                name="password"
                required
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Login
            </button>
            <div className="mt-4 text-center">
              <Link
                to="#"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>
            <div className="mt-4 text-center">
              <p>
                I already have an account.{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
