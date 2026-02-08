import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({ value, onChange, label, type = "text" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative mb-8">
      {/* Input */}
      <input
        type={isPassword && showPassword ? "text" : type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=" "
        className="peer w-full border-b-2 border-gray-300 bg-transparent px-0 pt-6 pb-2 text-gray-900 outline-none transition focus:border-violet-600"
      />

      {/* Floating Label */}
      <label
        className="
          absolute left-0 top-2 z-10
          bg-[#fafafa] px-1 text-gray-500
          transition-all
          peer-placeholder-shown:top-6
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
          peer-focus:top-2
          peer-focus:text-xs
          peer-focus:text-violet-600
          text-xs
        "
      >
        {label}
      </label>

      {/* Password toggle */}
      {isPassword && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-6 cursor-pointer text-gray-400 hover:text-violet-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
};

export default Input;
