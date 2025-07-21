import React from 'react';

const Signup = ({ onClose, onLoginClick }) => {
  return (
    <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 text-2xl font-bold"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0',
          margin: '0',
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#4b5563'; // darker gray
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#6b7280'; // default gray
        }}
      >
        ×
      </button>

      <h2 className="text-2xl font-bold text-center text-black mb-2">Create Account</h2>
      <p className="text-black text-center mb-6">Sign up with your details to get started</p>

      <form className="space-y-4">
        {/* Name and Age */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none"
          />
          <input
            type="number"
            placeholder="Age"
            min={1}
            className="border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none"
          />
        </div>

        {/* Blood Group & Gender */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Blood Group"
            className="border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none"
          />
          <select
            className="border border-gray-300 px-4 py-2 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none"
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Marital Status & City */}
        <div className="grid grid-cols-2 gap-4">
          <select
            className="border border-gray-300 px-4 py-2 rounded-md text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none"
          >
            <option value="">Marital Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none"
          />
        </div>

        {/* State & Zip Code */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none"
          />
          <input
            type="text"
            placeholder="Zip Code"
            className="border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none"
          />
        </div>

        {/* Email & Password */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 px-4 py-2 rounded-md text-black focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
        >
          Sign Up
        </button>
      </form>

      {/* Updated Login link */}
     <p className="mt-6 text-center text-sm text-black">
  Already have an account?{' '}
  <button
    onClick={onLoginClick}
    className="underline text-blue-600 hover:text-blue-800 font-normal text-sm"
    style={{
      background: 'none',
      border: 'none',
      padding: 0,
      margin: 0,
      cursor: 'pointer',
    }}
  >
    Login
  </button>
</p>


    </div>
  );
};

export default Signup;
