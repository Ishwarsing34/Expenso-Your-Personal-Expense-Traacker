import React from "react";
import { motion } from "framer-motion";
import CARD_2 from "../../assets/images/card2.png";

const spin = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      duration: 30,
      ease: "linear",
    },
  },
};

const float = {
  animate: {
    y: [0, -12, 0],
    transition: {
      repeat: Infinity,
      duration: 6,
      ease: "easeInOut",
    },
  },
};

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#fafafa]">
      {/* LEFT */}
      <div className="relative z-10 flex w-full flex-col justify-center px-20 lg:w-[55%]">
        <h2 className="mb-16 text-xl font-semibold tracking-wide text-gray-900">
          Expense Tracker
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="relative hidden h-full w-[45%] lg:block">
        {/* Orbit Ring */}
        <motion.div
          variants={spin}
          animate="animate"
          className="absolute top-1/2 left-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/40"
        />
        <motion.div
          variants={spin}
          animate="animate"
          className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/30"
        />

        {/* Income Token */}
        <motion.div
          variants={float}
          animate="animate"
          className="absolute top-24 right-24 rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm"
        >
          + Income
        </motion.div>

        {/* Expense Token */}
        <motion.div
          variants={float}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute bottom-28 left-24 rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700 shadow-sm"
        >
          − Expense
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute top-16 left-1/2 w-[320px] -translate-x-1/2 rounded-2xl bg-white p-5 shadow-xl"
        >
          <p className="text-sm text-gray-500">
            Track your balance
          </p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            $430,000
          </p>
          <div className="mt-2 h-1 w-full rounded-full bg-gradient-to-r from-emerald-400 via-violet-400 to-rose-400" />
        </motion.div>

        {/* Chart Widget */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute bottom-14 left-1/2 w-[85%] -translate-x-1/2 rounded-3xl bg-white p-4 shadow-2xl"
        >
          <img
            src={CARD_2}
            alt="Transaction Analytics"
            className="w-full rounded-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
