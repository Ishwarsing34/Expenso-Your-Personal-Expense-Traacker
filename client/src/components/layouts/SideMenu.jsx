import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import CharAvatar from "../Cards/CharAvatar";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "/logout") {
      localStorage.clear();
      clearUser();
      navigate("/login");
      return;
    }
    navigate(route);
  };

  return (
    <aside className="h-full w-full bg-white border-r border-gray-200 px-6 py-8">
      
      {/* Title */}
      {/* <h2 className="text-lg font-semibold text-gray-800 mb-10">
       
      </h2> */}

      {/* User Section (Centered) */}
      <div className="flex flex-col items-center mb-10">
        {user?.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover shadow-sm"
          />
        ) : (
          <CharAvatar
            fullName={user?.name}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}

        <p className="mt-4 text-sm font-semibold text-gray-800">
          {user?.name || "User"}
        </p>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2">
        {SIDE_MENU_DATA.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.label;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.path)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-linear-to-r from-violet-600 to-purple-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon
                size={18}
                className={isActive ? "text-white" : "text-gray-500"}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideMenu;
