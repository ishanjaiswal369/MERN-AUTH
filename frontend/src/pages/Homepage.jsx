import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState, useEffect } from "react";

const Homepage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [lastLogin, setLastLogin] = useState(null);

  useEffect(() => {
    // In a real app, you might fetch this from an API
    setLastLogin(new Date().toLocaleString());
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen py-8 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-600">We're glad to see you again!</p>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-xl text-white">
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </span>
              </div>
              <div>
                <h3 className="text-lg text-white font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-300">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 text-sm">
            <div className="grid grid-cols-2 gap-2 text-gray-300">
              <span>Last Login:</span>
              <span className="text-right">{lastLogin}</span>
              <span>Joined:</span>
              <span className="text-right">{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

