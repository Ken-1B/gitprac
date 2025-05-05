import React, { useState } from "react";

const Dashboard = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  // Handle change in the input fields
  const handleChange = (e) => {
    setUpdatedUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!updatedUser.name || !updatedUser.email) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await fetch("http://localhost/auth-api/update-profile.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,  // Assuming user ID is available
          name: updatedUser.name,
          email: updatedUser.email,
        }),
      });

      const result = await response.json();
      console.log('API Response:', result);  // Log the API response for debugging

      if (result.status) {
        alert("Profile updated successfully!");
        setUpdatedUser({ name: updatedUser.name, email: updatedUser.email });  // Update local state if needed
      } else {
        alert(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating profile");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-pink-100 to-pink-300">
      {/* Sidebar */}
      <aside className="w-64 bg-pink-600 text-white shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center">Dashboard</h2>
        <nav className="mt-8">
          <a href="#" className="block px-6 py-3 text-lg hover:bg-pink-700 rounded-lg transition duration-200">
            Home
          </a>
          <a
            href="#"
            className="block px-6 py-3 text-lg hover:bg-pink-700 rounded-lg transition duration-200"
            onClick={() => setIsEditing(true)}
          >
            Profile
          </a>
          <a href="#" className="block px-6 py-3 text-lg hover:bg-pink-700 rounded-lg transition duration-200">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-lg px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800">Welcome, {user?.name || "User"}!</h1>
          <button
            onClick={onLogout}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition duration-300"
          >
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Dashboard Overview
            </h2>
            <p className="text-gray-600">
              You have successfully logged in or registered. Use the navigation menu to explore different sections of your dashboard.
            </p>

            {/* Profile Update Section */}
            {isEditing ? (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Profile</h3>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={updatedUser.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={updatedUser.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
                      required
                    />
                  </div>

                  {/* Update Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 rounded-lg font-semibold text-lg hover:from-pink-700 hover:to-pink-600 transition duration-300 shadow-lg"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            ) : (
              <p className="text-gray-600 mt-6">
                Click on "Profile" in the sidebar to update your details.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
