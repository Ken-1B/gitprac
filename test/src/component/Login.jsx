import React, { useState } from "react";

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/auth-api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setMessage(data.message);

      if (data.status) {
        setFormData({ email: "", password: "" });
        if (onLoginSuccess) {
          onLoginSuccess(data); // Handle login success
        }
      }
    } catch (err) {
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-100 via-white to-green-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              required
            />
          </div>

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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-green-700 transition duration-300"
          >
            Login
          </button>

          {message && (
            <p className="text-center text-sm text-red-600 mt-2">{message}</p>
          )}

          <p className="text-sm text-center text-green-700 mt-4">
            Don't have an account?{" "}
            <button type="button" className="font-semibold hover:underline" onClick={onSwitchToRegister}>
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
