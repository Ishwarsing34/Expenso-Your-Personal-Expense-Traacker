import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

import uploadImage from "../../utils/uploadImage";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);


   const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    // Submit logic here
    // console.log({ fullName, email, password, profilePic });

    try {
      let profileImageUrl;

      if (profilePic) {

        const imageUploadRes = await uploadImage(profilePic);
        console.log(imageUploadRes)
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      const response = axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl

      })

      // axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, {
      //    profilePic
      // })

      const { token, user } = (await response).data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user)
        navigate("/dashboard")
      }
    } catch (error) {

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);

      } else {
        setError("something went wrong please try again")
      }
    }

  };

  return (
    <AuthLayout>
      <div className="w-[420px]">
        <h3 className="text-2xl font-semibold text-gray-900">
          Create an Account
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
          {/* Profile Photo */}
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Input
              label="Full Name"
              type="text"
              value={fullName}
              onChange={setFullName}
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
            />
          </div>

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-violet-600 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-violet-600 underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
