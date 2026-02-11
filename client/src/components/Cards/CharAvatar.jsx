import React from "react";
import { getInitials } from "../../utils/helper";

const CharAvatar = ({ fullName, width = "w-12", height = "h-12", style = "" }) => {
  return (
    <div
      className={`${width} ${height} ${style} flex items-center justify-center rounded-full bg-violet-100 text-violet-700 font-semibold`}
    >
      {getInitials(fullName || "")}
    </div>
  );
};

export default CharAvatar;
