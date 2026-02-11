import React from "react";

const InfoCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between border border-gray-100">
      
      {/* Left Content */}
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <h3 className="text-2xl font-semibold text-gray-800">
          ${value}
        </h3>
      </div>

      {/* Icon Section */}
      <div
        className={`h-12 w-12 flex items-center justify-center rounded-xl ${color}`}
      >
        {Icon && <Icon size={22} className="text-white" />}
      </div>
    </div>
  );
};

export default InfoCard;
