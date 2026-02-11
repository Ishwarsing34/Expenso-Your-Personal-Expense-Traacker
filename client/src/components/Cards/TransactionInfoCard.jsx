import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income"
      ? "bg-green-50 text-green-500"
      : "bg-red-50 text-red-500";

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition">
      
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full text-xl">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Title + Date */}
      <div className="flex-1">
        <p className="text-gray-700 font-medium">{title}</p>
        <p className="text-gray-400 text-sm mt-1">{date}</p>
      </div>

      {/* Delete Button */}
      {!hideDeleteBtn && (
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
        >
          <LuTrash2 size={18} />
        </button>
      )}

      {/* Amount */}
      <div
        className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
      >
        <h6 className="font-medium">
          {type === "income" ? "+" : "-"} ₹{amount}
        </h6>

        {type === "income" ? (
          <LuTrendingUp />
        ) : (
          <LuTrendingDown />
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
