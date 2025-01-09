// page.tsx
import React from 'react';

const LoginForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="flex flex-col gap-4 bg-white p-8 w-96 rounded-2xl shadow-md">
        {/* Email Section */}
        <div className="flex flex-col">
          <label className="text-gray-700">Email</label>
        </div>
        <div className="flex items-center border rounded-md px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            className="text-gray-400"
          >
            <g>
              <path d="M30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
            </g>
          </svg>
          <input
            type="text"
            placeholder="Enter your Email"
            className="w-full border-none outline-none ml-3 text-gray-700"
          />
        </div>

        {/* Password Section */}
        <div className="flex flex-col">
          <label className="text-gray-700">Password</label>
        </div>
        <div className="flex items-center border rounded-md px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="-64 0 512 512"
            className="text-gray-400"
          >
            <path d="M336 512H48c-26.453 0-48-21.523-48-48V240c0-26.476 21.546-48 48-48h288c26.453 0 48 21.523 48 48v224c0 26.476-21.546 48-48 48zm0-288H48c-8.812 0-16 7.168-16 16v224c0 8.832 7.188 16 16 16h288c8.812 0 16-7.168 16-16V240c0-8.832-7.188-16-16-16zm0 0" />
            <path d="M304 224c-8.832 0-16-7.168-16-16v-80c0-52.93-43.07-96-96-96s-96 43.07-96 96v80c0 8.832-7.168 16-16 16s-16-7.168-16-16v-80c0-70.594 57.406-128 128-128s128 57.406 128 128v80c0 8.832-7.168 16-16 16zm0 0" />
          </svg>
          <input
            type="password"
            placeholder="Enter your Password"
            className="w-full border-none outline-none ml-3 text-gray-700"
          />
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input type="radio" className="mr-2" />
            <label className="text-gray-700">Remember me</label>
          </div>
          <span className="text-blue-500 cursor-pointer">Forgot password?</span>
        </div>

        {/* Sign-In Button */}
        <button className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Sign In
        </button>

        {/* Sign Up */}
        <p className="text-center text-gray-700">
          Don't have an account?{' '}
          <span className="text-blue-500 cursor-pointer">Sign Up</span>
        </p>
        {/* <p className="text-center text-gray-500">Or With</p> */}

        {/* Social Login Buttons */}
        {/* <div className="flex justify-around">
          <button className="flex items-center bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
            
            Google
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default LoginForm;
