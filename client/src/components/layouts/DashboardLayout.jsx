import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import SideMenu from "./SideMenu";
import useUserAuth from "../../hooks/useUserAuth";
import Navbar from "./Navbar";



export const DashboardLayout = ({ children, activeMenu }) => {

   
  const { user } = useContext(UserContext);

  useUserAuth()

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      
      {/* Top Navbar */}
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex flex-1 overflow-hidden">
          
          {/* Sidebar (Fixed on Desktop) */}
          <div className="hidden lg:block w-[260px] fixed left-0 top-[64px] h-[calc(100vh-64px)] bg-white border-r">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:ml-[260px] overflow-y-auto p-6">
            {children}
          </div>

        </div>
      )}
    </div>
  );
};
