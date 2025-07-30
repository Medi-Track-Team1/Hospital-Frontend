import React, { useState } from 'react';
import { API_BASE_URL } from "./api";

const Login = ({ onClose, onSignupClick }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(''); // Clear any previous messages
    
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save the token and user details to localStorage
      localStorage.setItem('authToken', data.token);
     
      // Show success message instead of alert
      setSuccessMessage('Login successful!');
      
      // Close the modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 5000);
      
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 text-2xl font-bold hover:text-blue-600 transition-colors"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '0',
          margin: '0',
        }}
      >
        ×
      </button>

      <h2 className="text-2xl font-bold text-center text-black mb-2">Welcome Back!</h2>
      <p className="text-black text-center mb-6">Login with your details to continue</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Add success message display */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-black mb-1">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-black mb-1">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-black">
        Don't have an account?{' '}
        <button
          onClick={onSignupClick}
          className="text-sm text-blue-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          SignUp
        </button>
      </p>
    </div>
  );
};

export default Login;