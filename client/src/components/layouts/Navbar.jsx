import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center gap-4 bg-white border-b border-gray-200 px-4 py-3">
        {/* Hamburger always visible */}
        <button
          className="lg:hidden text-gray-700"
          onClick={() => setOpenSideMenu(true)}
        >
          <HiOutlineMenu size={24} />
        </button>


        <h2 className="text-lg font-semibold text-gray-800">
          Expense Tracker
        </h2>
      </div>

      {/* Drawer SideMenu (all screens) */}
      {openSideMenu && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpenSideMenu(false)}
          />

          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="font-semibold">Menu</h3>
              <button onClick={() => setOpenSideMenu(false)} className="cursor-pointer">
                <HiOutlineX size={22} />
              </button>
            </div>

            <SideMenu activeMenu={activeMenu} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
