import React, { useState } from "react";

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your login API logic goes here. For now, we simulate a successful login.
    try {
      const res = await fetch("http://localhost/auth-api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();
      if (data.status) {
        // Assuming the user data returned from the API is in the format:
        // { status: true, name: "John Doe", email: "john.doe@example.com" }
        setMessage("Login successful");
        // Pass the user data to the parent component
        onLoginSuccess({ name: data.name, email: data.email });
      } else {
        setMessage("Invalid credentials");
      }
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-100 via-white to-pink-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-pink-700 transition duration-300"
          >
            Login
          </button>

          {/* Links */}
          {message && <p className="text-center text-sm text-red-600 mt-2">{message}</p>}

          <div className="flex justify-between text-sm text-pink-600 mt-4">
            <a href="#" className="hover:underline">Forgot Password?</a>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="hover:underline"
            >
              Don't have an account? Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
