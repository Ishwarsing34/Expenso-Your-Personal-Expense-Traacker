import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaWallet, FaChartLine, FaCoins } from "react-icons/fa";

/* ================= DATA ================= */

const chartData = [
  { month: "Jan", value: 12000, height: 80, icon: FaWallet },
  { month: "Feb", value: 18000, height: 120, icon: FaChartLine },
  { month: "Mar", value: 24000, height: 160, icon: FaCoins },
  { month: "Apr", value: 22000, height: 150, icon: FaWallet },
  { month: "May", value: 14000, height: 90, icon: FaChartLine },
  { month: "Jun", value: 28000, height: 180, icon: FaCoins },
  { month: "Jul", value: 32000, height: 200, icon: FaWallet },
];

/* ================= LAYOUT ================= */

const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex h-screen w-full overflow-hidden bg-[#fafafa]">
      {/* ================= LEFT ================= */}
      <div className="relative z-10 flex w-full flex-col justify-center px-20 lg:w-[55%]">
        {/* Logo */}
        <div className="mb-20 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-white font-bold shadow-lg">
            ₹
          </div>
          <span className="text-xl font-bold tracking-wide text-gray-900">
            Expense Tracker
          </span>
        </div>

        {/* Auth Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="relative hidden h-full w-[45%] lg:flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-white overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute h-[700px] w-[700px] rounded-full bg-violet-200/30 blur-3xl" />

        {/* ================= CHART CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-[88%] rounded-3xl bg-white p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="mb-8">
            <p className="text-lg font-semibold text-gray-800">
              Monthly Expenses
            </p>
            <p className="text-sm text-gray-400">
              Expense distribution overview
            </p>
          </div>

          {/* ================= GRAPH ================= */}
          <div className="flex h-[260px] items-end gap-6">
            {chartData.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.month}
                  className="relative flex flex-1 flex-col items-center"
                >
                  {/* Floating icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: [0, -6, 0] }}
                    transition={{
                      duration: 2.5,
                      delay: index * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-10 flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-violet-600 shadow"
                  >
                    <Icon size={16} />
                  </motion.div>

                  {/* Value badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.15 }}
                    className="absolute -top-2 rounded-md bg-gray-900 px-2 py-1 text-[10px] text-white shadow"
                  >
                    ₹{item.value.toLocaleString()}
                  </motion.div>

                  {/* Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: [item.height, item.height + 8, item.height],
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.15,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-full rounded-t-2xl bg-gradient-to-t from-violet-700 to-violet-400"
                  />

                  {/* Month */}
                  <span className="mt-3 text-xs font-medium text-gray-400">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Caption */}
        <div className="absolute bottom-20 text-center">
          <p className="text-sm font-medium text-gray-700">
            Visualize • Track • Control
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Expense insights at a glance
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
