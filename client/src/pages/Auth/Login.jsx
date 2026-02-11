import React, {  useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/input";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { validateEmail } from "../../utils/helper";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null)
  

   const {updateUser} = useContext(UserContext)


  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please add a valid Email Address")
      return;
    }

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }


    //api call 

    try {

      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password
      })

      const { token , user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user)
        navigate("/dashboard");

      }
    } catch (error) {

      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong. Please try again")
      }
    }

  };

return (
  <AuthLayout>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto px-4 sm:px-6 md:px-8"
    >
      <h3 className="mb-2 text-2xl sm:text-3xl font-semibold text-gray-900">
        Welcome Back
      </h3>

      <p className="mb-8 sm:mb-10 text-sm sm:text-base text-gray-500">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin} className="space-y-5">
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
          <p className="text-xs sm:text-sm text-red-500">
            {error}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-sm sm:text-base font-medium text-white shadow-lg transition"
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
