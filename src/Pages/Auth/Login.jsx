import React, { useState } from 'react';

// Password encryption function using Web Crypto API
const encryptPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "healthcare_salt_2024"); // Add salt
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const Login = ({ onClose, onSignupClick }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // Encrypt password before sending
      const encryptedPassword = await encryptPassword(formData.password);

      // Prepare login data
      const loginData = {
        patientEmail: formData.email,
        password: encryptedPassword, // Send encrypted password
      };

      // Make API call to your backend
      const response = await fetch('http://localhost:8080/api/patient/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Login successful!');
        
        // Store authentication token if provided
        if (result.token) {
          localStorage.setItem('authToken', result.token);
        }
        
        // Store user data if needed
        if (result.user) {
          localStorage.setItem('userData', JSON.stringify(result.user));
        }

        // Clear form and close modal
        setFormData({ email: "", password: "" });
        onClose();
        
        // Redirect or update app state as needed
        // window.location.href = '/dashboard'; // or use your routing logic
      } else {
        alert('Login failed: ' + (result.message || 'Invalid email or password'));
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed: Network error or server is not responding');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
          e.target.style.color = '#2563eb'; // blue-600
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#6b7280'; // gray-500
        }}
      >
        ×
      </button>

      <h2 className="text-2xl font-bold text-center text-black mb-2">Welcome Back!</h2>
      <p className="text-black text-center mb-6">Login with your details to continue</p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-black mb-1">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-blue-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full px-4 py-2 border border-blue-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Blue Login Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-black">
        Don't have an account?{' '}
        <button
          onClick={onSignupClick}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          SignUp
        </button>
      </p>
    </div>
  );
};

export default Login;