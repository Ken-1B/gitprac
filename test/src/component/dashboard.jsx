import React, { useState } from "react";

const Dashboard = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
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

    // Validate input fields
    if (!updatedUser.firstName.trim() || !updatedUser.lastName.trim()) {
      alert("Please fill in all required fields!");
      return;
    }

    // Ensure user.id is available
    if (!user || !user.id) {
      alert("User ID is missing! Please check if the user is logged in and try again.");
      return;
    }

    try {
      const response = await fetch("http://localhost/auth-api/update-profile.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id, // User ID from props
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
        }),
      });

      const result = await response.json();
      if (result.status) {
        alert("Profile updated successfully!");
        setUpdatedUser({
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: user.email, // Email remains unchanged
        });
      } else {
        alert(result.message || "Failed to update profile");
      }
    } catch (error) {
      alert("Error updating profile: " + error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gradient-to-b from-green-600 to-green-500 text-white shadow-md">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">My Dashboard</h2>
        </div>
        <nav className="mt-6">
          <a href="#" className="block px-6 py-2 hover:bg-green-700 rounded transition">
            Home
          </a>
          <a
            href="#"
            className="block px-6 py-2 hover:bg-green-700 rounded transition"
            onClick={() => setIsEditing(true)}
          >
            Profile
          </a>
          <a href="#" className="block px-6 py-2 hover:bg-green-700 rounded transition">
            Settings
          </a>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white shadow px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800">Welcome, {user?.firstName || "User"}!</h1>
          <button
            onClick={onLogout}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard Overview</h2>

            {isEditing ? (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Update Profile</h3>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={updatedUser.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={updatedUser.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                      required
                    />
                  </div>

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
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-md font-semibold text-lg hover:from-green-700 hover:to-green-600 transition duration-300 shadow-lg"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            ) : (
              <p className="text-gray-600 mt-6">Click on "Profile" in the sidebar to update your details.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
