import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();
  const isloading = false;
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };
  return (
    <motion.div
      intitial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl
    overflow-hidden"
    >
      <div className="p-8">
        <h2
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500
        text-transparent bg-clip-text"
        >
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-sm text-green-400 hover-underline"
            >
              Forgot Password
            </Link>
          </div>

          {error && <p className="font-semibold text-red-500 mb-2 ">{error}</p>}

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
          font-bold rounded-lg shadow-lg hover:from-green-600
          hover:to-emerald-700 focus:outline-none focus-ring-2 focus:ring-green-500 focus:ring-offset-2
           focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
          >
            {isloading ? (
              <Loader className="size-6 animate-spin mx-auto " />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>
      <div className="py-4 px-4 text-center bg-gray-900 text-sm text-gray-500">
        Don't have an account?{" "}
        <Link to={"/signup"} className="text-green-400 hover:underline">
          Signup
        </Link>
      </div>
    </motion.div>
  );
};

export default LoginPage;