import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
// import useUserAuth from "../../hooks/useUserAuth"



export const DashboardLayout = ({ children, activeMenu }) => {

    // useUserAuth();

    const { user } = useContext(UserContext);

    return (
        <div>
            <Navbar activeMenu={activeMenu} />

            {user && (
                <div className="flex">
                    <div className="hidden lg:block w-[260px]">
                        <SideMenu activeMenu={activeMenu} />
                    </div>


                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    );
};
