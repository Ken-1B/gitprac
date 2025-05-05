import React, { useState } from "react";
import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./component/dashboard";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);  // Set the user data after login success
    setIsLogin(false);  // Switch to dashboard view
  };

  const handleLogout = () => {
    setUser(null);  // Clear user data
    setIsLogin(true);  // Switch to login screen
  };

  return (
    <div>
      {isLogin ? (
        <Login onSwitchToRegister={() => setIsLogin(false)} onLoginSuccess={handleLoginSuccess} />
      ) : user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
};

export default App;
