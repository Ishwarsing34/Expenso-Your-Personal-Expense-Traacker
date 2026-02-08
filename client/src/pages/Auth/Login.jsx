import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/input";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { validateEmail } from "../../utils/helper";
import { Link } from 'react-router-dom';   

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please add a valid Email Address")
      return;
    }

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }


    //api call 


    
  };

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[360px]"
      >
        <h3 className="mb-2 text-2xl font-semibold text-gray-900">
          Welcome Back
        </h3>
        <p className="mb-10 text-sm text-gray-500">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            label="Email Address"
            type="email"

            value={email}
            onChange={setEmail}
          />

          <Input
            label="Password"
            type="password"

            value={password}
            onChange={setPassword}
          />
       

           {error && (
            <p className="mt-2 text-xs text-red-500">
              {error}
            </p>
          )}



          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-white shadow-lg"
          >
            Sign In
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-violet-600 underline hover:text-violet-700"
          >
            Signup
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
};

export default Login;
