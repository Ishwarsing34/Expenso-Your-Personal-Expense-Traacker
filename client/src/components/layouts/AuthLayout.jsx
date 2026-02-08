import React from "react";
import CARD_2 from "../../assets/images/card2.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      {/* Left section */}
      <div className="flex w-full flex-col justify-center px-12 lg:w-[60%]">
        <h2 className="mb-6 text-2xl font-semibold text-black">
          Expense Tracker
        </h2>
        {children}
      </div>

      {/* Right section */}
      <div className="hidden h-full w-[40%] items-center justify-center bg-violet-50 lg:flex">
        
        <img
          src={CARD_2}
          alt="Auth Illustration"
          className="w-[80%] max-w-md"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
